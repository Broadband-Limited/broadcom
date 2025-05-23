'use client';

import { useState } from 'react';
import { Application, ApplicationStatus, Job } from '@/lib/types/career_types';
import Button from '@/shared/components/ui/Button';
import { ArrowLeft, ChevronDown, Loader2, User2 } from 'lucide-react';
import Link from 'next/link';

interface ApplicationDetailsProps {
  application: Application;
  job?: Job;
  onStatusChange: (
    applicationId: string,
    status: ApplicationStatus
  ) => Promise<void>;
  onBack: () => void;
}

export default function ApplicationDetails({
  application,
  job,
  onStatusChange,
  onBack,
}: ApplicationDetailsProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<ApplicationStatus>(
    application.status
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = e.target.value as ApplicationStatus;
    if (newStatus !== currentStatus) {
      setIsUpdating(true);
      try {
        await onStatusChange(application.id, newStatus);
        setCurrentStatus(newStatus);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center border-b border-gray-200 p-4 bg-gray-50">
        <Button
          onClick={onBack}
          variant="outline"
          size="sm"
          className="flex items-center gap-2">
          <ArrowLeft size={16} />
          Back
        </Button>

        <div className="flex items-center">
          <label htmlFor="status" className="text-sm font-medium mr-2">
            Status:
          </label>{' '}
          <div className="relative">
            <select
              id="status"
              className="appearance-none w-40 p-2 pr-8 border border-gray-200 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={currentStatus}
              onChange={handleStatusChange}
              disabled={isUpdating}>
              <option value="applied">Applied</option>
              <option value="screening">Screening</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
              <option value="withdrawn">Withdrawn</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
          {isUpdating && (
            <span className="ml-2 text-sm text-gray-500 flex items-center gap-1">
              <Loader2 size={12} className="animate-spin" />{' '}
              <p>Updating...</p>
            </span>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <div className="bg-light-blue/5 p-1 border border-light-blue/10 flex items-center gap-2 mb-4">
              <User2 size={24} className='stroke-light-blue' />
              <h2 className="font-bold text-gray-900">{application.name}</h2>
            </div>

            <div className="space-y-4">
              <div className=''>
                <h4 className="text-sm font-medium text-gray-500">Email</h4>
                <p className="text-gray-900">{application.email}</p>
              </div>

              {application.phone && (
                <div className=''>
                  <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                  <p className="text-gray-900">{application.phone}</p>
                </div>
              )}

              <div className=''>
                <h4 className="text-sm font-medium text-gray-500">
                  Applied on
                </h4>
                <p className="text-gray-900">
                  {formatDate(application.applied_at)}
                </p>
              </div>

              {job && (
                <div className=''>
                  <h4 className="text-sm font-medium text-gray-500">
                    Position
                  </h4>
                  <p className="text-gray-900">{job.title}</p>
                </div>
              )}
            </div>
          </div>

          <div className='border-l border-foreground/10 pl-6'>
            <h3 className="text-sm font-medium text-gray-500 mb-4">
              Additional Information
            </h3>
            <div className="space-y-4">
              {application.linkedin_url && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    LinkedIn
                  </h4>
                  <a
                    href={application.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline mt-1 block">
                    {application.linkedin_url}
                  </a>
                </div>
              )}

              {application.portfolio_url && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Portfolio
                  </h4>
                  <Link
                    href={application.portfolio_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline mt-1 block">
                    {application.portfolio_url}
                  </Link>
                </div>
              )}

              {application.referral_source && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Referral Source
                  </h4>
                  <p className="text-gray-900 mt-1">
                    {application.referral_source}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 space-y-6">
          {application.skills && application.skills.length > 0 && (
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-3">
                Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {application.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          {application.notes && (
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-3">
                Notes
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {application.notes}
                </p>
              </div>
            </div>
          )}{' '}
          <div className="space-y-6">
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-3">
                Resume
              </h4>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={application.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  View Resume
                </Link>
              </div>
            </div>

            {application.cover_letter && (
              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-3">
                  Cover Letter
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {application.cover_letter}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
