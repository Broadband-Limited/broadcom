'use client';

import { Job } from '@/lib/types/career_types';
import Input from '@/shared/components/ui/Input';
import Button from '@/shared/components/ui/Button';
import { Search, ChevronDown, X } from 'lucide-react';
import { FC, useState, useRef, useEffect, useMemo } from 'react';

interface JobListSearchProps {
  jobs: Job[];
  onFilterChange: (filteredJobs: Job[]) => void;
}

const JobListSearch: FC<JobListSearchProps> = ({ jobs, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState<
    string[]
  >([]);
  const [isRemoteOnly, setIsRemoteOnly] = useState<boolean | null>(null);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [isEmploymentTypeOpen, setIsEmploymentTypeOpen] = useState(false);

  const deptRef = useRef<HTMLDivElement>(null);
  const empTypeRef = useRef<HTMLDivElement>(null);

  const departments = useMemo(
    () => Array.from(new Set(jobs.map((job) => job.department))),
    [jobs]
  );

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Search term filter
      if (
        searchTerm &&
        !job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !job.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !job.department.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Department filter
      if (
        selectedDepartments.length > 0 &&
        !selectedDepartments.includes(job.department)
      ) {
        return false;
      }

      // Employment type filter
      if (
        selectedEmploymentTypes.length > 0 &&
        !selectedEmploymentTypes.includes(job.employment_type)
      ) {
        return false;
      }

      // Remote filter
      if (isRemoteOnly !== null && job.is_remote !== isRemoteOnly) {
        return false;
      }

      return true;
    });
  }, [
    jobs,
    searchTerm,
    selectedDepartments,
    selectedEmploymentTypes,
    isRemoteOnly,
  ]);

  useEffect(() => {
    onFilterChange(filteredJobs);
  }, [filteredJobs, onFilterChange]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (deptRef.current && !deptRef.current.contains(event.target as Node)) {
        setIsDepartmentOpen(false);
      }
      if (
        empTypeRef.current &&
        !empTypeRef.current.contains(event.target as Node)
      ) {
        setIsEmploymentTypeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDepartments([]);
    setSelectedEmploymentTypes([]);
    setIsRemoteOnly(null);
  };

  return (
    <div className="w-full border border-foreground/10 p-4">
      {/* Search input */}
      <div className="w-full flex items-end gap-2 p-2 mb-4">
        <Input
          label="Search Jobs"
          name="job-search"
          placeholder="Search by title, description, or department"
          className="w-full !m-0"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button className="h-fit aspect-square">
          <Search size={16} />
        </Button>
      </div>

      {/* Active filters display */}
      {(selectedDepartments.length > 0 ||
        selectedEmploymentTypes.length > 0 ||
        isRemoteOnly !== null) && (
        <div className="flex flex-wrap gap-2 mb-4 p-2">
          <span className="text-sm font-medium text-gray-500">
            Active filters:
          </span>

          {selectedDepartments.map((dept) => (
            <span
              key={dept}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {dept}
              <button
                onClick={() =>
                  setSelectedDepartments((prev) =>
                    prev.filter((d) => d !== dept)
                  )
                }
                className="ml-1 focus:outline-none">
                <X size={12} />
              </button>
            </span>
          ))}

          {selectedEmploymentTypes.map((type) => (
            <span
              key={type}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              {type.replace('-', ' ')}
              <button
                onClick={() =>
                  setSelectedEmploymentTypes((prev) =>
                    prev.filter((t) => t !== type)
                  )
                }
                className="ml-1 focus:outline-none">
                <X size={12} />
              </button>
            </span>
          ))}

          {isRemoteOnly !== null && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              {isRemoteOnly ? 'Remote only' : 'On-site only'}
              <button
                onClick={() => setIsRemoteOnly(null)}
                className="ml-1 focus:outline-none">
                <X size={12} />
              </button>
            </span>
          )}

          <button
            onClick={clearFilters}
            className="text-xs text-gray-500 underline hover:text-gray-700">
            Clear all filters
          </button>
        </div>
      )}

      {/* Filter controls */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 p-2">
        {/* Department filter */}
        <div className="relative" ref={deptRef}>
          <button
            type="button"
            className="w-full p-3 border border-foreground/10 focus:outline-none flex items-center justify-between"
            onClick={() => setIsDepartmentOpen((open) => !open)}>
            <span>
              Department
              {selectedDepartments.length > 0
                ? ` (${selectedDepartments.length})`
                : ''}
            </span>
            <ChevronDown size={16} />
          </button>

          {isDepartmentOpen && (
            <div className="absolute z-10 mt-1 w-full bg-background border border-foreground/10 p-2 max-h-60 overflow-y-auto">
              {departments.map((department) => (
                <Input
                  key={department}
                  type="checkbox"
                  label={department}
                  name={`dept-${department}`}
                  className="m-0"
                  inputClassName="p-0"
                  checked={selectedDepartments.includes(department)}
                  onChange={() => {
                    setSelectedDepartments((prev) =>
                      prev.includes(department)
                        ? prev.filter((v) => v !== department)
                        : [...prev, department]
                    );
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Employment Type filter */}
        <div className="relative" ref={empTypeRef}>
          <button
            type="button"
            className="w-full p-3 border border-foreground/10 focus:outline-none flex items-center justify-between"
            onClick={() => setIsEmploymentTypeOpen((open) => !open)}>
            <span>
              Employment Type
              {selectedEmploymentTypes.length > 0
                ? ` (${selectedEmploymentTypes.length})`
                : ''}
            </span>
            <ChevronDown size={16} />
          </button>

          {isEmploymentTypeOpen && (
            <div className="absolute z-10 mt-1 w-full bg-background border border-foreground/10 p-2">
              <Input
                type="checkbox"
                label="Full-time"
                name="type-full-time"
                className="m-0"
                inputClassName="p-0"
                checked={selectedEmploymentTypes.includes('full-time')}
                onChange={() => {
                  setSelectedEmploymentTypes((prev) =>
                    prev.includes('full-time')
                      ? prev.filter((v) => v !== 'full-time')
                      : [...prev, 'full-time']
                  );
                }}
              />
              <Input
                type="checkbox"
                label="Part-time"
                name="type-part-time"
                className="m-0"
                inputClassName="p-0"
                checked={selectedEmploymentTypes.includes('part-time')}
                onChange={() => {
                  setSelectedEmploymentTypes((prev) =>
                    prev.includes('part-time')
                      ? prev.filter((v) => v !== 'part-time')
                      : [...prev, 'part-time']
                  );
                }}
              />
              <Input
                type="checkbox"
                label="Contract"
                name="type-contract"
                className="m-0"
                inputClassName="p-0"
                checked={selectedEmploymentTypes.includes('contract')}
                onChange={() => {
                  setSelectedEmploymentTypes((prev) =>
                    prev.includes('contract')
                      ? prev.filter((v) => v !== 'contract')
                      : [...prev, 'contract']
                  );
                }}
              />
              <Input
                type="checkbox"
                label="Internship"
                name="type-internship"
                className="m-0"
                inputClassName="p-0"
                checked={selectedEmploymentTypes.includes('internship')}
                onChange={() => {
                  setSelectedEmploymentTypes((prev) =>
                    prev.includes('internship')
                      ? prev.filter((v) => v !== 'internship')
                      : [...prev, 'internship']
                  );
                }}
              />
            </div>
          )}
        </div>

        {/* Remote filter */}
        <div>
          <select
            id="remote-filter"
            name="remote-status"
            value={
              isRemoteOnly === null ? '' : isRemoteOnly ? 'remote' : 'onsite'
            }
            onChange={(e) => {
              if (e.target.value === '') setIsRemoteOnly(null);
              else setIsRemoteOnly(e.target.value === 'remote');
            }}
            className="w-full p-3 border border-foreground/10 focus:outline-none focus:border-foreground/50 transition-all duration-300 ">
            <option value="">Any location type</option>
            <option value="remote">Remote only</option>
            <option value="onsite">On-site only</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default JobListSearch;
