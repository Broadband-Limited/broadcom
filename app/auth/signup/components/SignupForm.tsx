'use client';

import { useState } from 'react';
import Input from '@/shared/components/ui/Input';
import Button from '@/shared/components/ui/Button';
import { Loader2, Lock, Mail, User } from 'lucide-react';
import Link from 'next/link';
import { signup } from '../../actions';

export const SignupForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordConfirmError, setPasswordConfirmError] = useState<
    string | null
  >(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPasswordConfirmError(null);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const password = formData.get('password') as string;
      const confirmPassword = formData.get('confirmPassword') as string;

      // Check if passwords match
      if (password !== confirmPassword) {
        setPasswordConfirmError('Passwords do not match');
        setLoading(false);
        return;
      }

      await signup(formData);
    } catch (err) {
      console.error('Signup error:', err);
      setError(
        'An error occurred while creating your account. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 md:p-8 bg-background border border-foreground/10 shadow-xl rounded-none">
      <h2 className="mb-8 text-center">Create an Account</h2>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
          <p className="font-medium">Registration Error</p>
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Full Name"
          type="text"
          name="name"
          placeholder="John Doe"
          required
          rightElement={<User size={18} className="text-foreground/50" />}
        />

        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="your@email.com"
          required
          rightElement={<Mail size={18} className="text-foreground/50" />}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="••••••••"
          required
          rightElement={<Lock size={18} className="text-foreground/50" />}
        />

        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="••••••••"
          required
          rightElement={<Lock size={18} className="text-foreground/50" />}
          error={passwordConfirmError || undefined}
        />

        <Button
          type="submit"
          variant="primary"
          className="w-full py-3 mt-8 transition-all duration-300"
          disabled={loading}>
          {loading ? <Loader2 size={16} className="animate-spin mr-2" /> : null}
          {loading ? 'Creating Account...' : 'Sign Up'}
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-foreground/10 text-center">
        {' '}
        <p className="text-sm text-foreground/60">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-light-blue hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};
