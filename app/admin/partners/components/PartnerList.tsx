'use client';

import { useState } from 'react';
import { Partner } from '@/lib/types/partner_types';
import { getPartnerImageUrl } from '@/lib/storage';
import Image from 'next/image';
import Link from 'next/link';
import { Edit, Trash2, ExternalLink } from 'lucide-react';
import AdminContextMenu, {
  AdminContextMenuAction,
} from '@/shared/components/ui/AdminContextMenu';
import { useConfirmation } from '@/shared/hooks/useConfirmation';
import ConfirmationModal from '@/shared/components/ui/ConfirmationModal';
import { cn } from '@/lib/utils';

interface PartnerListProps {
  partners: Partner[];
  onEdit: (partner: Partner) => void;
  onDelete: (id: string) => void;
}

export default function PartnerList({
  partners,
  onEdit,
  onDelete,
}: PartnerListProps) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const { confirm, confirmationProps } = useConfirmation();

  // Sort partners by rank
  const sortedPartners = [...partners].sort(
    (a, b) => (a.rank || 0) - (b.rank || 0)
  );

  const handleDelete = async (id: string, name: string) => {
    const confirmed = await confirm({
      title: 'Delete Partner',
      message: `Are you sure you want to delete "${name}"? This action cannot be undone.`,
      confirmText: 'Delete',
      variant: 'danger',
    });

    if (!confirmed) {
      return;
    }

    setIsDeleting(id);
    try {
      await onDelete(id);
    } finally {
      setIsDeleting(null);
    }
  };

  const createActions = (partner: Partner): AdminContextMenuAction[] => [
    {
      label: 'Edit',
      icon: Edit,
      onClick: () => onEdit(partner),
    },
    {
      label: 'Delete',
      icon: Trash2,
      onClick: () => handleDelete(partner.id!, partner.name),
      destructive: true,
      disabled: isDeleting === partner.id,
    },
  ];

  if (partners.length === 0) {
    return (
      <div className="text-center py-10 border bg-gray-50 border-foreground/10">
        <p className="text-foreground/50">
          No partners found. Add a new partner to get started.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-background shadow border border-foreground/10">
        {sortedPartners.map((partner) => (
          <div
            key={partner.id}
            className={cn(
              'relative',
              'px-4 py-4 sm:px-6',
              'flex items-center justify-between',
              'border-b border-foreground/10'
            )}>
            <div className="flex items-center min-w-0 space-x-3">
              {partner.image && (
                <Image
                  src={getPartnerImageUrl(partner.image)}
                  alt={partner.name}
                  width={1000}
                  height={1000}
                  className="shrink-0 w-24 aspect-[4/3]"
                />
              )}

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-dark-blue truncate">
                  {partner.name}
                </p>
                <Link
                  href={partner.link}
                  target="_blank"
                  className="text-xs text-foreground/50 flex items-center hover:text-foreground">
                  {partner.link.replace(/^https?:\/\//i, '')}
                  <ExternalLink size={12} className="ml-1" />
                </Link>
              </div>
            </div>

            <AdminContextMenu actions={createActions(partner)} />
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
