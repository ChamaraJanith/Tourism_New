"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const supabase_1 = require("../supabase");
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
    if (!token) {
        res.status(401).json({ error: 'Access token is required' });
        return;
    }
    try {
        // Verify the token with Supabase Auth
        const { data: { user }, error } = await supabase_1.supabase.auth.getUser(token);
        if (error || !user) {
            res.status(401).json({ error: error?.message || 'Invalid or expired token' });
            return;
        }
        // Fetch user profile from public.users table to get custom fields
        const { data: profiles, error: profileError } = await supabase_1.supabase
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
            };
        }
        else {
            req.user = {
                id: user.id,
                email: user.email,
                name: profile.full_name,
                agreedToTerms: profile.agreed_to_terms,
                profileId: profile.id, // Auto-incremented ID (starting 1)
                avatarUrl: user.user_metadata?.avatar_url || '',
            };
        }
        next();
    }
    catch (err) {
        res.status(401).json({ error: err.message || 'Authentication failed' });
    }
};
exports.authenticateToken = authenticateToken;
