"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSupabaseCredentials = void 0;
const getSupabaseCredentials = () => ({
    supabaseUrl: process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
});
exports.getSupabaseCredentials = getSupabaseCredentials;
