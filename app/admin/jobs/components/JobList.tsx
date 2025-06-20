'use client';

import React, { useState, useMemo } from 'react';
import { Job } from '@/lib/types/career_types';
import {
  Pencil,
  Trash2,
  Users,
  Clock,
  Calendar,
  Building,
  MapPin,
} from 'lucide-react';
import toast from 'react-hot-toast';
import JobListSearch from './JobListSearch';
import { useRouter } from 'next/navigation';
import AdminContextMenu, {
  AdminContextMenuAction,
} from '@/shared/components/ui/AdminContextMenu';
import ConfirmationModal from '@/shared/components/ui/ConfirmationModal';
import { useConfirmation } from '@/shared/hooks/useConfirmation';

interface JobListProps {
  jobs: Job[];
  onEditJob: (job: Job) => void;
  onDeleteJob: (id: string) => Promise<void>;
}

export default function JobList({
  jobs,
  onEditJob,
  onDeleteJob,
}: JobListProps) {
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: 'title' | 'department' | 'posted_at';
    direction: 'asc' | 'desc';
  }>({ key: 'posted_at', direction: 'desc' });
  const { confirm, confirmationProps } = useConfirmation();
  const router = useRouter();

  // Memoize sorted jobs to prevent unnecessary re-renders
  const sortedJobs = useMemo(() => {
    const sorted = [...filteredJobs].sort((a, b) => {
      if (sortConfig.key === 'posted_at') {
        const dateA = new Date(a[sortConfig.key]).getTime();
        const dateB = new Date(b[sortConfig.key]).getTime();
        return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
      }

      const aValue = a[sortConfig.key]?.toString().toLowerCase() ?? '';
      const bValue = b[sortConfig.key]?.toString().toLowerCase() ?? '';
      return sortConfig.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
    return sorted;
  }, [filteredJobs, sortConfig]);

  const handleSort = (key: 'title' | 'department' | 'posted_at') => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const toggleExpand = (id: string) => {
    setExpandedJob((prev) => (prev === id ? null : id));
  };

  // Format functions
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatSalary = (min?: number, max?: number): string => {
    if (!min && !max) return 'Not specified';
    if (min && !max) return `$${min.toLocaleString()}+`;
    if (!min && max) return `Up to $${max.toLocaleString()}`;
    return `Ksh ${min?.toLocaleString()} - Ksh ${max?.toLocaleString()}`;
  };

  // Add handleDelete function
  const handleDelete = async (id: string, title: string) => {
    const confirmed = await confirm({
      title: 'Delete Job',
      message: `Are you sure you want to delete "${title}"? This action cannot be undone.`,
      confirmText: 'Yes, delete',
      variant: 'danger',
    });
    if (!confirmed) return;
    setIsDeleting(id);
    try {
      await onDeleteJob(id);
      toast.success('Job deleted successfully');
      setFilteredJobs((prev) => prev.filter((j) => j.id !== id));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete job');
    } finally {
      setIsDeleting(null);
    }
  };

  if (jobs.length === 0) {
    return (
      <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 flex flex-col items-center justify-center">
        <p className="text-gray-500 text-center">No job listings found</p>
      </div>
    );
  }

  // Table header component for better organization
  const TableHeader = () => (
    <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-100 rounded-t-lg text-sm font-semibold text-gray-700">
      <button
        onClick={() => handleSort('title')}
        className="col-span-3 flex items-center gap-1 hover:text-blue-600 transition-colors"
        aria-label={`Sort by title ${
          sortConfig.key === 'title' ? `(${sortConfig.direction})` : ''
        }`}>
        Title{' '}
        {sortConfig.key === 'title' && (
          <span className="text-blue-600" aria-hidden="true">
            {sortConfig.direction === 'asc' ? '↑' : '↓'}
          </span>
        )}
      </button>
      <button
        onClick={() => handleSort('department')}
        className="col-span-2 flex items-center gap-1 hover:text-blue-600 transition-colors"
        aria-label={`Sort by department ${
          sortConfig.key === 'department' ? `(${sortConfig.direction})` : ''
        }`}>
        Department{' '}
        {sortConfig.key === 'department' && (
          <span className="text-blue-600" aria-hidden="true">
            {sortConfig.direction === 'asc' ? '↑' : '↓'}
          </span>
        )}
      </button>
      <button
        onClick={() => handleSort('posted_at')}
        className="col-span-2 flex items-center gap-1 hover:text-blue-600 transition-colors"
        aria-label={`Sort by date ${
          sortConfig.key === 'posted_at' ? `(${sortConfig.direction})` : ''
        }`}>
        Posted{' '}
        {sortConfig.key === 'posted_at' && (
          <span className="text-blue-600" aria-hidden="true">
            {sortConfig.direction === 'asc' ? '↑' : '↓'}
          </span>
        )}
      </button>
      <div className="col-span-3">Status</div>
      <div className="col-span-2">Actions</div>
    </div>
  );

  return (
    <div className="space-y-4">
      <JobListSearch jobs={jobs} onFilterChange={setFilteredJobs} />

      <div className="bg-white rounded-lg">
        <TableHeader />

        <div className="divide-y divide-gray-200">
          {sortedJobs.map((job) => {
            // build menu actions
            const actions: AdminContextMenuAction[] = [
              {
                label: 'Applications',
                icon: Users,
                onClick: () =>
                  router.push(`/admin/applications?jobId=${job.id}`),
                external: false,
              },
              {
                label: 'Edit',
                icon: Pencil,
                onClick: () => onEditJob(job),
              },
              {
                label: 'Delete',
                icon: Trash2,
                destructive: true,
                disabled: isDeleting === job.id,
                onClick: () => handleDelete(job.id, job.title),
              },
            ];

            return (
              <div
                key={job.id}
                className="hover:bg-gray-50/50 transition-colors"
                onClick={() => toggleExpand(job.id)}>
                <div className="p-6 cursor-pointer">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-dark-blue truncate">
                          {job.title}
                        </h3>
                        {job.application_deadline && (
                          <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                            Deadline approaching
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 items-center mt-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Building className="w-4 h-4 text-gray-400" />
                          <span>{job.department}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{job.location}</span>
                        </div>
                        {job.is_remote && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                            Remote
                          </span>
                        )}
                      </div>
                    </div>

                    {/* replace buttons with context menu */}
                    <div className="flex items-center">
                      <AdminContextMenu actions={actions} />
                    </div>
                  </div>

                  <div
                    className={`mt-4 transition-all duration-200 ${
                      expandedJob === job.id ? 'block' : 'hidden'
                    }`}
                    id={`job-details-${job.id}`}
                    role="region"
                    aria-labelledby={`job-title-${job.id}`}>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <span className="block text-xs font-medium text-gray-500 uppercase mb-1">
                          Employment Type
                        </span>
                        <span className="text-sm font-medium capitalize px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                          {job.employment_type.replace('-', ' ')}
                        </span>
                      </div>
                      <div>
                        <span className="block text-xs font-medium text-gray-500 uppercase mb-1">
                          Experience Level
                        </span>
                        <span className="text-sm font-medium capitalize px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                          {job.experience_level || 'Not specified'} Level
                        </span>
                      </div>
                      <div>
                        <span className="block text-xs font-medium text-gray-500 uppercase mb-1">
                          Salary Range
                        </span>
                        <span className="text-sm font-medium capitalize px-2 py-1 bg-green-100 text-green-800 rounded-full">
                          {formatSalary(job.salary_min, job.salary_max)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        Posted {formatDate(job.posted_at)}
                      </div>
                      {job.application_deadline && (
                        <div className="flex items-center gap-2 text-sm text-yellow-800">
                          <Calendar className="w-4 h-4" />
                          Deadline: {formatDate(job.application_deadline)}
                        </div>
                      )}
                    </div>

                    {job.description && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Description
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {job.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* new ConfirmationModal using hook */}
      <ConfirmationModal {...confirmationProps} isLoading={!!isDeleting} />

      {sortedJobs.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No jobs found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
