'use client';

import { useState, useEffect, FormEvent } from 'react';
import { Partner } from '@/lib/types/partner_types';
import { uploadPartnerImage, getPartnerImageUrl } from '@/lib/storage';
import Image from 'next/image';
import Input from '@/shared/components/ui/Input';
import Button from '@/shared/components/ui/Button';
import { InfoIcon } from 'lucide-react';

interface PartnerFormProps {
  partner?: Partner;
  onSubmit: (partner: Partner) => Promise<void>;
}

export default function PartnerForm({ partner, onSubmit }: PartnerFormProps) {
  const [formData, setFormData] = useState<Partner>({
    name: '',
    slug: '',
    image: '',
    description: '',
    link: '',
    rank: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (partner) {
      setFormData(partner);

      // Set preview image if partner has an image
      if (partner.image) {
        setPreviewImage(getPartnerImageUrl(partner.image));
      }
    }
  }, [partner]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Auto-generate slug from name if it's a new partner
    if (name === 'name' && (!partner || !partner.id)) {
      setFormData({
        ...formData,
        name: value,
        slug: value
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]+/g, ''),
      });
    } else if (name === 'rank') {
      setFormData({
        ...formData,
        rank: parseInt(value) || 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);

      // Create a preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Upload image if a new image is selected
      if (imageFile) {
        const imagePath = await uploadPartnerImage(imageFile);
        formData.image = imagePath;
      }

      await onSubmit(formData);

      // Reset form if it's a new partner
      if (!partner?.id) {
        setFormData({
          name: '',
          slug: '',
          image: '',
          description: '',
          link: '',
          rank: 0,
        });
        setImageFile(null);
        setPreviewImage(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-500/30 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          type="text"
          label="Partner Name"
          name="name"
          id="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Partner Name"
        />

        <Input
          type="text"
          label="External Link"
          name="link"
          id="link"
          required
          value={formData.link}
          onChange={handleChange}
          placeholder="e.g., https://partner-website.com"
        />
      </div>

      <div className="relative">
        <Input
          type="text"
          label="Slug"
          name="slug"
          id="slug"
          value={formData.slug || ''}
          onChange={handleChange}
          placeholder=""
          className="opacity-60"
          readonly
        />
        <div className="-mt-3 flex items-center gap-2">
          <InfoIcon size={12} />
          <p className="!text-xs">
            The slug is used in URLs. Auto-generated from name.
          </p>
        </div>
      </div>

      <Input
        type="textarea"
        label="Description"
        name="description"
        id="description"
        required
        value={formData.description}
        onChange={handleChange}
        rows={5}
        placeholder="Describe the partnership..."
      />

      <div>
        <Input
          type="number"
          label="Display Order"
          name="rank"
          id="rank"
          value={formData.rank?.toString() || '0'}
          onChange={handleChange}
          min={0}
          // step={1}
        />
        {/* <p className="text-xs text-foreground/50 mt-1">
          Partners with lower numbers appear first on the list.
        </p> */}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground/50 mb-2">
          Partner Logo
          <span className="text-red-500 ml-1">*</span>
        </label>

        <div className="flex items-center space-x-6">
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
              required={!partner?.image}
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer py-2 px-4 border border-foreground/10 text-sm font-medium text-dark-blue bg-white hover:bg-gray-50 transition-all duration-300">
              {imageFile ? 'Change Image' : 'Upload Image'}
            </label>
          </div>
          {previewImage && (
            <div className="relative h-24 w-32 overflow-hidden border border-foreground/10">
              <Image
                src={previewImage}
                alt="Partner preview"
                fill
                sizes="128px"
                style={{ objectFit: 'cover' }}
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="primary"
          size="default"
          className="w-full sm:w-auto">
          {isSubmitting
            ? 'Saving...'
            : partner?.id
            ? 'Update Partner'
            : 'Create Partner'}
        </Button>
      </div>
    </form>
  );
}
