"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSession = exports.signOut = void 0;
const supabase_1 = require("../../supabase");
const signOut = async () => {
    const { error } = await supabase_1.supabase.auth.signOut();
    if (error) {
        console.error('Error signing out:', error.message);
        throw error;
    }
};
exports.signOut = signOut;
const getSession = async () => {
    const { data: { session }, error, } = await supabase_1.supabase.auth.getSession();
    if (error) {
        console.error('Error getting session:', error.message);
        throw error;
    }
    return session;
};
exports.getSession = getSession;
