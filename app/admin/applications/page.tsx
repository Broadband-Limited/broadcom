import { isAuthenticated, isAuthorised } from '@/lib/db/auth';
import { getApplications } from '@/lib/db/applications';
import { getJobs } from '@/lib/db/jobs';
import { redirect } from 'next/navigation';
import ApplicationsManager from './components/ApplicationsManager';

export default async function ApplicationsPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect('/auth/login');
  }

  const requiredRoles = ['admin', 'editor'];

  const authorised = await isAuthorised(requiredRoles);

  if (!authorised) {
    redirect('/auth/login');
  }

  const { data: applications, error: applicationsError } =
    await getApplications();

  if (applicationsError) {
    console.error('Error fetching applications:', applicationsError);
  }

  const jobs = await getJobs().catch((error) => {
    console.error('Error fetching jobs:', error);
    return [];
  });

  return (
    <section className="container mx-auto px-4 py-8">
      <ApplicationsManager
        initialApplications={applications || []}
        jobs={jobs || []}
      />
    </section>
  );
}
