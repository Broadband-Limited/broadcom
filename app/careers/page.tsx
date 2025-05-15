'use client';

import { useEffect, useState } from 'react';
import JobList from './components/JobList';
import JobSearch from './components/JobSearch';
import JobFilters from './components/JobFilters';
import type { Job } from '@/shared/types/job';

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <JobSearch
          onSearch={(query, location) => {
            console.log('Searching:', { query, location });
          }}
        />
        <JobFilters
          totalJobs={jobs.length}
          onFilterChange={(filterType, values) => {
            console.log('Filter changed:', { filterType, values });
          }}
        />
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-gray-900 font-medium">Search Results</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select className="text-sm border px-2 py-1">
                <option>Posting Date ↑</option>
                <option>Posting Date ↓</option>
              </select>
            </div>
          </div>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-600"></div>
            </div>
          ) : jobs.length > 0 ? (
            <JobList jobs={jobs} />
          ) : (
            <p className="text-center text-gray-500 py-8">
              No job postings available at this time.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
