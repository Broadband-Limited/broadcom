import { isAuthenticated, isAuthorised } from '@/lib/db/auth';
import { getDivisions } from '@/lib/db/divisions';
import { redirect } from 'next/navigation';
import DivisionsManager from '@/app/admin/divisions/components/DivisionsManager';

export default async function AdminDivisionsPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect('/auth/login');
  }

  const requiredRoles = ['admin', 'editor'];

  const authorised = await isAuthorised(requiredRoles);

  if (!authorised) {
    redirect('/auth/login');
  }

  const { data: divisions, error } = await getDivisions();

  if (error) {
    console.error('Error fetching divisions:', error);
  }

  return (
    <section className="!pb-48">
      <div className="mb-8 border-b border-foreground/10 pb-4">
        <h1 className="text-3xl font-bold text-dark-blue">Manage Divisions</h1>
        <p className="text-foreground/50 mt-2">
          Create, edit, and delete company divisions. Each division can have
          multiple services.
        </p>
      </div>

      <DivisionsManager initialDivisions={divisions || []} />
    </section>
  );
}
