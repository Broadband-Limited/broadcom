'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Media } from '@/lib/types/media_types';
import { RichTextEditor } from './RichTextEditor';
import {
  uploadMediaImage,
  deleteMediaImage,
} from '@/lib/media-storage';
import { MediaAttachment } from '@/lib/types/media_types';
import Input from '@/shared/components/ui/Input';
import Button from '@/shared/components/ui/Button';
import ConfirmationModal from '@/shared/components/ui/ConfirmationModal';
import { useConfirmation } from '@/shared/hooks/useConfirmation';
import {
  ImageIcon,
  Loader2,
  Save,
  Trash,
  FileText,
  Download,
  Plus,
} from 'lucide-react';
import { slugify } from '@/lib/utils';
import Image from 'next/image';

interface MediaFormProps {
  media?: Media;
  onSubmit: (mediaData: Partial<Media>) => Promise<void>;
  isSubmitting: boolean;
}

export function MediaForm({ media, onSubmit, isSubmitting }: MediaFormProps) {
  const router = useRouter();
  const { confirm, confirmationProps } = useConfirmation();
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
  const [attachments, setAttachments] = useState<MediaAttachment[]>(
    media?.attachments?.map((att) => ({
      ...att,
      displayName: att.displayName || att.name.replace('.pdf', ''),
    })) || []
  );
  const [uploadingAttachment, setUploadingAttachment] = useState(false);
  const [pendingAttachments, setPendingAttachments] = useState<
    Array<{ file: File; url: string; name: string; size: number }>
  >([]);
  const [showAttachmentDialog, setShowAttachmentDialog] = useState(false);
  const [pendingDisplayNames, setPendingDisplayNames] = useState<string[]>([]);

  // Auto-save helper function
  const autoSaveAttachments = async (newAttachments: MediaAttachment[]) => {
    if (!media?.id) return; // Only auto-save for existing media items

    try {
      const response = await fetch(`/api/media/${media.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          attachments: newAttachments,
        }),
      });

      if (!response.ok) {
        console.error('Failed to auto-save attachments');
      }
    } catch (error) {
      console.error('Error auto-saving attachments:', error);
    }
  };

  // Auto-generate slug from title if not manually edited
  useEffect(() => {
    if (!slugManuallyEdited && title) {
      setSlug(slugify(title));
    }
  }, [title, slugManuallyEdited]);

  const handleSlugChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSlugManuallyEdited(true);
    setSlug(slugify(e.target.value));
  };

  const handleTitleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  const handleAttachmentUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;

    try {
      setUploadingAttachment(true);
      const files = Array.from(e.target.files);

      // Validate each file
      for (const file of files) {
        if (file.type !== 'application/pdf') {
          alert('Please select PDF files only.');
          return;
        }
        if (file.size > 10 * 1024 * 1024) {
          alert('Each file size must be less than 10MB.');
          return;
        }
      }

      // Upload files one by one using the API
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/media/upload-attachment', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Upload failed');
        }

        const result = await response.json();
        return {
          file,
          url: result.data.url,
          name: result.data.name,
          size: result.data.size,
        };
      });

      const uploadedFiles = await Promise.all(uploadPromises);

      // Set pending attachments and show dialog for display names
      setPendingAttachments(uploadedFiles);
      setPendingDisplayNames(
        uploadedFiles.map((file) => file.name.replace('.pdf', ''))
      );
      setShowAttachmentDialog(true);
    } catch (error) {
      console.error('Failed to upload attachments:', error);
      alert('Failed to upload attachments. Please try again.');
    } finally {
      setUploadingAttachment(false);
      // Reset the input
      e.target.value = '';
    }
  };

  const removeAttachment = async (index: number) => {
    const attachment = attachments[index];
    if (!attachment) return;

    // Show confirmation dialog
    const confirmed = await confirm({
      title: 'Delete Attachment',
      message: `Are you sure you want to delete "${attachment.displayName}"?\n\nThis action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      variant: 'danger',
    });

    if (!confirmed) return;

    try {
      // Delete from storage
      await fetch('/api/media/delete-attachment', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: attachment.url }),
      });

      // Remove from state
      const newAttachments = attachments.filter((_, i) => i !== index);
      setAttachments(newAttachments);

      // Auto-save the updated attachments for existing media
      await autoSaveAttachments(newAttachments);
    } catch (error) {
      console.error('Failed to delete attachment:', error);
      alert(
        'Failed to remove attachment. It will still be removed from the article.'
      );
      // Remove from state anyway
      const newAttachments = attachments.filter((_, i) => i !== index);
      setAttachments(newAttachments);

      // Auto-save even if deletion failed
      await autoSaveAttachments(newAttachments);
    }
  };

  const handleAttachmentDialogSave = async () => {
    // Validate that all display names are filled
    if (pendingDisplayNames.some((name) => !name.trim())) {
      alert('Please provide display names for all attachments.');
      return;
    }

    // Create final attachments with display names
    const finalAttachments = pendingAttachments.map((pending, index) => ({
      url: pending.url,
      name: pending.name,
      displayName: pendingDisplayNames[index],
      size: pending.size,
    }));

    const newAttachments = [...attachments, ...finalAttachments];
    setAttachments(newAttachments);

    // Auto-save the updated attachments for existing media
    await autoSaveAttachments(newAttachments);

    setPendingAttachments([]);
    setPendingDisplayNames([]);
    setShowAttachmentDialog(false);
  };

  const handleAttachmentDialogCancel = async () => {
    // Delete uploaded files from storage since user cancelled
    try {
      const deletePromises = pendingAttachments.map(async (pending) => {
        await fetch('/api/media/delete-attachment', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: pending.url }),
        });
      });
      await Promise.all(deletePromises);
    } catch (error) {
      console.error('Failed to cleanup cancelled uploads:', error);
    }

    setPendingAttachments([]);
    setPendingDisplayNames([]);
    setShowAttachmentDialog(false);
  };

  const updateAttachmentDisplayName = async (
    index: number,
    displayName: string
  ) => {
    const newAttachments = attachments.map((attachment, i) =>
      i === index ? { ...attachment, displayName } : attachment
    );
    setAttachments(newAttachments);

    // Auto-save the updated attachments for existing media
    await autoSaveAttachments(newAttachments);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !slug || !content) {
      alert('Please fill in all required fields: title, slug, and content.');
      return;
    }

    // Validate that all attachments have display names
    const invalidAttachments = attachments.filter(
      (attachment) => !attachment.displayName?.trim()
    );
    if (invalidAttachments.length > 0) {
      alert('Please provide display names for all attachments.');
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
        attachments,
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
            name="title"
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
            name="slug"
            label="Slug"
            type="text"
            value={slug}
            onChange={handleSlugChange}
            readonly
            placeholder="article-url-slug"
            className="opacity-50"
          />
        </div>

        <div>
          <Input
            id="summary"
            name="summary"
            label="Summary"
            type="textarea"
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PDF Attachments (Optional)
          </label>
          <div className="mt-1 space-y-2">
            {/* Existing attachments */}
            {attachments.length > 0 && (
              <div className="space-y-3 mb-4">
                {attachments.map((attachment, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-300 rounded-md bg-gray-50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3 flex-1">
                        <FileText className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="!text-sm text-gray-500 truncate">
                            {attachment.name} • PDF
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-3">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(attachment.url, '_blank')}
                          aria-label="Preview PDF">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="danger"
                          size="sm"
                          onClick={() => removeAttachment(index)}
                          aria-label="Remove PDF">
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Display name input */}
                    <Input
                      label="Display Name"
                      name={`attachment-display-${index}`}
                      type="text"
                      value={attachment.displayName || ''}
                      onChange={(e) =>
                        updateAttachmentDisplayName(index, e.target.value)
                      }
                      placeholder="How this file should be displayed to users"
                      required
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Upload area */}
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              <div className="flex flex-col items-center">
                <Plus className="h-8 w-8 text-gray-400" />
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  {uploadingAttachment ? (
                    <div className="flex items-center">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Uploading...
                    </div>
                  ) : (
                    'Add PDF files'
                  )}
                </span>
                <span className="mt-1 block text-xs text-gray-500">
                  Max 10MB each • Multiple files supported
                </span>
              </div>
              <input
                id="pdfAttachment"
                type="file"
                accept=".pdf,application/pdf"
                multiple
                onChange={handleAttachmentUpload}
                disabled={uploadingAttachment}
                className="hidden"
              />
              <label
                htmlFor="pdfAttachment"
                className="mt-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer disabled:opacity-50">
                Select Files
              </label>
            </div>
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

      {/* Attachment Display Name Dialog */}
      {showAttachmentDialog && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Set Display Names</h3>
              <p className="text-sm text-gray-600 mt-1">
                Choose how these files will appear to users.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              {pendingAttachments.map((pending, index) => (
                <div key={index} className="space-y-2">
                  <p className="text-sm text-gray-500">{pending.name} • PDF</p>
                  <Input
                    id={`displayName-${index}`}
                    name={`displayName-${index}`}
                    label="Display Name"
                    type="text"
                    value={pendingDisplayNames[index] || ''}
                    onChange={(e) => {
                      const newNames = [...pendingDisplayNames];
                      newNames[index] = e.target.value;
                      setPendingDisplayNames(newNames);
                    }}
                    placeholder="How this file should be displayed to users"
                    required
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleAttachmentDialogCancel}>
                Cancel
              </Button>
              <Button type="button" onClick={handleAttachmentDialogSave}>
                Save Attachments
              </Button>
            </div>
          </div>
        </div>
      )}

      <ConfirmationModal {...confirmationProps} />
    </form>
  );
}
