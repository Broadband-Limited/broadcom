'use client';

import { useRef, useEffect, useCallback } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import Button from './Button';
import { cn } from '@/lib/utils';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'default';
  isLoading?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  isLoading = false,
}: ConfirmationModalProps) {
  // Ref for first interactive element to focus
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  // Memoized escape key handler to prevent re-creation
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isLoading) {
        event.stopPropagation();
        onClose();
      }
    },
    [isLoading, onClose]
  );

  // Memoized backdrop click handler
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget && !isLoading) {
        onClose();
      }
    },
    [isLoading, onClose]
  );

  // Close modal on escape key and lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, handleEscape]);

  // Focus the cancel button when opened for accessibility
  useEffect(() => {
    if (isOpen && cancelButtonRef.current) {
      cancelButtonRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return {
          icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
          confirmVariant: 'danger' as const,
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
          confirmVariant: 'primary' as const,
        };
      default:
        return {
          icon: null,
          confirmVariant: 'primary' as const,
        };
    }
  };

  const { icon, confirmVariant } = getVariantStyles();

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description">
      <div className="bg-background rounded-sm shadow-xl max-w-md w-full mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-foreground/10">
          <div className="flex items-center gap-3">
            {icon}
            <h3
              id="modal-title"
              className={cn(variant === 'danger' ? '!text-red-500' : '')}>
              {title || 'Confirm Action'}
            </h3>
          </div>
          {!isLoading && (
            <button
              onClick={onClose}
              className="p-1 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Close modal">
              <X className="w-5 h-5 text-foreground/50" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <p
            id="modal-description"
            className="text-foreground/70 leading-relaxed whitespace-pre-wrap">
            {message || 'Are you sure you want to proceed with this action?'}
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 p-6 pt-0">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            ref={cancelButtonRef}>
            {cancelText}
          </Button>
          <Button
            type="button"
            variant={confirmVariant}
            onClick={onConfirm}
            disabled={isLoading}>
            {isLoading ? 'Processing...' : confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
