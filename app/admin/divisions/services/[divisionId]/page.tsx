import { isAuthenticated, isAuthorised } from '@/lib/db/auth';
import { getServicesByDivisionId } from '@/lib/db/services';
import { getDivisionById } from '@/lib/db/divisions';
import { getCategoriesByDivisionId } from '@/lib/db/categories';
import { redirect } from 'next/navigation';
import ServicesManager from '@/app/admin/services/components/ServicesManager';
import CategoriesManager from '@/app/admin/categories/components/CategoriesManager';
import Link from 'next/link';

export default async function AdminDivisionServicesPage({
  params,
}: {
  params: Promise<{ divisionId: string }>;
}) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect('/auth/login');
  }

  const requiredRoles = ['admin', 'editor'];
  const authorised = await isAuthorised(requiredRoles);

  if (!authorised) {
    redirect('/auth/login');
  }

  const { divisionId } = await params;

  // Fetch services for this division
  const { data: services, error: servicesError } =
    await getServicesByDivisionId(divisionId);

  // Fetch categories for this division
  const { data: categories, error: categoriesError } =
    await getCategoriesByDivisionId(divisionId);

  // Fetch division details
  const { data: division, error: divisionError } = await getDivisionById(
    divisionId
  );

  if (divisionError || !division) {
    console.error('Error fetching division:', divisionError);
    redirect('/admin/divisions');
  }

  if (servicesError) {
    console.error('Error fetching services:', servicesError);
  }

  if (categoriesError) {
    console.error('Error fetching categories:', categoriesError);
  }

  return (
    <section className="!pt-12">
      <div className="mb-8 border-b border-foreground/10 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
          <h2 className="text-3xl font-bold text-dark-blue mb-2 sm:mb-0">
            {division.name}
          </h2>

          <Link
            href="/admin/divisions"
            className="inline-flex items-center text-dark-blue hover:underline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Divisions
          </Link>
        </div>
        <p className="text-foreground/50 mt-2">
          Manage categories and services for this division.
        </p>
      </div>

      {/* Categories Section */}
      <div className="mb-12">
        <CategoriesManager
          initialCategories={categories || []}
          division={division}
        />
      </div>

      {/* Services Section */}
      <div>
        <ServicesManager
          initialServices={services || []}
          divisions={[division]}
        />
      </div>
    </section>
  );
}
