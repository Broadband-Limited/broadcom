import Link from 'next/link';
import Image from 'next/image';
import {
  getDivisionBySlug,
  getDivisionsNoAuth,
} from '@/lib/db/divisions';
import { getServicesByDivisionId } from '@/lib/db/services';
import Button from '@/shared/components/ui/Button';
import { getServiceImageUrl } from '@/lib/storage';

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

  const { data: services = [] } = await getServicesByDivisionId(division.id!);

  return (
    <section className="flex flex-col gap-6">
      <h1 className="w-full hidden md:flex mt-8 text-center justify-center">
        {division.name}
      </h1>

      <h3 className="w-full flex md:hidden mt-4 text-center justify-center">
        {division.name}
      </h3>

      <p className="text-sm md:text-base md:text-center">
        {division.description}
      </p>

      <hr className="border-slate-300" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {(services ?? []).map((service) => (
          <div
            key={service.id}
            className="w-full aspect-square md:aspect-[3/4] border border-slate-200 shadow-lg hover:shadow transition-all duration-300">
            <div className="img w-full aspect-[4/3]">
              <Image
                src={getServiceImageUrl(service.image)}
                alt={`${service.title} | Broadband Communication Networks Ltd`}
                width={1000}
                height={1000}
                className="w-full h-full"
              />
            </div>

            <div className="details w-full aspect-[4/1] md:aspect-[1.7] flex flex-col gap-6 justify-between p-2 md:p-4">
              <h4 className="font-semibold">{service.title}</h4>
              <p
                className="truncate text-sm border-l-4 border-light-blue pl-2 ml-2"
                title={service.description}>
                {service.description}
              </p>
              <Button href={`/products/${service.slug}`}>Learn More</Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
