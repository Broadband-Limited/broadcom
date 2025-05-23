'use client';

import { useState, useEffect } from 'react';
import { Job } from '@/lib/types/career_types';
import { Division } from '@/lib/types/divisions_types';
import Input from '@/shared/components/ui/Input';
import Button from '@/shared/components/ui/Button';
import { Save, X } from 'lucide-react';

interface JobFormProps {
  job?: Job;
  divisions: Division[];
  onSubmit: (job: Job) => Promise<void>;
  onCancel: () => void;
}

const defaultJob: Job = {
  id: '',
  title: '',
  description: '',
  location: '',
  department: '',
  posted_at: new Date().toISOString(),
  employment_type: 'full-time',
  is_remote: false,
  requirements: [''],
  benefits: [''],
  experience_level: 'mid',
  salary_min: undefined,
  salary_max: undefined,
  application_deadline: undefined,
};

export default function JobForm({
  job,
  divisions,
  onSubmit,
  onCancel,
}: JobFormProps) {
  const [formData, setFormData] = useState<Job>(job || defaultJob);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (job) {
      setFormData(job);
    }
  }, [job]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';

    if (name === 'salary_min' || name === 'salary_max') {
      setFormData({
        ...formData,
        [name]: value ? parseFloat(value) : undefined,
      });
    } else {
      setFormData({
        ...formData,
        [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
      });
    }
  };

  const handleArrayChange = (
    index: number,
    value: string,
    field: 'requirements' | 'benefits'
  ) => {
    const newArray = [...(formData[field] || [])];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field: 'requirements' | 'benefits') => {
    const currentArray = formData[field] || [];
    setFormData({
      ...formData,
      [field]: [...currentArray, ''],
    });
  };

  const removeArrayItem = (
    index: number,
    field: 'requirements' | 'benefits'
  ) => {
    const currentArray = formData[field] || [];
    const newArray = currentArray.filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Ensure arrays are never undefined
      const submitData: Job = {
        ...formData,
        requirements: formData.requirements || [],
        benefits: formData.benefits || [],
      };
      await onSubmit(submitData);
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
          label="Job Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="e.g. Senior Software Engineer"
        />

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Department
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            className="w-full px-3 py-3 border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
            <option value="">Select a Department</option>
            {divisions.map((division) => (
              <option key={division.id} value={division.name}>
                {division.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          type="text"
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          placeholder="e.g. Nairobi, Kenya"
        />

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Employment Type
          </label>
          <select
            name="employment_type"
            value={formData.employment_type}
            onChange={handleChange}
            required
            className="w-full px-3 py-3 border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          type="number"
          label="Minimum Salary (Optional)"
          name="salary_min"
          value={formData.salary_min || ''}
          onChange={handleChange}
          min={0}
        />
        <Input
          type="number"
          label="Maximum Salary (Optional)"
          name="salary_max"
          value={formData.salary_max || ''}
          onChange={handleChange}
          min={0}
        />

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Experience Level
          </label>
          <select
            name="experience_level"
            value={formData.experience_level || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
            <option value="entry">Entry Level</option>
            <option value="mid">Mid Level</option>
            <option value="senior">Senior Level</option>
            <option value="executive">Executive Level</option>
          </select>
        </div>

        <Input
          type="checkbox"
          label="Remote Position"
          name="is_remote"
          checked={formData.is_remote}
          onChange={handleChange}
        />
      </div>

      <Input
        type="textarea"
        label="Job Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        rows={6}
      />

      <div className="space-y-4">
        <label className="block text-sm font-medium text-foreground/50">
          Requirements
        </label>
        {(formData.requirements || []).map((req, index) => (
          <div key={index} className="flex gap-2">
            <Input
              type="text"
              label=""
              name={`requirement-${index}`}
              value={req}
              onChange={(e) =>
                handleArrayChange(index, e.target.value, 'requirements')
              }
              placeholder="e.g. 5+ years of experience in React"
              className="flex-1"
            />
            {(formData.requirements?.length || 0) > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem(index, 'requirements')}
                className="text-red-500 hover:text-red-700">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => addArrayItem('requirements')}>
          Add Requirement
        </Button>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-foreground/50">
          Benefits
        </label>
        {(formData.benefits || []).map((benefit, index) => (
          <div key={index} className="flex gap-2">
            <Input
              type="text"
              label=""
              name={`benefit-${index}`}
              value={benefit}
              onChange={(e) =>
                handleArrayChange(index, e.target.value, 'benefits')
              }
              placeholder="e.g. Health insurance"
              className="flex-1"
            />
            {(formData.benefits?.length || 0) > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem(index, 'benefits')}
                className="text-red-500 hover:text-red-700">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => addArrayItem('benefits')}>
          Add Benefit
        </Button>
      </div>

      <div className="flex justify-end space-x-4 mt-8">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="flex items-center gap-2">
          <Save className="w-5 h-5" />
          {isSubmitting ? 'Saving...' : job ? 'Update Job' : 'Create Job'}
        </Button>
      </div>
    </form>
  );
}
