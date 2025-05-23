'use client';

import { useState } from 'react';
import { Job } from '@/lib/types/career_types';
import { PlusCircle } from 'lucide-react';
import JobForm from './JobForm';
import JobList from './JobList';
import Button from '@/shared/components/ui/Button';
import toast from 'react-hot-toast';

import { Division } from '@/lib/types/divisions_types';

interface JobsManagerProps {
  initialJobs: Job[];
  divisions: Division[];
}

export default function JobsManager({
  initialJobs,
  divisions,
}: JobsManagerProps) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [selectedJob, setSelectedJob] = useState<Job | undefined>(undefined);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleAdd = () => {
    setSelectedJob(undefined);
    setIsAdding(true);
    setIsEditing(false);
  };

  const handleEdit = (job: Job) => {
    setSelectedJob(job);
    setIsAdding(false);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setSelectedJob(undefined);
    setIsAdding(false);
    setIsEditing(false);
  };

  const handleCreate = async (job: Job) => {
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(job),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create job');
      }

      const newJob = await response.json();
      setJobs([...jobs, newJob]);
      setIsAdding(false);
      toast.success('Job created successfully');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to create job'
      );
    }
  };

  const handleUpdate = async (job: Job) => {
    try {
      const response = await fetch(`/api/jobs/${job.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(job),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update job');
      }

      const updatedJob = await response.json();
      setJobs(jobs.map((j) => (j.id === job.id ? updatedJob : j)));
      setIsEditing(false);
      toast.success('Job updated successfully');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to update job'
      );
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete job');
      }

      setJobs(jobs.filter((job) => job.id !== id));
      toast.success('Job deleted successfully');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to delete job'
      );
    }
  };
  return (
    <div className="space-y-6">
      {isAdding || isEditing ? (
        <div className="bg-white shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="font-bold text-gray-900">
                {isAdding ? 'Create New Job' : 'Edit Job'}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {isAdding
                  ? 'Add a new job listing'
                  : 'Update job listing details'}
              </p>
            </div>
            <Button onClick={handleCancel} variant="outline" size="sm">
              Cancel
            </Button>
          </div>

          <JobForm
            job={selectedJob}
            divisions={divisions}
            onSubmit={isAdding ? handleCreate : handleUpdate}
            onCancel={handleCancel}
          />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-bold">Job Listings</h2>
              <p className="mt-1 text-sm text-gray-500">
                Manage job postings and their details
              </p>
              </div>
              
            <Button onClick={handleAdd} size="default">
              <PlusCircle className="w-4 h-4 mr-2" />
              Add New Job
            </Button>
          </div>
          <div className="overflow-hidden">
            <JobList
              jobs={jobs}
              onEditJob={handleEdit}
              onDeleteJob={handleDelete}
            />
          </div>
        </div>
      )}
    </div>
  );
}
