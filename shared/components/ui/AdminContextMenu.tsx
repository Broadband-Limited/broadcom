'use client';

import { useState, useRef, useEffect } from 'react';
import {
  MoreVertical,
  ExternalLink,
} from 'lucide-react';

export interface AdminContextMenuAction {
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  onClick: () => void;
  destructive?: boolean;
  disabled?: boolean;
  external?: boolean;
}

interface AdminContextMenuProps {
  actions: AdminContextMenuAction[];
  className?: string;
}

export default function AdminContextMenu({
  actions,
  className = '',
}: AdminContextMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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

  const handleActionClick = (action: AdminContextMenuAction) => {
    action.onClick();
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-1.5 rounded-md hover:bg-gray-100 transition-colors duration-200"
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
            className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
            role="menu"
            aria-orientation="vertical">
            {actions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleActionClick(action)}
                  disabled={action.disabled}
                  className={`
                    w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 transition-all duration-200
                    ${
                      action.destructive
                        ? 'text-red-600 hover:bg-red-50 hover:text-red-700'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }
                    ${action.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                    first:rounded-t-lg last:rounded-b-lg
                  `}
                  role="menuitem">
                  <Icon
                    size={16}
                    className={
                      action.destructive ? 'text-red-500' : 'text-gray-500'
                    }
                  />
                  <span className="flex items-center gap-1">
                    {action.label}
                    {action.external && <ExternalLink size={12} />}
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
