'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Input from '@/shared/components/ui/Input';
import Button from '@/shared/components/ui/Button';
import { Loader2, Mail } from 'lucide-react';
import Link from 'next/link';
import { requestPasswordReset } from '../../actions';

export const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const status = searchParams.get('status');

  const isSuccess = status === 'success';
  const isError = status === 'error';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      await requestPasswordReset(formData);
    } catch (err) {
      console.error('Password reset error:', err);
      setError(
        'An error occurred while requesting password reset. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-md mx-auto p-6 md:p-8 bg-background border border-foreground/10 shadow-xl rounded-none">
        <h2 className="mb-8 text-center">Check Your Email</h2>
        <div className="text-center">
          <p className="mb-4">
            We&apos;ve sent a password reset link to your email address. Please check
            your inbox and follow the instructions to reset your password.
          </p>
          <p className="text-sm text-foreground/60">
            Didn&apos;t receive it? Check your spam folder or{' '}
            <Link
              href="/auth/forgot-password"
              className="text-light-blue hover:underline">
              try again
            </Link>
            .
          </p>
        </div>
        <div className="mt-8 pt-6 border-t border-foreground/10 text-center">
          <Link href="/auth/login" className="text-light-blue hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 md:p-8 bg-background border border-foreground/10 shadow-xl rounded-none">
      <h2 className="mb-8 text-center">Reset Your Password</h2>
      <p className="text-sm text-foreground/60 mb-6 text-center">
        Enter your email address and we&apos;ll send you a link to reset your
        password.
      </p>

      {(error || isError) && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
          <p className="font-medium">Error</p>
          <p>{error || 'Something went wrong. Please try again.'}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="your@email.com"
          required
          rightElement={<Mail size={18} className="text-foreground/50" />}
        />

        <Button
          type="submit"
          variant="primary"
          className="w-full py-3 mt-8 transition-all duration-300"
          disabled={loading}>
          {loading ? <Loader2 size={16} className="animate-spin mr-2" /> : null}
          {loading ? 'Sending Reset Link...' : 'Send Reset Link'}
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-foreground/10 text-center">
        <p className="text-sm text-foreground/60">
          Remember your password?{' '}
          <Link href="/auth/login" className="text-light-blue hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};
