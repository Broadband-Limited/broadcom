'use client';

import { useState } from 'react';
import { Service, Division } from '@/lib/types/divisions_types';
import { getServiceImageUrl } from '@/lib/storage';
import Image from 'next/image';
import AdminContextMenu, {
  AdminContextMenuAction,
} from '@/shared/components/ui/AdminContextMenu';
import { Edit, Trash2, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useConfirmation } from '@/shared/hooks/useConfirmation';
import ConfirmationModal from '@/shared/components/ui/ConfirmationModal';
import toast from 'react-hot-toast';

interface ServiceListProps {
  services: Service[];
  divisions: Division[];
  onEdit: (service: Service) => void;
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
    return division ? division.name : 'Unknown Division';
  };

  const handleDelete = async (id: string, title: string) => {
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
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to delete service'
      );
    } finally {
      setIsDeleting(null);
    }
  };

  const createActions = (service: Service): AdminContextMenuAction[] => [
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
      <div className="text-center py-10 border bg-gray-50 border-foreground/10">
        <p className="text-foreground/50">
          No services found. Add a new service to get started.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-background shadow border border-foreground/10">
        {services.map((service) => (
          <div
            key={service.id}
            className={cn(
              'relative',
              'px-4 py-4 sm:px-6',
              'flex items-center justify-between',
              'border-b border-foreground/10'
            )}>
            <div className="flex items-center min-w-0 space-x-3">
              {service.images && service.images.length > 0 && (
                <div className="relative w-24 aspect-[4/3] bg-gray-100 shrink-0 overflow-hidden">
                  <Image
                    src={getServiceImageUrl(service.images[0])}
                    alt={service.title}
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover"
                  />
                  {service.images.length > 1 && (
                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                      +{service.images.length - 1}
                    </div>
                  )}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold text-dark-blue truncate">
                  {service.title}
                </h4>
                <p className="text-xs text-foreground/50 truncate">
                  {getDivisionName(service.division_id)}
                </p>
                {service.images && (
                  <p className="text-xs text-foreground/40">
                    {service.images.length} image
                    {service.images.length !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>
            <AdminContextMenu actions={createActions(service)} />
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
