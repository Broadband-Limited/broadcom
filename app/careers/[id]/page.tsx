import { getJobById } from '@/lib/db/jobs';
import ApplicationForm from '../components/ApplicationForm';
import { formatRelativeTime } from '@/lib/utils';
import {
  Briefcase,
  Calendar,
  Clock,
  MapPin,
  Building,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';

interface CareerPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CareerPage({ params }: CareerPageProps) {
  const id = (await params).id;
  const job = await getJobById(id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link
        href="/careers"
        className="text-blue-500 hover:underline flex items-center gap-1 mb-6">
        &larr; Back to all jobs
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
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

            <h1 className="text-3xl font-bold mb-4">{job.title}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-700">
                <Building size={18} className="text-light-blue" />
                <p>{job.department}</p>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <MapPin size={18} className="text-light-blue" />
                <p>{job.location}</p>
              </div>

              {job.salary_min && job.salary_max && (
                <div className="flex items-center gap-2 text-gray-700">
                  <Briefcase size={18} className="text-light-blue" />
                  <p>
                    KSH {job.salary_min.toLocaleString()} - KSH {job.salary_max.toLocaleString()}
                  </p>
                </div>
              )}

              <div className="flex items-center gap-2 text-gray-700">
                <Clock size={18} className="text-light-blue" />
                <p>Posted {formatRelativeTime(job.posted_at)}</p>
              </div>

              {job.application_deadline && (
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar size={18} className="text-light-blue" />
                  <p>
                    Apply by{' '}
                    {new Date(job.application_deadline).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>

            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold mb-3">Job Description</h2>
              <div className="mb-6">
                <p className="whitespace-pre-line">{job.description}</p>
              </div>

              {job.requirements && job.requirements.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Requirements</h2>
                  <ul className="list-none space-y-2">
                    {job.requirements.map((req: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle
                          size={18}
                          className="text-green-500 mt-1 flex-shrink-0"
                        />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {job.benefits && job.benefits.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Benefits</h2>
                  <ul className="list-none space-y-2">
                    {job.benefits.map((benefit: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle
                          size={18}
                          className="text-blue-500 mt-1 flex-shrink-0"
                        />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-36">
            <ApplicationForm jobId={id} job={job} />
          </div>
        </div>
      </div>
    </div>
  );
}
