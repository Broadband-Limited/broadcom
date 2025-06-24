'use client';

import { useState } from 'react';
import { LogOut, Loader2 } from 'lucide-react';
import { signOut } from '@/app/auth/actions';

interface LogoutButtonProps {
  variant?: 'default' | 'icon' | 'text';
  className?: string;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  variant = 'default',
  className = '',
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
      // Optionally show a toast or error message
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleLogout}
        disabled={isLoading}
        className={`p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 ${className}`}
        title="Sign out"
        aria-label="Sign out">
        {isLoading ? (
          <Loader2 size={20} className="animate-spin text-gray-600" />
        ) : (
          <LogOut size={20} className="text-gray-600" />
        )}
      </button>
    );
  }

  if (variant === 'text') {
    return (
      <button
        onClick={handleLogout}
        disabled={isLoading}
        className={`flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors duration-200 ${className}`}>
        {isLoading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <LogOut size={16} />
        )}
        <span>{isLoading ? 'Signing out...' : 'Sign out'}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className={`flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${className}`}>
      {isLoading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <LogOut size={16} />
      )}
      <span>{isLoading ? 'Signing out...' : 'Sign out'}</span>
    </button>
  );
};
