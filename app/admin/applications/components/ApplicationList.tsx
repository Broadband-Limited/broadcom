'use client';

import { Application, Job } from '@/lib/types/career_types';

interface ApplicationListProps {
  applications: Application[];
  onSelectApplication: (application: Application) => void;
  selectedApplicationId?: string;
  jobMap: Map<string, Job>;
}

export default function ApplicationList({
  applications,
  onSelectApplication,
  selectedApplicationId,
  jobMap,
}: ApplicationListProps) {
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadgeClass = (status: string): string => {
    switch (status) {
      case 'applied':
        return 'bg-blue-100 text-blue-800';
      case 'screening':
        return 'bg-purple-100 text-purple-800';
      case 'interview':
        return 'bg-yellow-100 text-yellow-800';
      case 'offer':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'withdrawn':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  if (applications.length === 0) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
        <p className="text-gray-500">No applications found</p>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-y-auto max-h-[600px]">
        <ul className="divide-y divide-gray-200">
          {applications.map((application) => (
            <li
              key={application.id}
              className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                application.id === selectedApplicationId ? 'bg-blue-50' : ''
              }`}
              onClick={() => onSelectApplication(application)}>
              <div className="flex justify-between items-start mb-1">
                <span className="font-medium">{application.name}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeClass(
                    application.status
                  )}`}>
                  {application.status.charAt(0).toUpperCase() +
                    application.status.slice(1)}
                </span>
              </div>
              <div className="text-sm text-gray-500 mb-1">
                {jobMap.get(application.job_id)?.title || 'Unknown Job'}
              </div>
              <div className="text-xs text-gray-400">
                Applied: {formatDate(application.applied_at)}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
