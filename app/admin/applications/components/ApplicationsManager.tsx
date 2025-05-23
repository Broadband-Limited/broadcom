'use client';

import { useState, useMemo } from 'react';
import { Application, ApplicationStatus, Job } from '@/lib/types/career_types';
import ApplicationList from './ApplicationList';
import ApplicationDetails from './ApplicationDetails';
import toast from 'react-hot-toast';
import { ChevronDown } from 'lucide-react';

interface ApplicationsManagerProps {
  initialApplications: Application[];
  jobs: Job[];
}

export default function ApplicationsManager({
  initialApplications,
  jobs,
}: ApplicationsManagerProps) {
  const [applications, setApplications] =
    useState<Application[]>(initialApplications);
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const [filterJobId, setFilterJobId] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<ApplicationStatus | ''>('');

  const jobMap = useMemo(() => {
    const map = new Map<string, Job>();
    jobs.forEach((job) => map.set(job.id, job));
    return map;
  }, [jobs]);

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const jobIdMatch = filterJobId ? app.job_id === filterJobId : true;
      const statusMatch = filterStatus ? app.status === filterStatus : true;
      return jobIdMatch && statusMatch;
    });
  }, [applications, filterJobId, filterStatus]);

  const handleStatusChange = async (
    applicationId: string,
    newStatus: ApplicationStatus
  ) => {
    try {
      const response = await fetch(
        `/api/applications/${applicationId}/status`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update application status');
      }

      const updatedApplication = await response.json();
      setApplications(
        applications.map((app) =>
          app.id === applicationId ? updatedApplication : app
        )
      );

      if (selectedApplication?.id === applicationId) {
        setSelectedApplication(updatedApplication);
      }

      toast.success('Application status updated successfully');
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to update application status'
      );
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Job Applications</h2>
          <p className="mt-1 text-sm text-gray-500">
            {filteredApplications.length}{' '}
            {filteredApplications.length === 1 ? 'application' : 'applications'}{' '}
            found
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <label
            htmlFor="jobFilter"
            className="block mb-2 text-sm font-medium text-gray-500">
            Filter by Job
          </label>
          <div className="relative">
            <select
              id="jobFilter"
              className="w-full p-2 border border-gray-200 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterJobId}
              onChange={(e) => setFilterJobId(e.target.value)}>
              <option value="">All Jobs</option>
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="relative">
          <label
            htmlFor="statusFilter"
            className="block mb-2 text-sm font-medium text-gray-500">
            Filter by Status
          </label>
          <div className="relative">
            <select
              id="statusFilter"
              className="w-full p-2 border border-gray-200 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(e.target.value as ApplicationStatus | '')
              }>
              <option value="">All Statuses</option>
              <option value="applied">Applied</option>
              <option value="screening">Screening</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
              <option value="withdrawn">Withdrawn</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
            <ApplicationList
              applications={filteredApplications}
              onSelectApplication={setSelectedApplication}
              selectedApplicationId={selectedApplication?.id}
              jobMap={jobMap}
            />
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedApplication ? (
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
              <ApplicationDetails
                application={selectedApplication}
                job={jobMap.get(selectedApplication.job_id)}
                onStatusChange={handleStatusChange}
                onBack={() => setSelectedApplication(null)}
              />
            </div>
          ) : (
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 flex flex-col items-center justify-center h-full min-h-[300px]">
              <p className="text-gray-500 text-center">
                Select an application to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
