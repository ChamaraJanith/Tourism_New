import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { signUp, logIn, signOut, getSession, sendPasswordResetEmail, updateUserPassword, updateProfile } from './services/auth';
import { authenticateToken, AuthenticatedRequest } from './middleware/auth';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.get('/', (_req: Request, res: Response): void => {
  res.json({ message: 'Backend running' });
});

app.get('/health', (_req: Request, res: Response): void => {
  res.status(200).json({ ok: true });
});
// --- Authentication Routes ---

app.post(['/api/auth/signup', '/api/auth/register'], async (req: Request, res: Response): Promise<void> => {
  const { email, password, name, agreedToTerms } = req.body;
  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email || !emailRegex.test(email)) {
    res.status(400).json({ error: 'Please provide a valid email address' });
    return;
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?~`]).{8,}$/;
  if (!password || !passwordRegex.test(password)) {
    res.status(400).json({ error: 'Password must be at least 8 characters long and include an uppercase letter, lowercase letter, a number, and a special character.' });
    return;
  }

  if (!name || !name.trim()) {
    res.status(400).json({ error: 'Full name is required' });
    return;
  }

  if (!agreedToTerms) {
    res.status(400).json({ error: 'You must agree to the Terms & Conditions' });
    return;
  }

  try {
    const data = await signUp(email, password, name, agreedToTerms);
    res.status(200).json({ message: 'User created successfully', data });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to sign up' });
  }
});

app.post('/api/auth/login', async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email || !emailRegex.test(email)) {
    res.status(400).json({ error: 'Please provide a valid email address' });
    return;
  }

  if (!password) {
    res.status(400).json({ error: 'Password is required' });
    return;
  }

  try {
    const data = await logIn(email, password);
    res.status(200).json({ message: 'Login successful', data });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to log in' });
  }
});

app.post('/api/auth/logout', async (req: Request, res: Response): Promise<void> => {
  try {
    await signOut();
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to log out' });
  }
});

app.get('/api/auth/session', async (req: Request, res: Response): Promise<void> => {
  try {
    const session = await getSession();
    res.status(200).json({ session });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to get session' });
  }
});

app.get('/api/auth/me', authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  res.status(200).json({ user: req.user });
});

app.put('/api/auth/profile', authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { name, avatarUrl } = req.body;
  const authHeader = req.headers.authorization;

  if (!name || !name.trim()) {
    res.status(400).json({ error: 'Full name is required' });
    return;
  }

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: Missing token' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const data = await updateProfile(token, name, avatarUrl || '');
    res.status(200).json({ 
      message: 'Profile updated successfully', 
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.profile?.full_name || data.user.user_metadata?.full_name || name,
        profileId: data.profile?.id,
        avatarUrl: data.user.user_metadata?.avatar_url || ''
      }
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to update profile' });
  }
});

app.post('/api/auth/forgot-password', async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email || !emailRegex.test(email)) {
    res.status(400).json({ error: 'Please provide a valid email address' });
    return;
  }

  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  const redirectTo = `${frontendUrl}/auth/reset-password`;

  try {
    await sendPasswordResetEmail(email, redirectTo);
    res.status(200).json({ message: 'Password reset email sent successfully. Please check your inbox.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to send password reset email' });
  }
});

app.post('/api/auth/reset-password', async (req: Request, res: Response): Promise<void> => {
  const { password } = req.body;
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
    return;
  }

  const token = authHeader.split(' ')[1];

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?~`]).{8,}$/;
  if (!password || !passwordRegex.test(password)) {
    res.status(400).json({ error: 'Password must be at least 8 characters long and include an uppercase letter, lowercase letter, a number, and a special character.' });
    return;
  }

  try {
    await updateUserPassword(token, password);
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to update password' });
  }
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;
