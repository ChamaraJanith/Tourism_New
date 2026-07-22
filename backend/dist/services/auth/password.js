"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserPassword = exports.sendPasswordResetEmail = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const common_1 = require("./common");
const supabase_1 = require("../../supabase");
const sendPasswordResetEmail = async (email, redirectTo) => {
    const { error } = await supabase_1.supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
    });
    if (error) {
        console.error('Error sending password reset email:', error.message);
        throw error;
    }
};
exports.sendPasswordResetEmail = sendPasswordResetEmail;
const updateUserPassword = async (accessToken, newPassword) => {
    const { supabaseUrl, supabaseAnonKey } = (0, common_1.getSupabaseCredentials)();
    const userSupabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseAnonKey, {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
        },
        global: {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
    });
    const { data, error } = await userSupabase.auth.updateUser({
        password: newPassword,
    });
    if (error) {
        console.error('Error updating user password:', error.message);
        throw error;
    }
    return data;
};
exports.updateUserPassword = updateUserPassword;
