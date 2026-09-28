-- 1. Add custom_id column to users table if not exists
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS custom_id TEXT UNIQUE;

-- 2. If inserts are failing, it is likely due to Row Level Security (RLS).
-- Run this to allow inserts:
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- OR, if you want to keep RLS enabled, run this:
-- CREATE POLICY "Allow users to insert their own profile" ON public.users FOR INSERT WITH CHECK (auth.uid() = auth_id);
