'use client';

import { useState } from 'react';
import { Partner } from '@/lib/types/partner_types';
import { getPartnerImageUrl } from '@/lib/storage';
import Image from 'next/image';
import Button from '@/shared/components/ui/Button';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

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
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  // Sort partners by rank
  const sortedPartners = [...partners].sort(
    (a, b) => (a.rank || 0) - (b.rank || 0)
  );

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
    <div className="overflow-hidden bg-white shadow border border-foreground/10">
      <ul role="list" className="divide-y divide-foreground/10">
        {sortedPartners.map((partner) => (
          <li key={partner.id} className="relative">
            <div className="px-4 py-4 sm:px-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-0">
                <div className="flex items-center min-w-0 space-x-3 mb-3 sm:mb-0">
                  {partner.image && (
                    <div className="relative flex-shrink-0 h-12 w-16 overflow-hidden rounded border border-foreground/10">
                      <Image
                        src={getPartnerImageUrl(partner.image)}
                        alt={partner.name}
                        fill
                        sizes="64px"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
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
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  {confirmDelete === partner.id ? (
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleConfirmDelete(partner.id!)}
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
                        onClick={() => onEdit(partner)}
                        variant="outline"
                        size="sm">
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDeleteClick(partner.id!)}
                        variant="danger"
                        size="sm">
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between sm:items-center">
                <div className="sm:flex sm:max-w-2xl">
                  <p className="text-sm text-foreground/70 line-clamp-2">
                    {partner.description.length > 100
                      ? partner.description.substring(0, 100) + '...'
                      : partner.description}
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-foreground/50 sm:mt-0 sm:ml-4 whitespace-nowrap">
                  <p>
                    <span className="font-medium">
                      Order: {partner.rank || 0}
                    </span>
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
