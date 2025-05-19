import { Application, ApplicationStatus } from '@/lib/types/career_types';
import { createServer, createServiceRoleServer } from '../supabase/server';

export const submitApplication = async (
  application: Omit<Application, 'id' | 'applied_at' | 'status'>
) => {
  const supabase = await createServer();
  return supabase.from('applications').insert(application).select().single();
};

export const getApplications = async (jobId?: string) => {
  const supabase = await createServiceRoleServer();
  let query = supabase.from('applications').select('*');

  if (jobId) {
    query = query.eq('job_id', jobId);
  }

  return query.order('applied_at', { ascending: false });
};

export const updateApplicationStatus = async (
  id: string,
  status: ApplicationStatus
) => {
  const supabase = createServiceRoleServer();
  return supabase
    .from('applications')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
};
