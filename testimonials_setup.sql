-- ==============================================================================
-- TESTIMONIALS / REVIEWS TABLE SETUP
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/lmswnyyabrujrojdvpjb/sql
-- ==============================================================================

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
  avatar TEXT,
  status TEXT NOT NULL DEFAULT 'Pending', -- 'Pending', 'Approved', 'Rejected'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- If the table already exists and you want to drop video_url column:
ALTER TABLE public.testimonials DROP COLUMN IF EXISTS video_url;

-- Disable Row Level Security (RLS) so frontend and admin can read/write without auth blocking
ALTER TABLE public.testimonials DISABLE ROW LEVEL SECURITY;

-- Insert initial sample approved reviews (only if table is empty)
INSERT INTO public.testimonials (name, role, country, flag, rating, quote, short_quote, tags, bg_image, status)
SELECT 
  'Eleanor Vance', 
  'Private Client', 
  'United Kingdom', 
  '🇬🇧', 
  5, 
  'A perfectly paced exploration of Sri Lanka''s hidden highlands. The expert local guides knew every secret tea plantation trail. Pure luxury coupled with wild, raw authenticity.', 
  'The expert local guides knew every secret tea plantation trail. Pure luxury coupled with wild, raw authenticity.', 
  ARRAY['Highland Expedition', 'Culture Trails'], 
  'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&q=80&w=1200', 
  'Approved'
WHERE NOT EXISTS (SELECT 1 FROM public.testimonials);

INSERT INTO public.testimonials (name, role, country, flag, rating, quote, short_quote, tags, bg_image, status)
SELECT 
  'Marcus Aurelius', 
  'Bespoke Adventurer', 
  'Germany', 
  '🇩🇪', 
  5, 
  'Booking the Dandeniya Lake retreat was the best wellness decision I''ve ever made. The sound of birds at sunrise, combined with organic food and top-tier service, was unmatched.', 
  'Booking the Dandeniya Lake retreat was the best wellness decision I''ve ever made. Top-tier service was unmatched.', 
  ARRAY['Lake Retreat', 'Ayurvedic Spa'], 
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200', 
  'Approved'
WHERE (SELECT COUNT(*) FROM public.testimonials) = 1;

INSERT INTO public.testimonials (name, role, country, flag, rating, quote, short_quote, tags, bg_image, status)
SELECT 
  'Samantha Miller', 
  'Family Retreat', 
  'United States', 
  '🇺🇸', 
  5, 
  'Our bespoke organic farming day combined with a culinary workshop blew us away. The children learned to harvest local yams while we sipped fresh coconut water.', 
  'Our bespoke organic farming day combined with a culinary workshop blew us away. Sipping fresh coconut water.', 
  ARRAY['Organic Village', 'Local Kitchen'], 
  'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200', 
  'Approved'
WHERE (SELECT COUNT(*) FROM public.testimonials) = 2;
