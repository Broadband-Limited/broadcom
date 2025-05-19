'use client';

import { useState } from 'react';
import { Service, Division } from '@/lib/types/divisions_types';
import ServiceForm from '@/app/admin/services/components/ServiceForm';
import ServiceList from '@/app/admin/services/components/ServiceList';
import Button from '@/shared/components/ui/Button';

interface ServicesManagerProps {
  initialServices: Service[];
  divisions: Division[];
}

export default function ServicesManager({
  initialServices,
  divisions,
}: ServicesManagerProps) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [selectedService, setSelectedService] = useState<Service | undefined>(
    undefined
  );
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleAdd = () => {
    setSelectedService(undefined);
    setIsAdding(true);
    setIsEditing(false);
  };

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setIsAdding(false);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setSelectedService(undefined);
    setIsAdding(false);
    setIsEditing(false);
  };

  const handleCreate = async (service: Service) => {
    try {
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(service),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create service');
      }

      const newService = await response.json();
      setServices([...services, newService]);
      setIsAdding(false);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unknown error occurred');
    }
  };

  const handleUpdate = async (service: Service) => {
    try {
      if (!service.id) {
        throw new Error('Service ID is required for updating');
      }

      const response = await fetch(`/api/services/${service.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(service),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update service');
      }

      const updatedService = await response.json();
      setServices(
        services.map((s) => (s.id === updatedService.id ? updatedService : s))
      );
      setIsEditing(false);
      setSelectedService(undefined);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unknown error occurred');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete service');
      }

      setServices(services.filter((s) => s.id !== id));
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unknown error occurred');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-dark-blue">
          {isAdding
            ? 'Add New Service'
            : isEditing
            ? 'Edit Service'
            : 'Services'}
        </h3>

        <div>
          {isAdding || isEditing ? (
            <Button onClick={handleCancel} variant="outline" size="default">
              Cancel
            </Button>
          ) : (
            <Button onClick={handleAdd} variant="primary" size="default">
              Add Service
            </Button>
          )}
        </div>
      </div>

      {(isAdding || isEditing) && (
        <ServiceForm
          service={selectedService}
          divisions={divisions}
          onSubmit={isAdding ? handleCreate : handleUpdate}
        />
      )}

      {!isAdding && !isEditing && (
        <ServiceList
          services={services}
          divisions={divisions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
