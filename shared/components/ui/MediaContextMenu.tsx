'use client';

import { useState, useRef, useEffect } from 'react';
import {
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Copy,
  Globe,
  EyeOff,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface MediaContextMenuProps {
  itemId: string;
  itemSlug: string;
  published?: boolean;
}

export default function MediaContextMenu({
  itemId,
  itemSlug,
  published = false,
}: MediaContextMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close menu on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  const handleCopyLink = async () => {
    try {
      const url = `${window.location.origin}/media/${itemSlug}`;
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard');
      setIsOpen(false);
    } catch (error) {
      toast.error('Failed to copy link');
      console.error('Error copying link:', error);
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        'Are you sure you want to delete this media item? This action cannot be undone.'
      )
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/media/${itemId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete media item');
      }

      toast.success('Media item deleted successfully');
      router.refresh();
    } catch (error) {
      toast.error('Failed to delete media item');
      console.error('Error deleting media item:', error);
    } finally {
      setIsDeleting(false);
      setIsOpen(false);
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    
    try {
      const response = await fetch(`/api/media/${itemId}/publish`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ published: !published }),
      });

      if (!response.ok) {
        throw new Error('Failed to update publish status');
      }

      toast.success(
        published
          ? 'Media item unpublished successfully'
          : 'Media item published successfully'
      );
      router.refresh();
    } catch (error) {
      toast.error('Failed to update publish status');
      console.error('Error updating publish status:', error);
    } finally {
      setIsPublishing(false);
      setIsOpen(false);
    }
  };

  const menuItems = [
    {
      label: 'View',
      icon: Eye,
      onClick: () => {
        window.open(`/media/${itemSlug}`, '_blank');
        setIsOpen(false);
      },
    },
    {
      label: 'Edit',
      icon: Edit,
      onClick: () => {
        router.push(`/admin/media/edit/${itemId}`);
        setIsOpen(false);
      },
    },
    {
      label: published ? 'Unpublish' : 'Publish',
      icon: published ? EyeOff : Globe,
      onClick: handlePublish,
      disabled: isPublishing,
    },
    {
      label: 'Copy Link',
      icon: Copy,
      onClick: handleCopyLink,
    },
    {
      label: 'Delete',
      icon: Trash2,
      onClick: handleDelete,
      destructive: true,
      disabled: isDeleting,
    },
  ];

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-1.5 rounded-md hover:bg-gray-100 transition-colors duration-200 ml-auto"
        aria-label="More options"
        aria-expanded={isOpen}
        aria-haspopup="true">
        <MoreVertical size={16} className="text-gray-600" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div
            ref={menuRef}
            className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1"
            role="menu"
            aria-orientation="vertical">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={item.onClick}
                  disabled={item.disabled}
                  className={`
                    w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 transition-colors duration-150
                    ${
                      item.destructive
                        ? 'text-red-600 hover:bg-red-50 hover:text-red-700'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }
                    ${
                      item.disabled
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-gray-50'
                    }
                    first:rounded-t-lg last:rounded-b-lg
                  `}
                  role="menuitem">
                  <Icon
                    size={16}
                    className={
                      item.destructive ? 'text-red-500' : 'text-gray-500'
                    }
                  />
                  <span>
                    {(item.disabled && isDeleting && 'Deleting...') ||
                      (item.disabled &&
                        isPublishing &&
                        (published ? 'Unpublishing...' : 'Publishing...')) ||
                      item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
