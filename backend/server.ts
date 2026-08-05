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
<head>
  <meta charset="utf-8">
  <title>New Itinerary Request</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333333; background-color: #ffffff; padding: 20px; margin: 0;">
  <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 30px; background-color: #ffffff; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
    
    <!-- Header -->
    <div style="border-bottom: 2px solid #d4af37; padding-bottom: 15px; margin-bottom: 25px;">
      <h2 style="color: #111111; margin: 0; font-size: 20px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
        Serendib Luxury Travels
      </h2>
      <p style="color: #666666; margin: 5px 0 0 0; font-size: 13px;">New Itinerary Request</p>
    </div>

    <!-- Intro Text -->
    <p style="font-size: 15px; margin-top: 0; margin-bottom: 25px;">
      Hello Team,<br/><br/>
      You have received a new itinerary request from the website. Here are the details:
    </p>

    <!-- Package Detail -->
    <div style="background-color: #f9f9f9; border-left: 4px solid #d4af37; padding: 15px; margin-bottom: 25px; border-radius: 4px;">
      <strong style="font-size: 16px; color: #111111; display: block; margin-bottom: 5px;">Selected Journey Package</strong>
      <span style="font-size: 15px; color: #333333;">${packageTitle}</span>
      ${packageDuration ? `<span style="font-size: 14px; color: #666666; display: block; margin-top: 3px;">Duration: ${packageDuration}</span>` : ''}
    </div>

    <!-- Client Info Table -->
    <h3 style="font-size: 15px; color: #111111; border-bottom: 1px solid #eeeeee; padding-bottom: 5px; margin-top: 0; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 0.5px;">
      Client Details
    </h3>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px; font-size: 14px;">
      <tr>
        <td style="padding: 8px 0; width: 35%; color: #666666; font-weight: bold;">Client Name:</td>
        <td style="padding: 8px 0; width: 65%; color: #111111;">${clientName}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #666666; font-weight: bold;">Email Address:</td>
        <td style="padding: 8px 0; color: #111111;"><a href="mailto:${clientEmail}" style="color: #d4af37; text-decoration: none;">${clientEmail}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #666666; font-weight: bold;">Contact Number:</td>
        <td style="padding: 8px 0; color: #111111;">${clientPhone || 'Not provided'}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #666666; font-weight: bold;">Country of Residence:</td>
        <td style="padding: 8px 0; color: #111111;">${clientCountry || 'Not provided'}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #666666; font-weight: bold;">NIC Number:</td>
        <td style="padding: 8px 0; color: #111111;">${clientNic || 'Not provided'}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #666666; font-weight: bold;">Date of Birth:</td>
        <td style="padding: 8px 0; color: #111111;">${clientDob || 'Not provided'}</td>
      </tr>
    </table>

    <!-- Client Notes -->
    ${clientNotes ? `
    <h3 style="font-size: 15px; color: #111111; border-bottom: 1px solid #eeeeee; padding-bottom: 5px; margin-top: 0; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 0.5px;">
      Special Notes & Requirements
    </h3>
    <div style="background-color: #fdfaf2; border: 1px dashed #e8d090; padding: 15px; border-radius: 4px; font-style: italic; color: #555555; font-size: 14px; line-height: 1.5; margin-bottom: 20px;">
      "${clientNotes.replace(/\n/g, '<br/>')}"
    </div>
    ` : ''}

    <!-- Footer -->
    <div style="border-top: 1px solid #eeeeee; padding-top: 15px; margin-top: 30px; text-align: center; font-size: 11px; color: #999999;">
      This is an automated request notification from the Serendib Luxury booking concierge engine.
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
