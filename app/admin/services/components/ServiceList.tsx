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
    <div className="overflow-hidden bg-background shadow border border-foreground/10">
      <ul role="list" className="divide-y divide-foreground/10">
        {services.map((service) => (
          <li key={service.id} className="relative">
            <div className="px-4 py-4 sm:px-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-0">
                <div className="flex items-center min-w-0 space-x-3 mb-3 sm:mb-0">
                  {service.images && service.images.length > 0 && (
                    <div className="relative shrink-0 w-24 aspect-[4/3]">
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
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
