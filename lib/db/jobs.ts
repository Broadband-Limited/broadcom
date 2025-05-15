import { Job } from '@/shared/types/career';
import { createServer, createServiceRoleServer } from '../supabase/server';
import { supabase } from '../supabase/client';

export const getJobs = async () => {
  const supabase = await createServer();

  const { data: jobs, error } = await supabase
    .from('jobs')
    .select('*')
    .order('posted_at', { ascending: false });

  if (error) {
    console.error('Error fetching jobs:', error);
    throw new Error('Failed to fetch jobs');
  }

  return jobs;
};

export const getJobById = async (id: string) => {
  const supabase = await createServer();

  const { data: job, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching job:', error);
    throw new Error('Failed to fetch job');
  }

  return job;
};

export async function getJobsByLocation(location: string) {
  const supabase = await createServer();
  return supabase
    .from('jobs')
    .select('*')
    .eq('location', location)
    .order('posted_at', { ascending: false });
}

export const createJob = async (job: Omit<Job, 'id' | 'posted_at'>) => {
  const supabase = await createServiceRoleServer();
  return supabase.from('jobs').insert(job).select().single();
};

export const updateJob = async (id: string, updates: Partial<Job>) => {
  const supabase = await createServiceRoleServer();
  return supabase.from('jobs').update(updates).eq('id', id).select().single();
};

export const deleteJob = async (id: string) => {
  const supabase = await createServiceRoleServer();
  return supabase.from('jobs').delete().eq('id', id);
};

/**
 * Get all jobs directly from the database for static site generation
 * This version avoids using cookies or browser-specific APIs
 */
export async function getJobsForStaticGeneration() {
  try {
    // Direct database query approach that doesn't use cookies
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('posted_at', { ascending: false });

    if (error) {
      console.error('Error fetching jobs for static generation:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch jobs for static generation:', error);
    return [];
  }
}
