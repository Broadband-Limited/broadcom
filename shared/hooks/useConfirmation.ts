'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

interface ConfirmationOptions {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'default';
}

interface ConfirmationState {
  isOpen: boolean;
  options: ConfirmationOptions | null;
  resolve: ((value: boolean) => void) | null;
}

export function useConfirmation() {
  const [state, setState] = useState<ConfirmationState>({
    isOpen: false,
    options: null,
    resolve: null,
  });
  // Ref to hold the current resolver for cleanup
  const resolveRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = useCallback(
    (options: ConfirmationOptions): Promise<boolean> => {
      return new Promise((resolve) => {
        // Store resolver for potential cleanup on unmount
        resolveRef.current = resolve;
        setState({
          isOpen: true,
          options,
          resolve,
        });
      });
    },
    []
  );

  const handleConfirm = useCallback(() => {
    if (resolveRef.current) {
      resolveRef.current(true);
      resolveRef.current = null;
    }
    setState({
      isOpen: false,
      options: null,
      resolve: null,
    });
  }, []);

  const handleCancel = useCallback(() => {
    if (resolveRef.current) {
      resolveRef.current(false);
      resolveRef.current = null;
    }
    setState({
      isOpen: false,
      options: null,
      resolve: null,
    });
  }, []);

  // Cleanup pending confirmation on unmount to avoid memory leaks
  useEffect(() => {
    return () => {
      if (resolveRef.current) {
        resolveRef.current(false);
      }
    };
  }, []);

  return {
    confirm,
    confirmationProps: {
      isOpen: state.isOpen,
      onConfirm: handleConfirm,
      onClose: handleCancel,
      ...(state.options || {}),
    },
  };
}
