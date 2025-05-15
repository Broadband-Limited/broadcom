'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Input from '@/shared/components/ui/Input';
import Button from '@/shared/components/ui/Button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Job } from '@/shared/types/career';

type FormData = {
  name: string;
  email: string;
  phone: string;
  resume: FileList;
  cover_letter: string;
  linkedin_url: string;
  portfolio_url: string;
  referral_source: string;
  job_id: string;
  skills: string;
  notes: string;
};

interface ApplicationFormProps {
  jobId: string;
  job: Job;
}

export default function ApplicationForm({ jobId, job }: ApplicationFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: { job_id: jobId } });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

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
      setError(null);

      const file = data.resume?.[0];
      if (!file) throw new Error('Please select a resume file');

      const base64 = await fileToBase64(file);
      const skillsArray = data.skills
        ? data.skills.split(',').map((skill) => skill.trim())
        : [];

      const payload = {
        job_id: jobId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        cover_letter: data.cover_letter,
        linkedin_url: data.linkedin_url,
        portfolio_url: data.portfolio_url,
        referral_source: data.referral_source,
        skills: skillsArray,
        notes: data.notes,
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
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 p-6 text-center">
        <h3 className="text-xl font-semibold text-green-700">
          Application Submitted!
        </h3>
        <p className="text-green-600 mt-2">
          Thank you for applying for the {job.title} position. We will review
          your application and get back to you soon.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => setSuccess(false)}>
          Submit Another Application
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-background p-6 shadow-md border border-foreground/10">
      <h2 className="text-xl font-semibold mb-6">Apply for {job.title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          type="text"
          required
          placeholder="Your full name"
          {...register('name', { required: 'Name is required' })}
          error={errors.name?.message}
        />
        <Input
          label="Email"
          type="email"
          required
          placeholder="you@example.com"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          error={errors.email?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Phone Number"
          required
          type="tel"
          placeholder="+254 123 456 7890"
          {...register('phone', {
            pattern: {
              value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
              message: 'Please enter a valid phone number',
            },
          })}
          error={errors.phone?.message}
        />
        <Input
          label="LinkedIn Profile"
          type="text"
          placeholder="https://linkedin.com/in/yourprofile"
          {...register('linkedin_url')}
          error={errors.linkedin_url?.message}
        />
      </div>

      <Input
        label="Portfolio or Personal Website"
        type="text"
        placeholder="https://yourportfolio.com"
        {...register('portfolio_url')}
        error={errors.portfolio_url?.message}
      />

      <Input
        label="Resume"
        required
        type="file"
        accept=".pdf,.doc,.docx"
        {...register('resume', { required: 'Resume is required' })}
        error={errors.resume?.message}
      />

      <Input
        label="Cover Letter"
        required
        type="textarea"
        rows={4}
        placeholder="Tell us why you're interested in this position and what makes you a great fit."
        {...register('cover_letter')}
        error={errors.cover_letter?.message}
      />

      <Input
        label="Skills (comma separated)"
        required
        type="text"
        placeholder="Skill-1, Skill-2, Skill-3"
        {...register('skills')}
        error={errors.skills?.message}
      />

      <Input
        label="How did you hear about us?"
        type="text"
        placeholder="LinkedIn, Job Board, Referral, etc."
        {...register('referral_source')}
        error={errors.referral_source?.message}
      />

      <Input
        label="Additional Notes"
        type="textarea"
        rows={3}
        placeholder="Any additional information you'd like to share with us"
        {...register('notes')}
        error={errors.notes?.message}
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
