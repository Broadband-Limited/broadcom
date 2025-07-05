'use client';

import { useState } from 'react';
import { Division, ServiceWithRelations } from '@/lib/types/divisions_types';
import { getServiceImageUrl } from '@/lib/storage';
import Image from 'next/image';
import AdminContextMenu, {
  AdminContextMenuAction,
} from '@/shared/components/ui/AdminContextMenu';
import {
  Edit,
  Trash2,
  Eye,
  Tag,
  Image as ImageIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useConfirmation } from '@/shared/hooks/useConfirmation';
import ConfirmationModal from '@/shared/components/ui/ConfirmationModal';
import toast from 'react-hot-toast';

interface ServiceListProps {
  services: ServiceWithRelations[];
  divisions: Division[];
  onEdit: (service: ServiceWithRelations) => void;
  onDelete: (id: string) => Promise<void>;
}

export default function ServiceList({
  services,
  divisions,
  onEdit,
  onDelete,
}: ServiceListProps) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const { confirm, confirmationProps } = useConfirmation();

  const getDivisionName = (divisionId: string): string => {
    const division = divisions.find((d) => d.id === divisionId);
    return division?.name ?? 'Unknown Division';
  };

  const handleDelete = async (id: string, title: string): Promise<void> => {
    const confirmed = await confirm({
      title: 'Delete Service',
      message: `Are you sure you want to delete "${title}"? This action cannot be undone.`,
      confirmText: 'Delete',
      variant: 'danger',
    });

    if (!confirmed) {
      return;
    }

    setIsDeleting(id);
    try {
      await onDelete(id);
      toast.success('Service deleted successfully');
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to delete service'
      );
    } finally {
      setIsDeleting(null);
    }
  };

  const createActions = (
    service: ServiceWithRelations
  ): AdminContextMenuAction[] => [
    {
      label: 'View',
      icon: Eye,
      onClick: () => window.open(`/products/${service.slug}`, '_blank'),
      external: true,
    },
    {
      label: 'Edit',
      icon: Edit,
      onClick: () => onEdit(service),
    },
    {
      label: 'Delete',
      icon: Trash2,
      onClick: () => handleDelete(service.id!, service.title),
      destructive: true,
      disabled: isDeleting === service.id,
    },
  ];

  if (services.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <ImageIcon className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No services found
        </h3>
        <p className="text-gray-500 max-w-sm">
          Get started by adding your first service to this division.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service.id}
            className={cn(
              'group relative bg-white rounded-xs border border-gray-200 shadow-sm',
              'hover:shadow-md hover:border-gray-300 transition-all duration-200',
              'overflow-hidden',
              isDeleting === service.id && 'opacity-50 pointer-events-none'
            )}>
            <div className="flex items-start p-6 gap-6">
              {/* Service Image */}
              <div className="relative flex-shrink-0">
                {service.images && service.images.length > 0 ? (
                  <div className="relative w-24 h-24 rounded-xs overflow-hidden bg-gray-100 border border-gray-200">
                    <Image
                      src={getServiceImageUrl(service.images[0])}
                      alt={service.title}
                      width={1000}
                      height={1000}
                      className="w-full h-full object-cover"
                    />
                    {service.images.length > 1 && (
                      <div className="absolute bottom-1 right-1 bg-black/75 text-white text-xs px-1.5 py-0.5 rounded">
                        +{service.images.length - 1}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Service Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-dark-blue transition-colors">
                      {service.title}
                    </h3>
                    <p className="!text-sm text-gray-500 mt-1">
                      {getDivisionName(service.division_id)}
                    </p>
                  </div>

                  {/* Actions Menu */}
                  <div className="flex-shrink-0 ml-4">
                    <AdminContextMenu actions={createActions(service)} />
                  </div>
                </div>

                {/* Service Description */}
                <p className="!text-sm line-clamp-2 mb-4">
                  {service.description}
                </p>

                {/* Service Meta Information */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                  {/* Category Badge */}
                  {service.categories && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                      <Tag size={12} />
                      <span className="font-medium">
                        {service.categories.name}
                      </span>
                    </div>
                  )}

                  {/* Images Count */}
                  {service.images && service.images.length > 0 && (
                    <div className="flex items-center gap-1.5">
                      <ImageIcon size={12} />
                      <span>
                        {service.images.length} image
                        {service.images.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  )}

                  {/* Service Details Count */}
                  {service.details && service.details.length > 0 && (
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-gray-300 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                      </div>
                      <span>
                        {service.details.length} detail
                        {service.details.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Loading Overlay */}
            {isDeleting === service.id && (
              <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-lg border">
                  <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm text-gray-700">Deleting...</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <ConfirmationModal
        {...confirmationProps}
        isLoading={isDeleting !== null}
      />
    </>
  );
}
