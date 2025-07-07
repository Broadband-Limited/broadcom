import { isAuthenticated, isAuthorised } from '@/lib/db/auth';
import { getAllServices } from '@/lib/db/services';
import { getDivisions } from '@/lib/db/divisions';
import { redirect } from 'next/navigation';
import ServicesManager from './components/ServicesManager';

export default async function AdminServicesPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect('/auth/login');
  }

  const requiredRoles = ['admin', 'editor'];
  const authorised = await isAuthorised(requiredRoles);

  if (!authorised) {
    redirect('/auth/login');
  }

  // Fetch all services and divisions for initial state
  const { data: services, error: servicesError } = await getAllServices();
  const { data: divisions, error: divisionsError } = await getDivisions();

  if (servicesError) {
    console.error('Error fetching services:', servicesError);
  }

  if (divisionsError) {
    console.error('Error fetching divisions:', divisionsError);
  }

  return (
    <section className="!pb-48">
      <div className="mb-8 border-b border-foreground/10 pb-4">
        <h1 className="text-3xl font-bold text-dark-blue">Manage Services</h1>
        <p className="text-foreground/50 mt-2">
          Create, edit, and delete services within company divisions.
        </p>
      </div>
      <ServicesManager
        initialServices={services || []}
        divisions={divisions || []}
      />
    </section>
  );
}
