'use client';

import { useState } from 'react';
import { Division } from '@/lib/types/divisions_types';
import { useRouter } from 'next/navigation';
import Button from '@/shared/components/ui/Button';

interface DivisionListProps {
  divisions: Division[];
  onEdit: (division: Division) => void;
  onDelete: (id: string) => Promise<void>;
}

export default function DivisionList({
  divisions,
  onEdit,
  onDelete,
}: DivisionListProps) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        'Are you sure you want to delete this division? This will also delete all associated services.'
      )
    ) {
      return;
    }

    setIsDeleting(id);
    setError(null);

    try {
      await onDelete(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsDeleting(null);
    }
  };
  if (divisions.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-md border border-foreground/10">
        <p className="text-foreground/50">
          No divisions found. Create your first division.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {' '}
      {error && (
        <div className="bg-red-50 border border-red-500/30 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}
      <div className="w-full rounded-lg shadow border border-foreground/10">
        <table className="w-full divide-y divide-foreground/10">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-foreground/50 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-foreground/10">
            {divisions.map((division) => (
              <tr key={division.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-dark-blue">
                  {division.name}
                </td>
                <td className="px-6 py-4 text-sm text-foreground/50 max-w-xs truncate">
                  {division.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(division)}>
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        router.push(`/admin/divisions/services/${division.id}`)
                      }
                      className="text-green-600 border-green-600 hover:bg-green-50">
                      Services
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(division.id!)}
                      disabled={isDeleting === division.id}>
                      {isDeleting === division.id ? 'Deleting...' : 'Delete'}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
