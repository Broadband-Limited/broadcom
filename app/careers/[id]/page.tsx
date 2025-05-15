import { getJobById } from '@/lib/jobs';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import type { Job } from '@/shared/types/job';

interface JobPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: JobPageProps): Promise<Metadata> {
  const job = await getJobById((await params).id);
  if (!job) {
    return { title: 'Job Not Found | Careers' };
  }
  return { title: `${job.title} | Careers` };
}

export default async function JobPage({ params }: JobPageProps) {
  const job: Job | null = await getJobById((await params).id);
  if (!job) {
    notFound();
  }

  const formattedDate = new Date(job.posted_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className="container mx-auto px-4 py-8">
      <Link href="/careers">
        <p className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to Careers
        </p>
      </Link>
      <article className="prose max-w-none">
        <header>
          <h1>{job.title}</h1>
          <p className="text-gray-500">
            {job.department} &middot; {job.location} &middot; Posted on{' '}
            {formattedDate}
          </p>
        </header>
        <section>
          <h2 className="mt-6">Job Description</h2>
          <p>{job.description}</p>
        </section>
      </article>
    </section>
  );
}
