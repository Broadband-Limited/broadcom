import Link from 'next/link';
import { getDivisionBySlug, getDivisionsNoAuth } from '@/lib/db/divisions';
import { getServicesByDivisionId } from '@/lib/db/services';
import { getCategoriesNoAuth } from '@/lib/db/categories';
import DivisionServicesFilter from './components/DivisionServicesFilter';
import type { Category, ServiceWithRelations } from '@/lib/types/divisions_types';

interface DivisionPageProps {
  params: Promise<{ slug: string }>;
}

// Metadata from Supabase
export async function generateMetadata({ params }: DivisionPageProps) {
  const slug = (await params).slug;
  const { data: division } = await getDivisionBySlug(slug);
  return {
    title: division?.name || 'Division Not Found',
    description:
      division?.description || 'Broadband Communications Networks division',
  };
}

// Static params from Supabase
export async function generateStaticParams() {
  // use anon client here so cookies() is never called
  const { data: divisions } = await getDivisionsNoAuth();
  return (divisions ?? []).map((d) => ({ slug: d.slug }));
}

export default async function DivisionPage({ params }: DivisionPageProps) {
  const slug = (await params).slug;
  const { data: division } = await getDivisionBySlug(slug);

  if (!division) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="text-4xl font-bold mb-4">Division Not Found</h1>
          <p className="text-lg mb-8">
            The requested division could not be found. Please check the URL or
            return to our homepage.
          </p>
          <Link
            href="/"
            className="bg-purple text-white px-6 py-3 rounded-lg hover:bg-purple-dark transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  // Fetch services and categories for this division
  const [{ data: services = [] }, { data: categories = [] }] =
    await Promise.all([
      getServicesByDivisionId(division.id!),
      getCategoriesNoAuth(division.id!),
    ]);

  return (
    <section className="flex flex-col gap-6">
      <h1 className="w-full hidden md:flex mt-8 text-center justify-center">
        {division.name}
      </h1>

      <h3 className="w-full flex md:hidden mt-4 text-center justify-center">
        {division.name}
      </h3>

      <p className="w-full text-left">{division.description}</p>

      <hr className="border-slate-300" />

      {/* Services with category filtering */}
      <DivisionServicesFilter
        services={services as ServiceWithRelations[]}
        categories={categories as Category[]}
      />
    </section>
  );
}
