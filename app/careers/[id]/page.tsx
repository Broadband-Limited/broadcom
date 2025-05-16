import { getJobById, getJobsForStaticGeneration } from '@/lib/db/jobs';
import ApplicationForm from '../components/ApplicationForm';
import { formatRelativeTime } from '@/lib/utils';
import { Calendar, Clock, MapPin, Building, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { generateJobMetadata } from '../metadata';
import type { Metadata } from 'next';

interface CareerPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate metadata for job page
export async function generateMetadata({
  params,
}: CareerPageProps): Promise<Metadata> {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job) {
    return {
      title: 'Job Not Found | Broadcom Careers',
      description: 'The requested job position could not be found.',
    };
  }

  return generateJobMetadata(job.title, job.location);
}

// Generate static params for all jobs
export async function generateStaticParams() {
  // Use a special function for static generation that doesn't use cookies
  const jobs = await getJobsForStaticGeneration();

  return jobs.map((job) => ({
    id: job.id,
  }));
}

export default async function CareerPage({ params }: CareerPageProps) {
  const { id } = await params;
  const job = await getJobById(id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link
        href="/careers"
        className="text-blue-500 hover:underline flex items-center gap-1 mb-6">
        &larr; Back to all jobs
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <div className="bg-background border border-foreground/10 shadow-md p-8 mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {job.is_remote && (
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  Remote
                </span>
              )}
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                {job.employment_type.replace('-', ' ')}
              </span>
              {job.experience_level && (
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                  {job.experience_level}
                </span>
              )}
            </div>

            <h3 className="mb-4">{job.title}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-700">
                <Building size={18} className="text-light-blue" />
                <p className="!text-sm">{job.department}</p>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <MapPin size={18} className="text-light-blue" />
                <p className="!text-sm">{job.location}</p>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <Clock size={18} className="text-light-blue" />
                <p className="!text-sm">
                  Posted {formatRelativeTime(job.posted_at)}
                </p>
              </div>

              {job.application_deadline && (
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar size={18} className="text-light-blue" />
                  <p className="!text-sm">
                    Apply by{' '}
                    {new Date(job.application_deadline).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>

            <div className="prose max-w-none">
              <h4 className="font-semibold mb-3">Job Description</h4>
              <div className="mb-6">
                <p className="whitespace-pre-line !text-sm">
                  {job.description}
                </p>
              </div>

              {job.requirements && job.requirements.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Requirements</h4>
                  <ul className="list-none space-y-2">
                    {job.requirements.map((req: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle
                          size={18}
                          className="text-green-500 mt-1 flex-shrink-0"
                        />
                        <span className="text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {job.benefits && job.benefits.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Benefits</h4>
                  <ul className="list-none space-y-2">
                    {job.benefits.map((benefit: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle
                          size={18}
                          className="text-blue-500 mt-1 flex-shrink-0"
                        />
                        <span className="!text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="sticky top-36">
            <ApplicationForm jobId={id} job={job} />
          </div>
        </div>
      </div>
    </div>
  );
}
