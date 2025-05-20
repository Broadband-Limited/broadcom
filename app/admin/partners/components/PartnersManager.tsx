'use client';

import { useState } from 'react';
import { Partner } from '@/lib/types/partner_types';
import PartnerForm from './PartnerForm';
import PartnerList from './PartnerList';
import Button from '@/shared/components/ui/Button';

interface PartnersManagerProps {
  initialPartners: Partner[];
}

export default function PartnersManager({
  initialPartners,
}: PartnersManagerProps) {
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [selectedPartner, setSelectedPartner] = useState<Partner | undefined>(
    undefined
  );
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleAdd = () => {
    setSelectedPartner(undefined);
    setIsAdding(true);
    setIsEditing(false);
  };

  const handleEdit = (partner: Partner) => {
    setSelectedPartner(partner);
    setIsAdding(false);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setSelectedPartner(undefined);
    setIsAdding(false);
    setIsEditing(false);
  };

  const handleCreate = async (partner: Partner) => {
    try {
      const response = await fetch('/api/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(partner),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create partner');
      }

      const newPartner = await response.json();
      setPartners([...partners, newPartner]);
      setIsAdding(false);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unknown error occurred');
    }
  };

  const handleUpdate = async (partner: Partner) => {
    try {
      if (!partner.id) {
        throw new Error('Partner ID is required for updating');
      }

      const response = await fetch(`/api/partners/${partner.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(partner),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update partner');
      }

      const updatedPartner = await response.json();
      setPartners(
        partners.map((p) => (p.id === updatedPartner.id ? updatedPartner : p))
      );
      setIsEditing(false);
      setSelectedPartner(undefined);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unknown error occurred');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/partners/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete partner');
      }

      setPartners(partners.filter((p) => p.id !== id));
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
            ? 'Add New Partner'
            : isEditing
            ? 'Edit Partner'
            : 'Partners'}
        </h3>

        <div>
          {isAdding || isEditing ? (
            <Button onClick={handleCancel} variant="outline" size="default">
              Cancel
            </Button>
          ) : (
            <Button onClick={handleAdd} variant="primary" size="default">
              Add Partner
            </Button>
          )}
        </div>
      </div>

      {(isAdding || isEditing) && (
        <PartnerForm
          partner={selectedPartner}
          onSubmit={isAdding ? handleCreate : handleUpdate}
        />
      )}

      {!isAdding && !isEditing && (
        <PartnerList
          partners={partners}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
