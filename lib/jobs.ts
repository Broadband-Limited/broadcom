import { supabase } from './supabaseClient';
import type { Job } from '../shared/types/job';

/** Fetch all jobs, ordered by most recent posted */
export async function getJobs(): Promise<Job[]> {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .order('posted_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

/** Fetch a single job by ID */
export async function getJobById(id: string): Promise<Job | null> {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

/** Create a new job posting */
export async function createJob(
  job: Omit<Job, 'id' | 'posted_at'>
): Promise<Job> {
  const { data, error } = await supabase
    .from('jobs')
    .insert([{ ...job, posted_at: new Date().toISOString() }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

/** Update an existing job by ID */
export async function updateJob(
  id: string,
  updates: Partial<Omit<Job, 'id' | 'posted_at'>>
): Promise<Job> {
  const { data, error } = await supabase
    .from('jobs')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/** Delete a job by ID */
export async function deleteJob(id: string): Promise<void> {
  const { error } = await supabase.from('jobs').delete().eq('id', id);
  if (error) throw error;
}
