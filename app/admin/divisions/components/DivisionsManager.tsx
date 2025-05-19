'use client';

import { useState } from 'react';
import { Division } from '@/lib/types/divisions_types';
import DivisionForm from './DivisionForm';
import DivisionList from './DivisionList';
import Button from '@/shared/components/ui/Button';

interface DivisionsManagerProps {
  initialDivisions: Division[];
}

export default function DivisionsManager({
  initialDivisions,
}: DivisionsManagerProps) {
  const [divisions, setDivisions] = useState<Division[]>(initialDivisions);
  const [selectedDivision, setSelectedDivision] = useState<
    Division | undefined
  >(undefined);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleAdd = () => {
    setSelectedDivision(undefined);
    setIsAdding(true);
    setIsEditing(false);
  };

  const handleEdit = (division: Division) => {
    setSelectedDivision(division);
    setIsAdding(false);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setSelectedDivision(undefined);
    setIsAdding(false);
    setIsEditing(false);
  };

  const handleCreate = async (division: Division) => {
    try {
      const response = await fetch('/api/divisions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(division),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create division');
      }

      const newDivision = await response.json();
      setDivisions([...divisions, newDivision]);
      setIsAdding(false);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unknown error occurred');
    }
  };

  const handleUpdate = async (division: Division) => {
    try {
      const response = await fetch(`/api/divisions/${division.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(division),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update division');
      }

      const updatedDivision = await response.json();
      setDivisions(
        divisions.map((d) =>
          d.id === updatedDivision.id ? updatedDivision : d
        )
      );
      setIsEditing(false);
      setSelectedDivision(undefined);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unknown error occurred');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/divisions/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete division');
      }

      setDivisions(divisions.filter((d) => d.id !== id));
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unknown error occurred');
    }
  };

  return (
    <div className="w-full space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-dark-blue">
          {isAdding
            ? 'Add New Division'
            : isEditing
            ? 'Edit Division'
            : 'Divisions'}
        </h2>

        <div>
          {isAdding || isEditing ? (
            <Button onClick={handleCancel} variant="outline" size="default">
              Cancel
            </Button>
          ) : (
            <Button onClick={handleAdd} variant="primary" size="default">
              Add Division
            </Button>
          )}
        </div>
      </div>

      {(isAdding || isEditing) && (
        <DivisionForm
          division={selectedDivision}
          onSubmit={isAdding ? handleCreate : handleUpdate}
        />
      )}

      {!isAdding && !isEditing && (
        <DivisionList
          divisions={divisions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
