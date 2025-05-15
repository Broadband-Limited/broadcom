import Link from 'next/link';
import type { Job } from '@/shared/types/job';
import { Bookmark } from 'lucide-react'; // Import Bookmark icon

interface JobItemProps {
  job: Job;
}

export default function JobItem({ job }: JobItemProps) {
  const formattedDate = new Date(job.posted_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <li className="border-b last:border-b-0 py-6">
      <article className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <header className="mb-4">
            <Link href={`/careers/${job.id}`} className="group">
              <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
                {job.title}
              </h2>
            </Link>
            <p className="text-gray-600">
              {job.location} • Posting Dates {formattedDate}
            </p>
            {job.trending && (
              <span className="inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                TRENDING
              </span>
            )}
          </header>
          <p className="text-gray-600 line-clamp-2">{job.description}</p>
        </div>
        <button
          className="flex-shrink-0 text-gray-400 hover:text-blue-600 transition-colors"
          aria-label="Save job">
          <Bookmark size={24} />
        </button>
      </article>
    </li>
  );
}
