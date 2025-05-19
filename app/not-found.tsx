'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import Button from '@/shared/components/ui/Button';

type ErrorCodeType = '404' | '500' | 'generic';

interface ErrorPageProps {
  errorCode?: ErrorCodeType;
  title?: string;
  message?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  errorCode = '404',
  title = 'Page Not Found',
  message = 'Sorry, the page you are looking for does not exist or has been moved.',
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-16">
      <div className="w-full max-w-4xl mx-auto text-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-4 text-dark-blue">
          {errorCode}
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">{title}</h2>
        <p className="text-lg mb-8 max-w-lg mx-auto">{message}</p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button href="/" variant="primary" size="lg">
            Back to Home
          </Button>

          <Button href="/contact" variant="outline" size="lg">
            Contact Support
          </Button>
        </div>

        {isClient && (
          <div className="mt-12">
            <p className="text-sm opacity-70">URL: {window.location.href}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default function NotFound() {
  return (
    <ErrorPage
      errorCode="404"
      title="Page Not Found"
      message="Sorry, the page you are looking for does not exist or has been moved."
    />
  );
}
