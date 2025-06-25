'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Button from '@/shared/components/ui/Button';

export default function Error(): React.JSX.Element {
  const searchParams = useSearchParams();
  const errorCode: string | null = searchParams.get('code');
  const errorMessage: string | null = searchParams.get('message');
  const status: string | null = searchParams.get('status');

  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-16">
      <div className="w-full max-w-4xl mx-auto text-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-4 text-dark-blue">
          500
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Something went wrong
        </h2>
        <p className="text-lg mb-8 max-w-lg mx-auto">
          We apologize for the inconvenience. Our team has been notified and is
          working to resolve the issue.
        </p>

        {/* Show debug info in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Debug Information
            </h3>
            {status && <p className="text-sm text-red-700">Status: {status}</p>}
            {errorCode && (
              <p className="text-sm text-red-700">Error Code: {errorCode}</p>
            )}
            {errorMessage && (
              <p className="text-sm text-red-700">
                Error Message: {errorMessage}
              </p>
            )}
            <p className="text-sm text-red-700">
              Current URL: {window.location.href}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button href="/" variant="primary" size="lg">
            Back to Home
          </Button>

          <Button href="/contact" variant="outline" size="lg">
            Contact Support
          </Button>
        </div>
      </div>
    </section>
  );
}
