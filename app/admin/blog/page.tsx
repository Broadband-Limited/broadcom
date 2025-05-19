import { isAuthenticated, isAuthorised } from '@/lib/db/auth';
import { redirect } from 'next/navigation';

export default async function AdminBlogPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect('/auth/login');
  }

  const requiredRoles = ['admin', 'editor'];

  const authorised = await isAuthorised(requiredRoles);

  if (!authorised) {
    redirect('/auth/login');
  }

  return (
    <section>
      <h2>admin blog panel</h2>
    </section>
  );
}
