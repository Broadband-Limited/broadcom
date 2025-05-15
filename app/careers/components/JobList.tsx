'use client';
import type { Job } from '@/shared/types/job';
import JobItem from './JobItem';
import React from 'react';

interface JobListProps {
  jobs: Job[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  if (!jobs || jobs.length === 0) {
    return (
      <p className="text-center text-gray-500">No job postings available.</p>
    );
  }
  return (
    <ul className="divide-y divide-gray-200">
      {jobs.map((job) => (
        <JobItem key={job.id} job={job} />
      ))}
    </ul>
  );
};

export default JobList;
