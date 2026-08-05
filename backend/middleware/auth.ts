import { Request, Response, NextFunction } from 'express';
import { supabase } from '../supabase';

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

  if (!token) {
    res.status(401).json({ error: 'Access token is required' });
    return;
  }

  try {
    // Verify the token with Supabase Auth
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      res.status(401).json({ error: error?.message || 'Invalid or expired token' });
      return;
    }

    // Fetch user profile from public.users table to get custom fields
    const { data: profiles, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('auth_id', user.id)
      .limit(1);

    const profile = profiles && profiles.length > 0 ? profiles[0] : null;

    if (profileError || !profile) {
      if (profileError) {
        console.error('Error fetching user profile:', profileError.message);
      }
      // Even if public profile fetch fails, attach the auth user
      req.user = {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.full_name || '',
        avatarUrl: user.user_metadata?.avatar_url || '',
        nic: user.user_metadata?.nic || '',
        country: user.user_metadata?.country || '',
        dob: user.user_metadata?.dob || '',
        contactNumber: user.user_metadata?.contact_number || '',
      };
    } else {
      req.user = {
        id: user.id,
        email: user.email,
        name: profile.full_name,
        agreedToTerms: profile.agreed_to_terms,
        profileId: profile.id, // Auto-incremented ID (starting 1)
        avatarUrl: user.user_metadata?.avatar_url || '',
        nic: profile.nic || user.user_metadata?.nic || '',
        country: profile.country || user.user_metadata?.country || '',
        dob: profile.dob || user.user_metadata?.dob || '',
        contactNumber: profile.contact_number || user.user_metadata?.contact_number || '',
      };
    }

    next();
  } catch (err: any) {
    res.status(401).json({ error: err.message || 'Authentication failed' });
  }
};
