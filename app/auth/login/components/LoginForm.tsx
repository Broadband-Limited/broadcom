'use client';

import { useState } from 'react';
import Input from '@/shared/components/ui/Input';
import Button from '@/shared/components/ui/Button';
import { Loader2, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { signIn } from '../../actions';

export const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      await signIn(formData);
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred while logging in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 md:p-8 bg-background border border-foreground/10 shadow-xl rounded-none">
      <h2 className="mb-8 text-center">Log In</h2>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
          <p className="font-medium">Authentication Error</p>
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email Address"
          type="email"
          name="email"
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          rightElement={<Mail size={18} className="text-foreground/50" />}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          rightElement={<Lock size={18} className="text-foreground/50" />}
        />

        <div className="flex items-center justify-between mt-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 accent-dark-blue focus:ring-dark-blue border-foreground/20"
            />
            <span className="ml-2 text-sm text-foreground/70">Remember me</span>
          </label>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full py-3 mt-8 transition-all duration-300"
          disabled={loading}>
          {loading ? <Loader2 size={16} className="animate-spin mr-2" /> : ''}
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-foreground/10 text-center">
        <p className="text-sm text-foreground/60">
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="text-light-blue hover:underline">
            Sign up
          </Link>
        </p>
        <p className="text-sm text-foreground/60 mt-2">
          Need access?{' '}
          <Link href="/contact" className="text-light-blue hover:underline">
            Contact admin
          </Link>
        </p>
      </div>
    </div>
  );
};
