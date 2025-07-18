import { notFound } from 'next/navigation';
import ServiceTabs from '../components/ServiceTabs';
import { getAllServices, getServicesNoAuth } from '@/lib/db/services';
import { getServiceImageUrls } from '@/lib/storage';
import ImageCarousel from '@/shared/components/ImageCarousel';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params
export async function generateStaticParams() {
  const { data: services = [] } = await getServicesNoAuth();
  return (services ?? []).map((service) => ({ slug: service.slug }));
}

// Generate metadata
export async function generateMetadata({ params }: ProductPageProps) {
  const slug = (await params).slug;
  const { data: services = [] } = await getServicesNoAuth();
  const service = (services ?? []).find((s) => s.slug === slug);
  if (!service) return { title: 'Product Not Found' };
  return {
    title: `Broadband Communication Networks Ltd | ${service.title}`,
    description: service.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const slug = (await params).slug;
  const { data: services = [] } = await getAllServices();
  const service = (services ?? []).find((s) => s.slug === slug);
  if (!service) notFound();

  const imageUrls =
    service.images && service.images.length > 0
      ? getServiceImageUrls(service.images)
      : [];

  return (
    <section className="!p-0 !pb-16 flex flex-col gap-12">
      <div className="hero w-full p-0 aspect-[1/1] md:aspect-[23/9] grid grid-cols-1 grid-rows-1 group">
      
        {imageUrls.length > 0 ? (
          <ImageCarousel
            images={imageUrls}
            interval={3000}
            alt={`Broadband Communication Networks Ltd ${service.title}`}
            className="w-full h-full col-start-1 row-start-1 m-0 aspect-[1/1] md:aspect-[23/9]"
            imageDimensions='!aspect-[1/1] md:!aspect-[23/9]'
          />
        ) : (
          <div className="w-full h-full col-start-1 row-start-1 bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">No images available</p>
          </div>
        )}

        <div className="tint w-full h-full col-start-1 row-start-1 z-[3] bg-gradient-to-t from-[#000000ce] to-[#00000000]"></div>

        <h1 className="h-fit col-start-1 row-start-1 mt-auto px-4 md:px-32 py-2 md:py-4 !text-background z-[5]">
          {service.title}
        </h1>
      </div>

      <ServiceTabs
        title={service.title}
        description={service.description}
        details={service.details}
      />
    </section>
  );
}
