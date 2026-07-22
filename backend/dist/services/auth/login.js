"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logIn = void 0;
const supabase_1 = require("../../supabase");
const logIn = async (email, password) => {
    const { data, error } = await supabase_1.supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) {
        console.error('Error logging in:', error.message);
        throw error;
    }
    let profile = null;
    if (data.user) {
        const { data: profileDataArray, error: profileError } = await supabase_1.supabase
            .from('users')
            .select('*')
            .eq('auth_id', data.user.id)
            .limit(1);
        if (profileError) {
            console.error('Error fetching user profile:', profileError.message);
        }
        else {
            profile = profileDataArray && profileDataArray.length > 0 ? profileDataArray[0] : null;
        }
    }
    return {
        user: data.user,
        session: data.session,
        profile,
    };
};
exports.logIn = logIn;
