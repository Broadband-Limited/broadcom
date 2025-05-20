'use client';

import { useState, useEffect, FormEvent } from 'react';
import { Service, Division } from '@/lib/types/divisions_types';
import { uploadServiceImage, getServiceImageUrl } from '@/lib/storage';
import Image from 'next/image';
import Input from '@/shared/components/ui/Input';
import Button from '@/shared/components/ui/Button';
import { InfoIcon, Trash2 } from 'lucide-react';

interface ServiceFormProps {
  service?: Service;
  divisions: Division[];
  onSubmit: (service: Service) => Promise<void>;
}

export default function ServiceForm({
  service,
  divisions,
  onSubmit,
}: ServiceFormProps) {
  const [formData, setFormData] = useState<Service>({
    division_id: divisions.length > 0 ? divisions[0].id || '' : '',
    title: '',
    slug: '',
    description: '',
    details: [''],
    image: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (service) {
      setFormData(service);

      // Set preview image if service has an image
      if (service.image) {
        setPreviewImage(getServiceImageUrl(service.image));
      }
    }
  }, [service]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Auto-generate slug from title if it's a new service
    if (name === 'title' && (!service || !service.id)) {
      setFormData({
        ...formData,
        title: value,
        slug: value
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]+/g, ''),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleDetailsChange = (index: number, value: string) => {
    const updatedDetails = [...formData.details];
    updatedDetails[index] = value;
    setFormData({
      ...formData,
      details: updatedDetails,
    });
  };

  const handleAddDetail = () => {
    setFormData({
      ...formData,
      details: [...formData.details, ''],
    });
  };

  const handleRemoveDetail = (index: number) => {
    const updatedDetails = [...formData.details];
    updatedDetails.splice(index, 1);
    setFormData({
      ...formData,
      details: updatedDetails,
    });
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
        const imagePath = await uploadServiceImage(imageFile);
        formData.image = imagePath;
      }

      await onSubmit(formData);

      // Reset form if it's a new service
      if (!service?.id) {
        setFormData({
          division_id: divisions.length > 0 ? divisions[0].id || '' : '',
          title: '',
          slug: '',
          description: '',
          details: [''],
          image: '',
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
      {' '}
      {error && (
        <div className="bg-red-50 border border-red-500/30 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}{' '}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mb-4">
          <label
            htmlFor="division_id"
            className="block text-sm font-medium text-foreground/50 mb-1">
            Division
            <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            id="division_id"
            name="division_id"
            required
            value={formData.division_id}
            onChange={handleChange}
            className="w-full p-3 border border-foreground/10 focus:outline-none focus:border-foreground/50 transition-all duration-300">
            {divisions.map((division) => (
              <option key={division.id} value={division.id}>
                {division.name}
              </option>
            ))}
          </select>
        </div>

        <Input
          type="text"
          label="Service Title"
          name="title"
          id="title"
          required
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Network Installation"
        />
      </div>
      <div className="relative">
        <Input
          type="text"
          label="Slug"
          name="slug"
          id="slug"
          value={formData.slug}
          onChange={handleChange}
          placeholder=""
          className='opacity-60'
          readonly
        />{' '}
        <div className="flex items-center gap-2">
          <InfoIcon size={12} />
          <p className="!text-xs">
            The slug is used in URLs. Auto-generated from title.
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
        rows={3}
        placeholder="Brief description of the service..."
      />{' '}
      <div>
        <label className="block text-sm font-medium text-foreground/50 mb-2">
          Service Details
          <span className="text-red-500 ml-1">*</span>
        </label>
        {formData.details.map((detail, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <div className="flex-1">
              <input
                type="text"
                value={detail}
                onChange={(e) => handleDetailsChange(index, e.target.value)}
                className="w-full p-3 border border-foreground/10 focus:outline-none focus:border-foreground/50 transition-all duration-300"
                placeholder={`Detail ${index + 1}`}
                required
              />
            </div>
            <Button
              type="button"
              onClick={() => handleRemoveDetail(index)}
              disabled={formData.details.length <= 1}
              variant="outline"
              size="sm"
              className='!p-2 border-red-400 hover:!bg-red-50'>
              <Trash2 size={16} className='stroke-red-400' />
            </Button>
          </div>
        ))}

        <Button
          type="button"
          onClick={handleAddDetail}
          variant="outline"
          size="sm"
          className="mt-2 text-dark-blue">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add Detail
        </Button>
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground/50 mb-2">
          Service Image
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
              required={!service?.image}
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
                alt="Service preview"
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
          disabled={isSubmitting || !formData.division_id}
          variant="primary"
          size="default"
          className="w-full sm:w-auto">
          {isSubmitting
            ? 'Saving...'
            : service?.id
            ? 'Update Service'
            : 'Create Service'}
        </Button>
      </div>
    </form>
  );
}
