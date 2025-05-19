'use client';

import { useState, useEffect, FormEvent } from 'react';
import { Division } from '@/lib/types/divisions_types';
import Input from '@/shared/components/ui/Input';
import Button from '@/shared/components/ui/Button';

interface DivisionFormProps {
  division?: Division;
  onSubmit: (division: Division) => Promise<void>;
}

export default function DivisionForm({
  division,
  onSubmit,
}: DivisionFormProps) {
  const [formData, setFormData] = useState<Division>({
    name: '',
    slug: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (division) {
      setFormData(division);
    }
  }, [division]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Auto-generate slug from name if it's a new division
    if (name === 'name' && (!division || !division.id)) {
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

      // Reset form if it's a new division
      if (!division?.id) {
        setFormData({
          name: '',
          slug: '',
          description: '',
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
      {' '}
      {error && (
        <div className="bg-red-50 border border-red-500/30 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}
      <Input
        type="text"
        label="Division Name"
        name="name"
        id="name"
        required
        value={formData.name}
        onChange={handleChange}
        placeholder="e.g., Network Solutions"
      />
      <div className="relative">
        <Input
          type="text"
          label="Slug"
          name="slug"
          id="slug"
          required
          value={formData.slug}
          onChange={handleChange}
          placeholder="e.g., network-solutions"
        />{' '}
        <p className="mt-1 text-xs text-foreground/50">
          Used in URLs. Auto-generated from name, but you can edit it.
        </p>
      </div>
      <Input
        type="textarea"
        label="Description"
        name="description"
        id="description"
        required
        value={formData.description}
        onChange={handleChange}
        rows={4}
        placeholder="Describe the division..."
      />{' '}
      <div className="mt-6">
        <Button
          type="submit"
          variant="primary"
          size="default"
          disabled={isSubmitting}
          className="w-full sm:w-auto">
          {isSubmitting
            ? 'Saving...'
            : division?.id
            ? 'Update Division'
            : 'Create Division'}
        </Button>
      </div>
    </form>
  );
}
