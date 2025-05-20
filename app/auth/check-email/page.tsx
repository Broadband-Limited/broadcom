"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

function EmailContent() {
  const params = useSearchParams();
  const status = params.get('status');

  const isError = status === 'error';

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-lg px-6 py-12 flex flex-col items-center">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          {isError ? 'Signup Error' : 'Check Your Email'}
        </h1>
        {isError ? (
          <p className="text-red-600">
            Something went wrong. Please try signing up again.
          </p>
        ) : (
          <div className='max-w-md flex flex-col items-center justify-center gap-4'>
            <p className="mb-4 text-center">
              We’ve sent a confirmation link to your email address. Please open
              it to verify your account.
            </p>
            <p className="text-sm text-gray-500 text-center">
              Didn’t receive it? Check your spam folder or{' '}
              <Link href="/auth/signup" className="text-blue-600 hover:underline">
                try again
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default function CheckEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <EmailContent />
    </Suspense>
  );
}
