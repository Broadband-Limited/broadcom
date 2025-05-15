'use client';

import { useForm } from 'react-hook-form';
// replaced direct storage/db calls with API route
import { useState } from 'react';
import Input from '@/shared/components/ui/Input';
import Button from '@/shared/components/ui/Button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type FormData = {
  name: string;
  email: string;
  resume: FileList;
  cover_letter: string;
  job_id: string;
};

export default function ApplicationForm({ jobId }: { jobId: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: { job_id: jobId } });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // helper to convert File to base64 string without prefix
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const dataUrl = reader.result as string;
        resolve(dataUrl.split(',')[1]);
      };
      reader.onerror = () => reject(new Error('File read error'));
    });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      const file = data.resume?.[0];
      if (!file) throw new Error('Please select a resume file');
      const base64 = await fileToBase64(file);
      const payload = {
        job_id: jobId,
        name: data.name,
        email: data.email,
        cover_letter: data.cover_letter,
        resume: {
          fileName: file.name,
          fileType: file.type,
          fileBase64: base64,
        },
      };
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Submission failed');
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Name"
        type="text"
        placeholder="Your full name"
        {...register('name', { required: true })}
        error={errors.name ? 'Name is required' : undefined}
      />
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        {...register('email', { required: true })}
        error={errors.email ? 'Email is required' : undefined}
      />
      <Input
        label="Resume"
        type="file"
        accept=".pdf,.doc,.docx"
        {...register('resume', { required: true })}
        error={errors.resume ? 'Resume is required' : undefined}
      />
      <Input
        label="Cover Letter"
        type="textarea"
        rows={4}
        placeholder="Your cover letter"
        {...register('cover_letter')}
        error={errors.cover_letter ? 'Cover letter is required' : undefined}
      />
      <Button
        type="submit"
        variant="primary"
        disabled={loading}
        className={cn(
          'w-full gap-2',
          loading && 'cursor-not-allowed opacity-50'
        )}>
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span>Submitting...</span>
          </>
        ) : (
          'Submit Application'
        )}
      </Button>
      {error && <p className="!text-red-500 p-2 bg-red-100">{error}</p>}
    </form>
  );
}
