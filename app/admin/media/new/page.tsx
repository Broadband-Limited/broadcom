'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MediaForm } from '../components/MediaForm';
import { Media } from '@/lib/types/media_types';

export default function NewMediaPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (mediaData: Partial<Media>) => {
    try {
      setIsSubmitting(true);

      // Call the API route instead of createMedia directly
      const response = await fetch('/api/media', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mediaData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create media');
      }

      router.push('/admin/media');
      router.refresh();
    } catch (error) {
      console.error('Error creating media:', error);
      alert('Failed to create media item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="container px-4 py-8 mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create New Article</h1>
        <p className="">Create a new blog post or article</p>
      </div>

      <MediaForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </section>
  );
}
