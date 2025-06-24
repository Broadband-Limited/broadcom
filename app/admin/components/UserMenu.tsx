'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, User, LogOut, Loader2 } from 'lucide-react';
import { signOut } from '@/app/auth/actions';

interface UserMenuProps {
  userEmail?: string;
  className?: string;
}

export const UserMenu: React.FC<UserMenuProps> = ({
  userEmail,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
        aria-expanded={isOpen}
        aria-haspopup="true">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <User size={16} className="text-white" />
        </div>
        <div className="text-left hidden sm:block">
          {userEmail && (
            <p className="text-xs text-gray-500 truncate max-w-32">
              {userEmail}
            </p>
          )}
        </div>
        <ChevronDown
          size={16}
          className={`text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            <div className="px-4 py-2 border-b border-gray-100">
              {userEmail && (
                <p className="text-xs text-gray-500">{userEmail}</p>
              )}
            </div>

            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200">
              {isLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <LogOut size={16} />
              )}
              <span>{isLoading ? 'Signing out...' : 'Sign out'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
