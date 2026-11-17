-- Supabase PostgreSQL Schema for INJERA: An Immersive Ethiopian Cultural Experience
-- Created: 2026-08-31

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles & User Progress
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  completed_stages INTEGER[] DEFAULT ARRAY[1],
  current_stage INTEGER DEFAULT 1,
  simulation_score INTEGER DEFAULT 0,
  quiz_score INTEGER DEFAULT 0,
  quiz_completed BOOLEAN DEFAULT FALSE,
  unlocked_badges TEXT[] DEFAULT ARRAY['CURIOUS_OBSERVER'],
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- 2. Stages
CREATE TABLE IF NOT EXISTS public.stages (
  id TEXT PRIMARY KEY,
  stage_number INTEGER NOT NULL UNIQUE,
  title_en TEXT NOT NULL,
  title_am TEXT NOT NULL,
  subtitle_en TEXT NOT NULL,
  subtitle_am TEXT NOT NULL,
  summary_en TEXT NOT NULL,
  summary_am TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_am TEXT NOT NULL,
  scientific_insight_en TEXT NOT NULL,
  scientific_insight_am TEXT NOT NULL,
  cultural_insight_en TEXT NOT NULL,
  cultural_insight_am TEXT NOT NULL,
  duration_estimate TEXT NOT NULL,
  color_theme TEXT DEFAULT '#C59334',
  tools TEXT[] DEFAULT ARRAY[]::TEXT[],
  ingredients TEXT[] DEFAULT ARRAY[]::TEXT[],
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'review', 'published', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Utensils & Cultural Tools
CREATE TABLE IF NOT EXISTS public.utensils (
  id TEXT PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_am TEXT NOT NULL,
  transliteration TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('cooking', 'serving', 'preparation', 'storage')),
  materials TEXT[] DEFAULT ARRAY[]::TEXT[],
  description_en TEXT NOT NULL,
  description_am TEXT NOT NULL,
  cultural_significance_en TEXT NOT NULL,
  cultural_significance_am TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Cultural Articles
CREATE TABLE IF NOT EXISTS public.cultural_articles (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
  slug TEXT NOT NULL UNIQUE,
  title_en TEXT NOT NULL,
  title_am TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('history', 'agriculture', 'science', 'hospitality', 'craftsmanship')),
  author TEXT NOT NULL,
  read_time TEXT NOT NULL,
  lead_paragraph_en TEXT NOT NULL,
  lead_paragraph_am TEXT NOT NULL,
  sections JSONB NOT NULL DEFAULT '[]'::JSONB,
  sources JSONB NOT NULL DEFAULT '[]'::JSONB,
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'review', 'published', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Regions
CREATE TABLE IF NOT EXISTS public.regions (
  id TEXT PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_am TEXT NOT NULL,
  capital TEXT NOT NULL,
  geography TEXT NOT NULL,
  grain_specialty_en TEXT NOT NULL,
  grain_specialty_am TEXT NOT NULL,
  injera_characteristics_en TEXT NOT NULL,
  injera_characteristics_am TEXT NOT NULL,
  tradition_highlight_en TEXT NOT NULL,
  tradition_highlight_am TEXT NOT NULL,
  signature_dishes JSONB DEFAULT '[]'::JSONB,
  coord_x NUMERIC NOT NULL,
  coord_y NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Kitchen Stories
CREATE TABLE IF NOT EXISTS public.stories (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
  slug TEXT NOT NULL UNIQUE,
  person_name TEXT NOT NULL,
  role_en TEXT NOT NULL,
  role_am TEXT NOT NULL,
  location TEXT NOT NULL,
  generation TEXT NOT NULL,
  quote_en TEXT NOT NULL,
  quote_am TEXT NOT NULL,
  body_en TEXT[] NOT NULL,
  body_am TEXT[] NOT NULL,
  cultural_context_en TEXT NOT NULL,
  cultural_context_am TEXT NOT NULL,
  is_demo_data BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'review', 'published', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Quiz Questions
CREATE TABLE IF NOT EXISTS public.quiz_questions (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  question_en TEXT NOT NULL,
  question_am TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_option_id TEXT NOT NULL,
  explanation_en TEXT NOT NULL,
  explanation_am TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Favorites
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('article', 'story', 'stage', 'region')),
  entity_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, entity_type, entity_id)
);

-- Row Level Security (RLS) Configuration
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.utensils ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cultural_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Public read policies for published educational content
CREATE POLICY "Public read for published stages" ON public.stages FOR SELECT USING (status = 'published');
CREATE POLICY "Public read for utensils" ON public.utensils FOR SELECT USING (true);
CREATE POLICY "Public read for published articles" ON public.cultural_articles FOR SELECT USING (status = 'published');
CREATE POLICY "Public read for regions" ON public.regions FOR SELECT USING (true);
CREATE POLICY "Public read for published stories" ON public.stories FOR SELECT USING (status = 'published');
CREATE POLICY "Public read for quiz questions" ON public.quiz_questions FOR SELECT USING (true);

-- User-specific policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can manage own progress" ON public.user_progress FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own favorites" ON public.favorites FOR ALL USING (auth.uid() = user_id);
