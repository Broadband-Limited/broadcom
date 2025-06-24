'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Input from '@/shared/components/ui/Input';
import Button from '@/shared/components/ui/Button';
import { Loader2, Lock } from 'lucide-react';
import Link from 'next/link';
import { resetPassword } from '../../actions';

export const ResetPasswordForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const status = searchParams.get('status');

  const isError = status === 'error';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPasswordError(null);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const password = formData.get('password') as string;
      const confirmPassword = formData.get('confirmPassword') as string;

      // Check if passwords match
      if (password !== confirmPassword) {
        setPasswordError('Passwords do not match');
        setLoading(false);
        return;
      }

      // Check password strength (optional)
      if (password.length < 8) {
        setPasswordError('Password must be at least 8 characters long');
        setLoading(false);
        return;
      }

      await resetPassword(formData);
    } catch (err) {
      console.error('Password reset error:', err);
      setError('An error occurred while resetting your password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 md:p-8 bg-background border border-foreground/10 shadow-xl rounded-none">
      <h2 className="mb-8 text-center">Set New Password</h2>
      <p className="text-sm text-foreground/60 mb-6 text-center">
        Enter your new password below.
      </p>

      {(error || isError) && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
          <p className="font-medium">Error</p>
          <p>{error || 'Something went wrong. Please try again.'}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="New Password"
          type="password"
          name="password"
          placeholder="••••••••"
          required
          rightElement={<Lock size={18} className="text-foreground/50" />}
        />

        <Input
          label="Confirm New Password"
          type="password"
          name="confirmPassword"
          placeholder="••••••••"
          required
          rightElement={<Lock size={18} className="text-foreground/50" />}
          error={passwordError || undefined}
        />

        <Button
          type="submit"
          variant="primary"
          className="w-full py-3 mt-8 transition-all duration-300"
          disabled={loading}
        >
          {loading ? <Loader2 size={16} className="animate-spin mr-2" /> : null}
          {loading ? 'Updating Password...' : 'Update Password'}
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-foreground/10 text-center">
        <Link href="/auth/login" className="text-light-blue hover:underline">
          Back to Login
        </Link>
      </div>
    </div>
  );
};