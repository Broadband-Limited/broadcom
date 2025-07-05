'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { getServiceImageUrl } from '@/lib/storage';
import Button from '@/shared/components/ui/Button';
import type {
  ServiceWithRelations,
  Category,
} from '@/lib/types/divisions_types';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface DivisionServicesFilterProps {
  services: ServiceWithRelations[];
  categories: Category[];
}

type FilterOption = 'all' | string; // 'all' or category ID

export default function DivisionServicesFilter({
  services,
  categories,
}: DivisionServicesFilterProps) {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');

  // Filter services based on selected category
  const filteredServices = useMemo(() => {
    if (activeFilter === 'all') {
      return services;
    }

    return services.filter((service) => {
      // Show services that match the selected category
      return service.category_id === activeFilter;
    });
  }, [services, activeFilter]);

  // Get uncategorized services count
  const uncategorizedCount = useMemo(() => {
    return services.filter((service) => !service.category_id).length;
  }, [services]);

  // Don't show filter if there are no categories
  const showFilter = categories.length > 0;

  return (
    <div className="w-full">
      {/* Category Filter Tabs */}
      {showFilter && (
        <div className="w-full mb-8">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {/* All Services Tab */}
            <button
              onClick={() => setActiveFilter('all')}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                'border border-slate-200',
                activeFilter === 'all'
                  ? 'bg-dark-blue text-white border-dark-blue'
                  : 'bg-white text-slate-700 hover:bg-slate-50'
              )}>
              All Services
            </button>

            {/* Category Tabs */}
            {categories.map((category) => {
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id!)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    'border border-slate-200',
                    activeFilter === category.id
                      ? 'bg-dark-blue text-white border-dark-blue'
                      : 'bg-white text-slate-700 hover:bg-slate-50'
                  )}>
                  {category.name}
                </button>
              );
            })}

            {/* Uncategorized Tab - only show if there are uncategorized services */}
            {uncategorizedCount > 0 && (
              <button
                onClick={() => setActiveFilter('uncategorized')}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  'border border-slate-200',
                  activeFilter === 'uncategorized'
                    ? 'bg-dark-blue text-white border-dark-blue'
                    : 'bg-white text-slate-700 hover:bg-slate-50'
                )}>
                Other
              </button>
            )}
          </div>

          {/* Active Filter Description */}
          {activeFilter !== 'all' && activeFilter !== 'uncategorized' && (
            <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
              {(() => {
                const selectedCategory = categories.find(
                  (cat) => cat.id === activeFilter
                );
                return selectedCategory?.description ? (
                  <p className="text-sm text-slate-600">
                    {selectedCategory.description}
                  </p>
                ) : null;
              })()}
            </div>
          )}
        </div>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-slate-500 text-lg">
              {activeFilter === 'all'
                ? 'No services available in this division.'
                : activeFilter === 'uncategorized'
                ? 'No uncategorized services found.'
                : 'No services found in this category.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Separate Service Card Component for better organization
interface ServiceCardProps {
  service: ServiceWithRelations;
}

function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="w-full aspect-square md:aspect-[3/4] border border-slate-200 shadow-lg hover:shadow transition-all duration-300">
      {/* Service Image */}
      <div className="img w-full aspect-[4/3] relative">
        {service.images && service.images.length > 0 ? (
          <Link href={`/products/${service.slug}`} target="_blank">
            <Image
              src={getServiceImageUrl(service.images[0])}
              alt={`${service.title} | Broadband Communication Networks Ltd`}
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
            />
            {service.images.length > 1 && (
              <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                +{service.images.length - 1} more
              </div>
            )}
          </Link>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500 text-sm">No image</p>
          </div>
        )}
      </div>

      {/* Service Details */}
      <div className="details w-full aspect-[4/1] md:aspect-[1.7] flex flex-col gap-6 justify-between p-2 md:p-4">
        <div className="flex-1">
          <h4 className="font-semibold mb-2">{service.title}</h4>

          {/* Category Badge */}
          {service.categories && (
            <div className="mb-3">
              <span className="inline-block px-2 py-1 text-xs bg-light-blue/10 text-dark-blue rounded-full border border-light-blue/20">
                {service.categories.name}
              </span>
            </div>
          )}

          <p
            className="text-sm text-slate-600 line-clamp-2"
            title={service.description}>
            {service.description}
          </p>
        </div>

        <Button href={`/products/${service.slug}`} target="_blank">
          Learn More
        </Button>
      </div>
    </div>
  );
}
