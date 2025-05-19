import { formatRelativeTime } from '@/lib/utils';
import { Job } from '@/lib/types/career_types';
import { Clock, MapPin, Building, Calendar } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

interface JobGridProps {
  jobs: Job[];
}

const JobGrid: FC<JobGridProps> = ({ jobs }) => {
  if (jobs.length === 0) {
    return (
      <div className="w-full p-8 text-center">
        <h3 className="text-xl font-medium text-gray-700">No jobs found</h3>
        <p className="text-gray-500 mt-2">
          Please try different search criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {jobs.map((job) => (
        <Link
          href={`/careers/${job.id}`}
          key={job.id}
          className="w-full border border-foreground/10 hover:border-foreground/20 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
          <div className="w-full flex flex-col gap-2 bg-light-blue/10 p-5">
            <div className="flex items-center gap-2">
              {job.is_remote && (
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
                  Remote
                </span>
              )}
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
                {job.employment_type.replace('-', ' ')}
              </span>
              {job.experience_level && (
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full">
                  {job.experience_level}
                </span>
              )}
            </div>

            <h3 className="!text-lg font-semibold mt-2 line-clamp-2">
              {job.title}
            </h3>

            <div className="flex items-center gap-2 text-gray-600">
              <Building size={16} className="text-light-blue" />
              <p className="!text-sm">{job.department}</p>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <MapPin size={16} className="text-light-blue" />
              <p className="!text-sm">{job.location}</p>
            </div>
          </div>

          <div className="p-5 flex-grow">
            <p className="!text-sm text-gray-600 line-clamp-3 mb-4">
              {job.description}
            </p>

            {job.requirements && job.requirements.length > 0 && (
              <div className="mb-4">
                <h4 className="!text-sm font-semibold mb-2">
                  Key Requirements:
                </h4>
                <ul className="!text-xs text-gray-600 list-disc pl-4 space-y-1">
                  {job.requirements.slice(0, 3).map((req, index) => (
                    <li key={index} className="line-clamp-1 !text-sm">
                      {req}
                    </li>
                  ))}
                  {job.requirements.length > 3 && (
                    <li className="text-blue-500">
                      +{job.requirements.length - 3} more
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          <div className="border-t border-foreground/10 p-4 flex items-center justify-between">
            <div className="flex items-center gap-1 text-gray-500">
              <Clock size={14} />
              <p className="!text-xs">
                Posted {formatRelativeTime(job.posted_at)}
              </p>
            </div>

            {job.application_deadline && (
              <div className="flex items-center gap-1 text-gray-500">
                <Calendar size={14} />
                <p className="!text-xs">
                  Apply by{' '}
                  {new Date(job.application_deadline).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default JobGrid;
