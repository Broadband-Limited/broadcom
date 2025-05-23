import { isAuthenticated, isAuthorised } from '@/lib/db/auth';
import { getJobs } from '@/lib/db/jobs';
import { getDivisions } from '@/lib/db/divisions';
import { redirect } from 'next/navigation';
import JobsManager from './components/JobsManager';

export default async function AdminJobsPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect('/auth/login');
  }

  const requiredRoles = ['admin', 'editor'];

  const authorised = await isAuthorised(requiredRoles);

  if (!authorised) {
    redirect('/auth/login');
  }
  // Fetch jobs and divisions for initial state
  const [jobs, { data: divisions }] = await Promise.all([
    getJobs().catch((error) => {
      console.error('Error fetching jobs:', error);
      return [];
    }),
    getDivisions().catch((error) => {
      console.error('Error fetching divisions:', error);
      return { data: [] };
    }),
  ]);

  return (
    <section className="container mx-auto px-4 py-8">
      <JobsManager initialJobs={jobs || []} divisions={divisions || []} />
    </section>
  );
}
