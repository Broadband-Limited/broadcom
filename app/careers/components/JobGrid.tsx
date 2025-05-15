import { formatRelativeTime } from '@/lib/utils';
import { Job } from '@/shared/types/career';
import { MapPin } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

interface JobGridProps {
  jobs: Job[];
}

const JobGrid: FC<JobGridProps> = ({ jobs }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <Link
          href={`/careers/${job.id}`}
          key={job.id}
          className="w-full aspect-[4/3] border border-foreground/10 hover:border-foreground/20 shadow-xl hover:shadow-none transition-all duration-300">
          <div className="w-full flex flex-col gap-1 min-h-1/2 overflow-hidden bg-light-blue/10 p-4">
            <h3 className="">{job.title}</h3>

            <p className="!text-sm text-gray-500">{job.department}</p>

            <div className="w-full flex items-center justify-between gap-4">
              <div className="flex items-center gap-1">
                <MapPin size={16} className="stroke-light-blue" />
                <p className="!text-sm leading-3 !text-light-blue">
                  {job.location}
                </p>
              </div>
              <p className="!text-xs">
                Posted {formatRelativeTime(job.posted_at)}
              </p>
            </div>
          </div>

          <p className="w-full p-4 !text-sm">{job.description}</p>
        </Link>
      ))}
    </div>
  );
};

export default JobGrid;
