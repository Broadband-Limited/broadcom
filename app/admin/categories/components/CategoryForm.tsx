'use client';

import { useState, useEffect, FormEvent } from 'react';
import { Category } from '@/lib/types/divisions_types';
import Input from '@/shared/components/ui/Input';
import Button from '@/shared/components/ui/Button';
import { Info } from 'lucide-react';

interface CategoryFormProps {
  category?: Category;
  divisionId: string;
  onSubmit: (category: Category) => Promise<void>;
}

export default function CategoryForm({
  category,
  divisionId,
  onSubmit,
}: CategoryFormProps) {
  const [formData, setFormData] = useState<Category>({
    name: '',
    slug: '',
    description: '',
    division_id: divisionId,
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (category) {
      setFormData(category);
    } else {
      setFormData({
        name: '',
        slug: '',
        description: '',
        division_id: divisionId,
      });
    }
  }, [category, divisionId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Auto-generate slug from name if it's a new category
    if (name === 'name' && (!category || !category.id)) {
      setFormData({
        ...formData,
        name: value,
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit(formData);

      // Reset form if it's a new category
      if (!category?.id) {
        setFormData({
          name: '',
          slug: '',
          description: '',
          division_id: divisionId,
        });
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

      <Input
        type="text"
        label="Category Name"
        name="name"
        id="name"
        required
        value={formData.name}
        onChange={handleChange}
        placeholder="e.g., Wireless Solutions"
      />

      <div className="relative">
        <Input
          type="text"
          label="Slug"
          name="slug"
          id="slug"
          required
          readonly
          value={formData.slug}
          onChange={handleChange}
        />
        <div className="mb-1 -mt-3 flex items-center gap-1">
          <Info size={12} className="" />
          <p className="!text-xs !text-foreground/60">
            Used in URLs. Auto-generated from name.
          </p>
        </div>
      </div>

      <Input
        type="textarea"
        label="Description"
        name="description"
        id="description"
        value={formData.description || ''}
        onChange={handleChange}
        rows={3}
        placeholder="Describe the category..."
      />

      <div className="mt-6">
        <Button
          type="submit"
          variant="primary"
          size="default"
          disabled={isSubmitting}
          className="w-full sm:w-auto">
          {isSubmitting
            ? 'Saving...'
            : category?.id
            ? 'Update Category'
            : 'Create Category'}
        </Button>
      </div>
    </form>
  );
}
