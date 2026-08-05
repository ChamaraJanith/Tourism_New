import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
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
  const { email, password, name, agreedToTerms, nic, country, dob, contactNumber } = req.body;
  
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
    const data = await signUp(email, password, name, agreedToTerms, nic, country, dob, contactNumber);
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
  const { name, avatarUrl, nic, country, dob, contactNumber } = req.body;
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
    const data = await updateProfile(token, name, avatarUrl || '', nic, country, dob, contactNumber);
    res.status(200).json({ 
      message: 'Profile updated successfully', 
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.profile?.full_name || data.user.user_metadata?.full_name || name,
        profileId: data.profile?.id,
        avatarUrl: data.user.user_metadata?.avatar_url || '',
        nic: data.profile?.nic || data.user.user_metadata?.nic || nic || '',
        country: data.profile?.country || data.user.user_metadata?.country || country || '',
        dob: data.profile?.dob || data.user.user_metadata?.dob || dob || '',
        contactNumber: data.profile?.contact_number || data.user.user_metadata?.contact_number || contactNumber || '',
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

// --- Itinerary Request Route ---
app.post('/api/itinerary/request', async (req: Request, res: Response): Promise<void> => {
  const { 
    packageTitle, 
    packageDuration, 
    clientName, 
    clientEmail, 
    clientPhone, 
    clientCountry, 
    clientNic, 
    clientDob, 
    clientNotes 
  } = req.body;

  if (!packageTitle || !clientName || !clientEmail) {
    res.status(400).json({ error: 'Package title, client name, and client email are required fields.' });
    return;
  }

  // Set up Nodemailer transport from environment variables
  const smtpHost = process.env.SMTP_HOST || '';
  const smtpPort = parseInt(process.env.SMTP_PORT || '587');
  const smtpUser = process.env.SMTP_USER || '';
  const smtpPass = process.env.SMTP_PASS || '';
  const fromEmail = process.env.FROM_EMAIL || smtpUser || 'noreply@ihvtravel.com';

  const isSMTPConfigured = smtpHost && smtpUser && smtpPass;

  // Render the premium HTML email template
  const htmlContent = `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333333; padding: 20px; background-color: #ffffff;">
  <div style="max-width: 600px; margin: 0 auto;">
    <h2 style="font-size: 18px; color: #111111; border-bottom: 1px solid #ccc; padding-bottom: 8px; margin-bottom: 20px;">
      Serendib Luxury Travels - New Itinerary Request
    </h2>
    
    <p style="font-size: 15px;">
      Hello Team,<br/><br/>
      You have received a new itinerary request. Here are the details:
    </p>

    <p style="font-size: 15px;">
      <strong>Selected Package:</strong> ${packageTitle}<br/>
      <strong>Duration:</strong> ${packageDuration || 'Custom Plan'}
    </p>

    <p style="font-size: 15px; margin-top: 20px; font-weight: bold; text-decoration: underline;">Client Details:</p>
    <p style="font-size: 14px; line-height: 1.8;">
      • <strong>Client Name:</strong> ${clientName}<br/>
      • <strong>Email Address:</strong> ${clientEmail}<br/>
      • <strong>Contact Number:</strong> ${clientPhone || 'Not provided'}<br/>
      • <strong>Country of Residence:</strong> ${clientCountry || 'Not provided'}<br/>
      • <strong>NIC Number:</strong> ${clientNic || 'Not provided'}<br/>
      • <strong>Date of Birth:</strong> ${clientDob || 'Not provided'}
    </p>

    ${clientNotes ? `
    <p style="font-size: 15px; margin-top: 20px; font-weight: bold; text-decoration: underline;">Special Notes / Requirements:</p>
    <p style="font-size: 14px; white-space: pre-wrap; background-color: #f9f9f9; padding: 12px; border-radius: 4px; border-left: 3px solid #d4af37;">${clientNotes}</p>
    ` : ''}

    <p style="font-size: 11px; color: #999999; margin-top: 40px; border-top: 1px solid #eee; padding-top: 10px;">
      This is an automated notification from the Serendib Luxury booking concierge engine.
    </p>
  </div>
</body>
</html>
  `;

  const mailOptions = {
    from: `"Serendib Luxury Concierge" <${fromEmail}>`,
    to: 'info@ihvtravel.com',
    replyTo: clientEmail,
    subject: `[New Request] Itinerary Request - ${packageTitle}`,
    html: htmlContent,
  };

  if (!isSMTPConfigured) {
    console.warn('--- Nodemailer: SMTP credentials are not configured. Logging request details instead ---');
    console.log('Mail Details:', {
      to: mailOptions.to,
      subject: mailOptions.subject,
      replyTo: mailOptions.replyTo,
      clientName,
      clientEmail,
      clientPhone,
      clientCountry,
      clientNic,
      clientDob,
      packageTitle,
    });
    res.status(200).json({ 
      success: true, 
      message: 'Itinerary request simulated successfully (SMTP not configured on backend).' 
    });
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Your itinerary request has been sent successfully!' });
  } catch (error: any) {
    console.error('Error sending itinerary email:', error);
    res.status(500).json({ error: error.message || 'Failed to send itinerary email. Please try again later.' });
  }
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;
