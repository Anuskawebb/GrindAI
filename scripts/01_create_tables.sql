-- Create the 'public.profiles' table to store additional user information
-- This table is linked to Supabase's built-in 'auth.users' table.
CREATE TABLE public.profiles (
    id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    updated_at timestamptz DEFAULT now(),
    username text UNIQUE,
    full_name text,
    avatar_url text,
    website text,
    CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

-- Create the 'public.skills' table
CREATE TABLE public.skills (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    skill_name text NOT NULL,
    start_date date DEFAULT now(),
    deadline date,
    progress_percentage numeric DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create the 'public.tasks' table
CREATE TABLE public.tasks (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    skill_id uuid REFERENCES public.skills(id) ON DELETE CASCADE NOT NULL, -- Tasks are linked to skills
    task_name text NOT NULL,
    deadline date,
    is_completed boolean DEFAULT FALSE,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create the 'public.notes' table
CREATE TABLE public.notes (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    skill_id uuid REFERENCES public.skills(id) ON DELETE SET NULL, -- Notes can be general or skill-specific
    content text NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create the 'public.notifications' table
CREATE TABLE public.notifications (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title text NOT NULL,
    body text,
    type text, -- e.g., 'reminder', 'congrats', 'system'
    scheduled_for timestamptz,
    is_sent boolean DEFAULT FALSE,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create the 'public.ai_quizzes' table
CREATE TABLE public.ai_quizzes (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    skill_id uuid REFERENCES public.skills(id) ON DELETE SET NULL, -- Quizzes can be general or skill-specific
    questions_json jsonb NOT NULL, -- Stores quiz questions and answers in JSON format
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);
