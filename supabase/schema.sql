-- Enable pgcrypto extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create the jobs table
CREATE TABLE IF NOT EXISTS public.jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  department text NOT NULL,
  posted_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security on the jobs table
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Allow all users (including anonymous) to SELECT
CREATE POLICY "Public job select" ON public.jobs
  FOR SELECT
  USING (true);

-- Allow authenticated users to INSERT
CREATE POLICY "Authenticated job insert" ON public.jobs
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Allow authenticated users to UPDATE
CREATE POLICY "Authenticated job update" ON public.jobs
  FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- Allow authenticated users to DELETE
CREATE POLICY "Authenticated job delete" ON public.jobs
  FOR DELETE
  USING (auth.uid() IS NOT NULL);
