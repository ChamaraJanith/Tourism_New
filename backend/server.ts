import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import { supabase } from './supabase';
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

  // Store inquiry in Supabase database
  let isSavedToDb = false;
  try {
    const { error: dbError } = await supabase
      .from('itinerary_requests')
      .insert([
        {
          package_title: packageTitle,
          package_duration: packageDuration || '',
          client_name: clientName,
          client_email: clientEmail,
          client_phone: clientPhone || '',
          client_country: clientCountry || '',
          client_nic: clientNic || '',
          client_dob: clientDob || '',
          client_notes: clientNotes || ''
        }
      ]);
    if (dbError) {
      console.warn('Could not save itinerary request to Supabase table:', dbError.message);
    } else {
      isSavedToDb = true;
      console.log('Successfully saved itinerary request to Supabase database.');
    }
  } catch (dbErr) {
    console.warn('Error saving itinerary request to Supabase:', dbErr);
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
  <div style="max-width: 650px; margin: 0 auto; background-color: #ffffff;">
    
    <!-- Header -->
    <div style="margin-bottom: 25px;">
      <h2 style="font-family: Arial, sans-serif; font-size: 20px; font-weight: bold; color: #111111; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 0.5px;">
        International Hospitality Ventures (Private) Limited.
      </h2>
      <p style="font-family: Arial, sans-serif; font-size: 13px; color: #666666; margin: 0 0 12px 0;">
        New Itinerary Request
      </p>
      <div style="height: 2px; background-color: #d4af37; width: 100%;"></div>
    </div>

    <!-- Intro Message -->
    <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333333; margin: 0 0 20px 0;">
      Hello Team,<br/><br/>
      You have received a new itinerary request from the website. Here are the details:
    </p>

    <!-- Package Highlight Bar -->
    <div style="background-color: #f7f7f7; border-left: 4px solid #d4af37; padding: 12px 16px; margin-bottom: 30px; font-family: Arial, sans-serif; font-size: 14px; color: #333333; border-radius: 2px;">
      <span style="font-weight: bold; color: #111111;">Selected Journey Package</span> 
      <span style="color: #333333; margin-left: 5px;">${packageTitle}</span>
      <span style="color: #666666; margin-left: 5px;">Duration: ${packageDuration || 'Custom Plan'}</span>
    </div>

    <!-- Client Details Section -->
    <div style="margin-bottom: 30px;">
      <h3 style="font-family: Arial, sans-serif; font-size: 14px; font-weight: bold; color: #111111; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.5px;">
        CLIENT DETAILS
      </h3>
      <div style="height: 1px; background-color: #e5e5e5; width: 100%; margin-bottom: 15px;"></div>
      
      <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 13.5px;">
        <tr>
          <td style="padding: 12px 0; width: 35%; color: #555555; font-weight: bold; vertical-align: top;">Client Name:</td>
          <td style="padding: 12px 0; width: 65%; color: #222222; vertical-align: top;">${clientName}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; color: #555555; font-weight: bold; vertical-align: top;">Email Address:</td>
          <td style="padding: 12px 0; color: #d4af37; vertical-align: top;"><a href="mailto:${clientEmail}" style="color: #d4af37; text-decoration: none; font-weight: bold;">${clientEmail}</a></td>
        </tr>
        <tr>
          <td style="padding: 12px 0; color: #555555; font-weight: bold; vertical-align: top;">Contact Number:</td>
          <td style="padding: 12px 0; color: #222222; vertical-align: top;">${clientPhone || 'Not provided'}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; color: #555555; font-weight: bold; vertical-align: top;">Country of Residence:</td>
          <td style="padding: 12px 0; color: #222222; vertical-align: top;">${clientCountry || 'Not provided'}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; color: #555555; font-weight: bold; vertical-align: top;">NIC Number:</td>
          <td style="padding: 12px 0; color: #222222; vertical-align: top;">${clientNic || 'Not provided'}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; color: #555555; font-weight: bold; vertical-align: top;">Date of Birth:</td>
          <td style="padding: 12px 0; color: #222222; vertical-align: top;">${clientDob || 'Not provided'}</td>
        </tr>
      </table>
    </div>

    <!-- Special Notes Section -->
    <div>
      <h3 style="font-family: Arial, sans-serif; font-size: 14px; font-weight: bold; color: #111111; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.5px;">
        SPECIAL NOTES & REQUIREMENTS
      </h3>
      <div style="height: 1px; background-color: #e5e5e5; width: 100%; margin-bottom: 15px;"></div>
      
      <p style="font-family: Arial, sans-serif; font-size: 13.5px; color: #444444; margin: 0; line-height: 1.6; white-space: pre-wrap;">${clientNotes || 'No special requirements specified.'}</p>
    </div>

  </div>
</body>
</html>
  `;

  const mailOptions = {
    from: `"International Hospitality Ventures (Private) Limited." <${fromEmail}>`,
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
      message: 'Itinerary request submitted successfully!'
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
    console.error('Error sending itinerary email via SMTP:', error);
    if (isSavedToDb) {
      // If DB save succeeded, return success to user even if SMTP email failed
      res.status(200).json({ success: true, message: 'Your itinerary request has been submitted successfully!' });
    } else {
      res.status(500).json({ error: error.message || 'Failed to send itinerary email. Please try again later.' });
    }
  }
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;
