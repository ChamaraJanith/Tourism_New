-- 1. Add custom_id column to users table if not exists
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS custom_id TEXT UNIQUE;

-- 2. If inserts are failing, it is likely due to Row Level Security (RLS).
-- Run this to allow inserts:
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- 3. Testimonials / Reviews table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT DEFAULT 'Client',
  country TEXT DEFAULT '',
  flag TEXT DEFAULT '🌍',
  rating INTEGER NOT NULL DEFAULT 5,
  quote TEXT NOT NULL,
  short_quote TEXT,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  bg_image TEXT DEFAULT 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&q=80&w=1200',
  video_url TEXT,
  avatar TEXT,
  status TEXT NOT NULL DEFAULT 'Pending', -- 'Pending', 'Approved', 'Rejected'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.testimonials DISABLE ROW LEVEL SECURITY;

