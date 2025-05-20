import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function CheckEmailPage() {
  const params = useSearchParams();
  const status = params.get('status');

  const isError = status === 'error';

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <section className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          {isError ? 'Signup Error' : 'Check Your Email'}
        </h1>
        {isError ? (
          <p className="text-red-600">
            Something went wrong. Please try signing up again.
          </p>
        ) : (
          <>
            <p className="mb-4">
              We’ve sent a confirmation link to your email address. Please open
              it to verify your account.
            </p>
            <p className="text-sm text-gray-500">
              Didn’t receive it? Check your spam folder or{' '}
              <Link href="/auth/signup" className="text-blue-600 hover:underline">
                try again
              </Link>
              .
            </p>
          </>
        )}
      </section>
    </main>
  );
}
