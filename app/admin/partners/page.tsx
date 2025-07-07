import { isAuthenticated, isAuthorised } from '@/lib/db/auth';
import { getPartners } from '@/lib/db/partners';
import { redirect } from 'next/navigation';
import PartnersManager from './components/PartnersManager';

export default async function AdminPartnersPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect('/auth/login');
  }

  const requiredRoles = ['admin', 'editor'];
  const authorised = await isAuthorised(requiredRoles);

  if (!authorised) {
    redirect('/auth/login');
  }

  // Fetch all partners for initial state
  const { data: partners, error: partnersError } = await getPartners();

  if (partnersError) {
    console.error('Error fetching partners:', partnersError);
  }

  return (
    <section className="min-h-screen !pb-48">
      <div className="mb-8 border-b border-foreground/10 pb-4">
        <h1 className="">Manage Partners</h1>
        <p className="mt-2">
          Create, edit, and delete partner information to showcase strategic
          collaborations.
        </p>
      </div>
      <PartnersManager initialPartners={partners || []} />
    </section>
  );
}
