'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Media } from '@/lib/types/media_types';
import { RichTextEditor } from './RichTextEditor';
import { uploadMediaImage, deleteMediaImage } from '@/lib/media-storage';
import Input from '@/shared/components/ui/Input';
import Button from '@/shared/components/ui/Button';
import { ImageIcon, Loader2, Save, Trash } from 'lucide-react';
import { slugify } from '@/lib/utils';
import Image from 'next/image';

interface MediaFormProps {
  media?: Media;
  onSubmit: (mediaData: Partial<Media>) => Promise<void>;
  isSubmitting: boolean;
}

export function MediaForm({ media, onSubmit, isSubmitting }: MediaFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(media?.title || '');
  const [slug, setSlug] = useState(media?.slug || '');
  const [summary, setSummary] = useState(media?.summary || '');
  const [content, setContent] = useState(media?.content || '');
  const [published, setPublished] = useState(media?.published || false);
  const [featuredImage, setFeaturedImage] = useState<string | undefined>(
    media?.featured_image
  );
  const [uploadingImage, setUploadingImage] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  // Auto-generate slug from title if not manually edited
  useEffect(() => {
    if (!slugManuallyEdited && title) {
      setSlug(slugify(title));
    }
  }, [title, slugManuallyEdited]);

  const handleSlugChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSlugManuallyEdited(true);
    setSlug(slugify(e.target.value));
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const handleFeaturedImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;

    try {
      setUploadingImage(true);
      const file = e.target.files[0];
      const imageUrl = await uploadMediaImage(file);
      setFeaturedImage(imageUrl);
    } catch (error) {
      console.error('Failed to upload image:', error);
      alert('Failed to upload featured image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const removeFeaturedImage = async () => {
    if (!featuredImage) return;

    try {
      await deleteMediaImage(featuredImage);
      setFeaturedImage(undefined);
    } catch (error) {
      console.error('Failed to delete image:', error);
      alert(
        'Failed to remove image. It will still be removed from the article.'
      );
      setFeaturedImage(undefined);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !slug || !content) {
      alert('Please fill in all required fields: title, slug, and content.');
      return;
    }

    try {
      await onSubmit({
        title,
        slug,
        summary,
        content,
        published,
        featured_image: featuredImage,
        published_at: published ? new Date().toISOString() : undefined,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Input
            id="title"
            name='title'
            type="text"
            label="Title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Article title"
            required
          />
        </div>

        <div>
          <Input
            id="slug"
            name='slug'
            label="Slug"
            type="text"
            value={slug}
            onChange={handleSlugChange}
            readonly
            placeholder="article-url-slug"
            className='opacity-50'
          />
        </div>

        <div>
          <Input
            id="summary"
            name='summary'
            label="Summary"
            type='textarea'
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Brief summary of the article"
            rows={3}
          />
        </div>

        <div>
          <div className="mt-1 space-y-2">
            {featuredImage ? (
              <div className="relative">
                <div className="relative w-full h-48 overflow-hidden rounded-md">
                  <Image
                    src={featuredImage}
                    alt="Featured image"
                    fill
                    className="object-cover"
                  />
                </div>
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={removeFeaturedImage}>
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-md p-12 text-center">
                <div className="flex flex-col items-center">
                  <ImageIcon className="h-12 w-12 text-gray-400" />
                  <span className="mt-2 block text-sm font-medium text-gray-900">
                    {uploadingImage ? (
                      <div className="flex items-center">
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Uploading...
                      </div>
                    ) : (
                      'Add featured image'
                    )}
                  </span>
                </div>
                <input
                  id="featuredImage"
                  type="file"
                  accept="image/*"
                  onChange={handleFeaturedImageUpload}
                  disabled={uploadingImage}
                  className="hidden"
                />
                <label
                  htmlFor="featuredImage"
                  className="mt-2 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer disabled:opacity-50">
                  Select Image
                </label>
              </div>
            )}
          </div>
        </div>

        <RichTextEditor
          content={content}
          onChange={setContent}
          className="mt-1"
        />

        <div>
          <Input
            id="published"
            name="published"
            type="checkbox"
            label="Published"
            checked={published}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setPublished(target.checked);
            }}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/media')}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
