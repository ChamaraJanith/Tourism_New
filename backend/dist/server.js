"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = require("./auth");
const auth_2 = require("./middleware/auth");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// --- Authentication Routes ---
app.post('/api/auth/signup', async (req, res) => {
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
        const data = await (0, auth_1.signUp)(email, password, name, agreedToTerms);
        res.status(200).json({ message: 'User created successfully', data });
    }
    catch (error) {
        res.status(400).json({ error: error.message || 'Failed to sign up' });
    }
});
app.post('/api/auth/login', async (req, res) => {
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
        const data = await (0, auth_1.logIn)(email, password);
        res.status(200).json({ message: 'Login successful', data });
    }
    catch (error) {
        res.status(400).json({ error: error.message || 'Failed to log in' });
    }
});
app.post('/api/auth/logout', async (req, res) => {
    try {
        await (0, auth_1.signOut)();
        res.status(200).json({ message: 'Logged out successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Failed to log out' });
    }
});
app.get('/api/auth/session', async (req, res) => {
    try {
        const session = await (0, auth_1.getSession)();
        res.status(200).json({ session });
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Failed to get session' });
    }
});
app.get('/api/auth/me', auth_2.authenticateToken, async (req, res) => {
    res.status(200).json({ user: req.user });
});
app.put('/api/auth/profile', auth_2.authenticateToken, async (req, res) => {
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
        const data = await (0, auth_1.updateProfile)(token, name, avatarUrl || '');
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
    }
    catch (error) {
        res.status(400).json({ error: error.message || 'Failed to update profile' });
    }
});
app.post('/api/auth/forgot-password', async (req, res) => {
    const { email } = req.body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
        res.status(400).json({ error: 'Please provide a valid email address' });
        return;
    }
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const redirectTo = `${frontendUrl}/auth/reset-password`;
    try {
        await (0, auth_1.sendPasswordResetEmail)(email, redirectTo);
        res.status(200).json({ message: 'Password reset email sent successfully. Please check your inbox.' });
    }
    catch (error) {
        res.status(400).json({ error: error.message || 'Failed to send password reset email' });
    }
});
app.post('/api/auth/reset-password', async (req, res) => {
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
        await (0, auth_1.updateUserPassword)(token, password);
        res.status(200).json({ message: 'Password updated successfully' });
    }
    catch (error) {
        res.status(400).json({ error: error.message || 'Failed to update password' });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
