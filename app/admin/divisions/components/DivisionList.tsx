'use client';

import { useState } from 'react';
import { Division } from '@/lib/types/divisions_types';
import { useRouter } from 'next/navigation';
import AdminContextMenu, { AdminContextMenuAction } from '@/shared/components/ui/AdminContextMenu';
import ConfirmationModal from '@/shared/components/ui/ConfirmationModal';
import { useConfirmation } from '@/shared/hooks/useConfirmation';
import { Edit, Trash2, Settings } from 'lucide-react';

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
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { confirm, confirmationProps } = useConfirmation();

  const handleDelete = async (id: string, name: string) => {
    const confirmed = await confirm({
      title: 'Delete Division',
      message: `Are you sure you want to delete "${name}"?\nThis action cannot be undone.`,
      confirmText: 'Delete',
      variant: 'danger',
    });

    if (!confirmed) {
      return;
    }

    setIsDeleting(id);
    setError(null);

    try {
      await onDelete(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete division');
    } finally {
      setIsDeleting(null);
    }
  };

  const createActions = (division: Division): AdminContextMenuAction[] => [
    {
      label: 'Edit',
      icon: Edit,
      onClick: () => onEdit(division),
    },
    {
      label: 'Services',
      icon: Settings,
      onClick: () => router.push(`/admin/divisions/services/${division.id}`),
    },
    {
      label: 'Delete',
      icon: Trash2,
      onClick: () => handleDelete(division.id!, division.name),
      destructive: true,
      disabled: isDeleting === division.id,
    },
  ];

  if (divisions.length === 0) {
    return (
      <div className="text-center py-10 border bg-gray-50 border-foreground/10">
        <p className="text-foreground/50">
          No divisions found. Add a new division to get started.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full space-y-4">
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
                    <AdminContextMenu
                      actions={createActions(division)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmationModal
        {...confirmationProps}
        isLoading={isDeleting !== null}
      />
    </>
  );
}
