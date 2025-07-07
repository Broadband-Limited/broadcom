'use client';

import { useState } from 'react';
import { Category } from '@/lib/types/divisions_types';
import AdminContextMenu, {
  AdminContextMenuAction,
} from '@/shared/components/ui/AdminContextMenu';
import ConfirmationModal from '@/shared/components/ui/ConfirmationModal';
import { useConfirmation } from '@/shared/hooks/useConfirmation';
import { Edit, Trash2 } from 'lucide-react';

interface CategoryListProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => Promise<void>;
}

export default function CategoryList({
  categories,
  onEdit,
  onDelete,
}: CategoryListProps) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { confirm, confirmationProps } = useConfirmation();

  const handleDelete = async (id: string, name: string) => {
    const confirmed = await confirm({
      title: 'Delete Category',
      message: `Are you sure you want to delete "${name}"?\nThis action cannot be undone and will remove the category from all associated services.`,
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
      setError(
        err instanceof Error ? err.message : 'Failed to delete category'
      );
    } finally {
      setIsDeleting(null);
    }
  };

  const createActions = (category: Category): AdminContextMenuAction[] => [
    {
      label: 'Edit',
      icon: Edit,
      onClick: () => onEdit(category),
    },
    {
      label: 'Delete',
      icon: Trash2,
      onClick: () => handleDelete(category.id!, category.name),
      destructive: true,
      disabled: isDeleting === category.id,
    },
  ];

  if (categories.length === 0) {
    return (
      <div className="text-center py-10 border bg-gray-50 border-foreground/10">
        <p className="text-foreground/50">
          No categories found. Add a new category to get started.
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
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-dark-blue">
                    {category.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground/50 max-w-xs truncate">
                    {category.description || 'No description'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <AdminContextMenu actions={createActions(category)} />
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
