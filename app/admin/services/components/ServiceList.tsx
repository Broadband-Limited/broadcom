'use client';

import { useState } from 'react';
import { Service, Division } from '@/lib/types/divisions_types';
import { getServiceImageUrl } from '@/lib/storage';
import Image from 'next/image';
import Button from '@/shared/components/ui/Button';

interface ServiceListProps {
  services: Service[];
  divisions: Division[];
  onEdit: (service: Service) => void;
  onDelete: (id: string) => void;
}

export default function ServiceList({
  services,
  divisions,
  onEdit,
  onDelete,
}: ServiceListProps) {
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  // Function to get division name from division ID
  const getDivisionName = (divisionId: string): string => {
    const division = divisions.find((d) => d.id === divisionId);
    return division?.name || 'Unknown Division';
  };

  // Function to handle delete confirmation
  const handleDeleteClick = (id: string) => {
    setConfirmDelete(id);
  };

  // Function to cancel delete
  const handleCancelDelete = () => {
    setConfirmDelete(null);
  };

  // Function to confirm delete
  const handleConfirmDelete = (id: string) => {
    onDelete(id);
    setConfirmDelete(null);
  };
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
    <div className="overflow-hidden bg-white shadow   border border-foreground/10">
      <ul role="list" className="divide-y divide-foreground/10">
        {services.map((service) => (
          <li key={service.id} className="relative">
            <div className="px-4 py-4 sm:px-6">
              {' '}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-0">
                <div className="flex items-center min-w-0 space-x-3 mb-3 sm:mb-0">
                  {service.image && (
                    <div className="relative flex-shrink-0 h-12 w-16 overflow-hidden rounded border border-foreground/10">
                      <Image
                        src={getServiceImageUrl(service.image)}
                        alt={service.title}
                        fill
                        sizes="64px"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-dark-blue truncate">
                      {service.title}
                    </p>
                    <p className="text-xs text-foreground/50 truncate">
                      {getDivisionName(service.division_id)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  {confirmDelete === service.id ? (
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleConfirmDelete(service.id!)}
                        variant="danger"
                        size="sm">
                        Confirm
                      </Button>
                      <Button
                        onClick={handleCancelDelete}
                        variant="outline"
                        size="sm">
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Button
                        onClick={() => onEdit(service)}
                        variant="outline"
                        size="sm">
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDeleteClick(service.id!)}
                        variant="danger"
                        size="sm">
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              </div>{' '}
              <div className="mt-2 sm:flex sm:justify-between sm:items-center">
                <div className="sm:flex sm:max-w-2xl">
                  <p className="text-sm text-foreground/70 line-clamp-2">
                    {service.description.length > 100
                      ? service.description.substring(0, 100) + '...'
                      : service.description}
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-foreground/50 sm:mt-0 sm:ml-4 whitespace-nowrap">
                  <p>
                    <span className="font-medium">
                      {service.details.length}
                    </span>{' '}
                    detail
                    {service.details.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
