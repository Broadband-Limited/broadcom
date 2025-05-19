"use client"

import React from 'react';
import Button from '@/shared/components/ui/Button';

export default function Error() {
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
