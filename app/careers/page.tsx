'use client';

import { useState, useEffect, useCallback } from 'react';
import JobSearch from './components/JobSearch';
import { Job } from '@/lib/types/career_types';
import JobGrid from './components/JobGrid';

export default function CareersPage() {
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);
        const response = await fetch('/api/jobs');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        setAllJobs(data);
        setFilteredJobs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  const handleFilterChange = useCallback((jobs: Job[]) => {
    setFilteredJobs(jobs);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="mb-4">Join Our Team</h1>
        <p className="text-gray-600 max-w-2xl mx-auto !text-sm md:!text-base">
          Discover exciting career opportunities and be part of our mission to
          deliver innovative solutions in telecommunications and broadband
          technology.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <JobSearch jobs={allJobs} onFilterChange={handleFilterChange} />

        {loading ? (
          <div className="w-full text-center p-12">
            <div className="animate-pulse flex justify-center">
              <div className="h-8 w-8 bg-light-blue rounded-full"></div>
            </div>
            <p className="text-gray-500 mt-4">Loading jobs...</p>
          </div>
        ) : error ? (
          <div className="w-full text-center p-12 bg-red-50 rounded-lg">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <>
            <p className="text-gray-500 text-sm">
              {filteredJobs.length} job{filteredJobs.length !== 1 && 's'} found
            </p>
            <JobGrid jobs={filteredJobs} />
          </>
        )}
      </div>
    </div>
  );
}
