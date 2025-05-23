'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MediaForm } from '../../components/MediaForm';
import { Media } from '@/lib/types/media_types';
import { Loader2 } from 'lucide-react';

interface EditMediaPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditMediaPage({ params }: EditMediaPageProps) {
  const router = useRouter();
  const [media, setMedia] = useState<Media | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMedia() {
      try {
        const id = (await params).id;
        setLoading(true);
        const response = await fetch(`/api/media/${id}`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to load media');
        }

        if (!result.data) {
          throw new Error('Media not found');
        }

        setMedia(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load media');
        console.error('Error loading media:', err);
      } finally {
        setLoading(false);
      }
    }

    loadMedia();
  }, [params]);

  const handleSubmit = async (mediaData: Partial<Media>) => {
    try {
      const id = (await params).id;
      setIsSubmitting(true);
      const response = await fetch(`/api/media/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mediaData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update media');
      }

      router.push('/admin/media');
    } catch (error) {
      console.error('Error updating media:', error);
      alert('Failed to update media item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2
          className="w-8 h-8 animate-spin text-primary"
          aria-label="Loading..."
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="p-4 bg-red-100 text-red-700 rounded-md" role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (!media) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div
          className="p-4 bg-amber-100 text-amber-700 rounded-md"
          role="alert">
          Media item not found
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Article</h1>
        <p className="text-gray-600">Make changes to your article</p>
      </div>

      <MediaForm
        media={media}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
