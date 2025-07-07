'use client';

import { useState, useEffect, FormEvent } from 'react';
import { Service, Division, Category } from '@/lib/types/divisions_types';
import {
  uploadMultipleServiceImages,
  getServiceImageUrls,
} from '@/lib/storage';
import Image from 'next/image';
import Input from '@/shared/components/ui/Input';
import Button from '@/shared/components/ui/Button';
import { InfoIcon, Trash2, X } from 'lucide-react';

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
    category_id: undefined,
    title: '',
    slug: '',
    description: '',
    details: [''],
    images: [],
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  useEffect(() => {
    if (service) {
      setFormData(service);

      // Set preview images if service has images
      if (service.images && service.images.length > 0) {
        setPreviewImages(getServiceImageUrls(service.images));
      }
    }
  }, [service]);

  // Load categories when division changes
  useEffect(() => {
    if (formData.division_id) {
      loadCategories(formData.division_id);
    }
  }, [formData.division_id]);

  const loadCategories = async (divisionId: string) => {
    setLoadingCategories(true);
    try {
      const response = await fetch(`/api/categories?divisionId=${divisionId}`);
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error('Failed to load categories');
        setCategories([]);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      setCategories([]);
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === 'division_id') {
      // Reset category when division changes
      setFormData({
        ...formData,
        division_id: value,
        category_id: undefined,
      });
    } else if (name === 'title' && (!service || !service.id)) {
      // Auto-generate slug from title if it's a new service
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
        [name]: value === '' ? undefined : value,
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

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setImageFiles([...imageFiles, ...files]);

      // Create preview URLs for new files
      const newPreviewUrls: string[] = [];
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          newPreviewUrls.push(event.target?.result as string);
          if (newPreviewUrls.length === files.length) {
            setPreviewImages([...previewImages, ...newPreviewUrls]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    const newPreviewImages = [...previewImages];
    newPreviewImages.splice(index, 1);
    setPreviewImages(newPreviewImages);

    // Also remove from imageFiles if it's a new file
    if (index >= (service?.images?.length || 0)) {
      const fileIndex = index - (service?.images?.length || 0);
      const newImageFiles = [...imageFiles];
      newImageFiles.splice(fileIndex, 1);
      setImageFiles(newImageFiles);
    } else {
      // Remove from existing service images
      const newImages = [...formData.images];
      newImages.splice(index, 1);
      setFormData({
        ...formData,
        images: newImages,
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Upload new images if any
      let finalImages = [...formData.images];

      // Upload new images if any
      if (imageFiles.length > 0) {
        const newImagePaths = await uploadMultipleServiceImages(imageFiles);
        finalImages = [...finalImages, ...newImagePaths];
      }

      const serviceData = {
        ...formData,
        images: finalImages,
      };

      await onSubmit(serviceData);

      // Reset form if it's a new service
      if (!service?.id) {
        setFormData({
          division_id: divisions.length > 0 ? divisions[0].id || '' : '',
          category_id: undefined,
          title: '',
          slug: '',
          description: '',
          details: [''],
          images: [],
        });
        setImageFiles([]);
        setPreviewImages([]);
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
            className="w-full p-3 border border-foreground/10 rounded-xs focus:outline-none focus:border-foreground/50 transition-all duration-300">
            <option value="">Select a division</option>
            {divisions.map((division) => (
              <option key={division.id} value={division.id}>
                {division.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="category_id"
            className="block text-sm font-medium text-foreground/50 mb-1">
            Category
            <span className="text-foreground/30 text-xs ml-1">(Optional)</span>
          </label>
          <select
            id="category_id"
            name="category_id"
            value={formData.category_id || ''}
            onChange={handleChange}
            disabled={loadingCategories || !formData.division_id}
            className="w-full p-3 border border-foreground/10 rounded-xs focus:outline-none focus:border-foreground/50 transition-all duration-300 disabled:opacity-50">
            <option value="">No category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {loadingCategories && (
            <p className="text-xs text-foreground/50 mt-1">
              Loading categories...
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        <div className="relative">
          <Input
            type="text"
            label="Slug"
            name="slug"
            id="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder=""
            className="opacity-60"
            readonly
          />
          <div className="-mt-3 flex items-center gap-2">
            <InfoIcon size={12} />
            <p className="!text-xs">
              The slug is used in URLs. Auto-generated from title.
            </p>
          </div>
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
      />

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
              className="!p-2 border-red-400 hover:!bg-red-50">
              <Trash2 size={16} className="stroke-red-400" />
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
          Service Images
          <span className="text-red-500 ml-1">*</span>
        </label>

        <div className="space-y-4">
          <div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagesChange}
              className="hidden"
              id="images-upload"
            />
            <label
              htmlFor="images-upload"
              className="cursor-pointer py-2 px-4 border border-foreground/10 text-sm font-medium text-dark-blue bg-white hover:bg-gray-50 transition-all duration-300">
              Add Images
            </label>
          </div>

          {previewImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {previewImages.map((image, index) => (
                <div key={index} className="relative group">
                  <div className="relative h-24 w-full overflow-hidden border border-foreground/10 rounded">
                    <Image
                      src={image}
                      alt={`Service preview ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      style={{ objectFit: 'cover' }}
                      className="object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {previewImages.length === 0 && !service?.images?.length && (
            <p className="text-sm text-foreground/50">
              No images uploaded yet. Please add at least one image.
            </p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <Button
          type="submit"
          disabled={
            isSubmitting ||
            !formData.division_id ||
            (previewImages.length === 0 && !service?.images?.length)
          }
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
