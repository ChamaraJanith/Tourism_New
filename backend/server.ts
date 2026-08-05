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
  const { packageTitle, packageDuration, clientName, clientEmail, clientPhone, clientCountry, clientNotes } = req.body;

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
<head>
  <style>
    body {
      font-family: 'Inter', Arial, sans-serif;
      background-color: #0b0f19;
      color: #f3f4f6;
      margin: 0;
      padding: 0;
    }
    .wrapper {
      max-width: 600px;
      margin: 40px auto;
      background-color: #111827;
      border: 1px solid #1f2937;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
    }
    .header {
      background-color: #0b0f19;
      padding: 35px 30px;
      text-align: center;
      border-bottom: 1px solid #1f2937;
    }
    .header h1 {
      color: #d4af37;
      font-size: 22px;
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 3px;
      font-weight: 700;
    }
    .content {
      padding: 40px 30px;
      line-height: 1.6;
    }
    .content h2 {
      color: #ffffff;
      font-size: 18px;
      margin-top: 0;
      margin-bottom: 20px;
      border-left: 3px solid #d4af37;
      padding-left: 12px;
      font-weight: 600;
    }
    .package-card {
      background-color: #1f2937;
      border: 1px solid #374151;
      border-radius: 12px;
      padding: 24px;
      margin: 24px 0;
    }
    .package-title {
      color: #d4af37;
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .package-detail {
      color: #9ca3af;
      font-size: 14px;
    }
    .detail-table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    .detail-table th, .detail-table td {
      padding: 14px;
      text-align: left;
      border-bottom: 1px solid #1f2937;
    }
    .detail-table th {
      color: #9ca3af;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 1px;
      width: 35%;
      font-weight: 600;
    }
    .detail-table td {
      color: #ffffff;
      font-size: 14px;
      font-weight: 500;
    }
    .note-box {
      background-color: rgba(212, 175, 55, 0.04);
      border-left: 3px solid #d4af37;
      padding: 18px;
      border-radius: 0 10px 10px 0;
      font-style: italic;
      color: #e5e7eb;
      margin-top: 20px;
      line-height: 1.7;
    }
    .footer {
      background-color: #0b0f19;
      padding: 24px;
      text-align: center;
      font-size: 12px;
      color: #6b7280;
      border-top: 1px solid #1f2937;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>Serendib Luxury</h1>
    </div>
    <div class="content">
      <h2>New Itinerary Request</h2>
      <p style="color: #9ca3af; font-size: 14px; margin-bottom: 30px;">
        A client has submitted an itinerary request for a curated signature journey package. The details are provided below:
      </p>
      
      <div class="package-card">
        <div class="package-title">${packageTitle}</div>
        <div class="package-detail"><strong>Duration:</strong> ${packageDuration || 'Custom'}</div>
      </div>

      <h2>Client Information</h2>
      <table class="detail-table">
        <tr>
          <th>Name</th>
          <td>${clientName}</td>
        </tr>
        <tr>
          <th>Email</th>
          <td>${clientEmail}</td>
        </tr>
        <tr>
          <th>Contact Number</th>
          <td>${clientPhone || 'Not provided'}</td>
        </tr>
        <tr>
          <th>Country</th>
          <td>${clientCountry || 'Not provided'}</td>
        </tr>
      </table>

      ${clientNotes ? `
      <h2>Client Custom Notes</h2>
      <div class="note-box">
        "${clientNotes.replace(/\n/g, '<br/>')}"
      </div>
      ` : ''}
    </div>
    <div class="footer">
      This is an automated notification from Serendib Luxury Travel Concierge.
    </div>
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
