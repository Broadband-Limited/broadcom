'use client';

import Button from '@/shared/components/ui/Button';
import Input from '@/shared/components/ui/Input';
import { EmploymentType, ExperienceLevel, Job } from '@/shared/types/career';
import { Search, ChevronDown, X } from 'lucide-react';
import { FC, useState, useRef, useEffect, useMemo } from 'react';

interface JobSearchProps {
  jobs: Job[];
  onFilterChange: (filteredJobs: Job[]) => void;
}

const JobSearch: FC<JobSearchProps> = ({ jobs, onFilterChange }) => {
  // Search state
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Dropdown open states and selections
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [isEmploymentTypeOpen, setIsEmploymentTypeOpen] = useState(false);
  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState<
    EmploymentType[]
  >([]);
  const [isExperienceOpen, setIsExperienceOpen] = useState(false);
  const [selectedExperienceLevels, setSelectedExperienceLevels] = useState<
    ExperienceLevel[]
  >([]);
  const [isRemoteOnly, setIsRemoteOnly] = useState<boolean | null>(null);

  const [datePosted, setDatePosted] = useState<number | null>(null);

  // References for click outside detection
  const locRef = useRef<HTMLDivElement>(null);
  const deptRef = useRef<HTMLDivElement>(null);
  const empTypeRef = useRef<HTMLDivElement>(null);
  const expRef = useRef<HTMLDivElement>(null);

  // Available options derived from jobs data
  const locations = useMemo(
    () => Array.from(new Set(jobs.map((job) => job.location))),
    [jobs]
  );

  const departments = useMemo(
    () => Array.from(new Set(jobs.map((job) => job.department))),
    [jobs]
  );

  // Move filtered jobs calculation into useMemo
  const filteredJobs = useMemo(() => {
    const now = new Date();
    return jobs.filter((job) => {
      // Search term filter
      if (
        searchTerm &&
        !job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !job.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Location filter
      if (
        selectedLocations.length > 0 &&
        !selectedLocations.includes(job.location)
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

      // Experience level filter
      if (
        selectedExperienceLevels.length > 0 &&
        job.experience_level &&
        !selectedExperienceLevels.includes(job.experience_level)
      ) {
        return false;
      }

      // Remote filter
      if (isRemoteOnly !== null && job.is_remote !== isRemoteOnly) {
        return false;
      }

      // Date posted filter
      if (datePosted) {
        const jobDate = new Date(job.posted_at);
        const diffTime = Math.abs(now.getTime() - jobDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > datePosted) {
          return false;
        }
      }

      return true;
    });
  }, [
    jobs,
    searchTerm,
    selectedLocations,
    selectedDepartments,
    selectedEmploymentTypes,
    selectedExperienceLevels,
    isRemoteOnly,
    datePosted,
  ]);

  // Update the effect to use the memoized filtered jobs
  useEffect(() => {
    onFilterChange(filteredJobs);
  }, [filteredJobs, onFilterChange]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locRef.current && !locRef.current.contains(event.target as Node)) {
        setIsLocationOpen(false);
      }
      if (deptRef.current && !deptRef.current.contains(event.target as Node)) {
        setIsDepartmentOpen(false);
      }
      if (
        empTypeRef.current &&
        !empTypeRef.current.contains(event.target as Node)
      ) {
        setIsEmploymentTypeOpen(false);
      }
      if (expRef.current && !expRef.current.contains(event.target as Node)) {
        setIsExperienceOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLocations([]);
    setSelectedDepartments([]);
    setSelectedEmploymentTypes([]);
    setSelectedExperienceLevels([]);
    setIsRemoteOnly(null);
    setDatePosted(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-background border border-foreground/10 shadow-md p-4">
      <h3 className="mb-2">Find Your Perfect Role</h3>

      {/* Search input */}
      <div className="w-full flex items-end gap-2 p-2 mb-4">
        <Input
          label="Find Jobs"
          name="job-search"
          placeholder="Search jobs by title or keywords"
          className="w-full !m-0"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button className="h-fit aspect-square">
          <Search size={16} />
        </Button>
      </div>

      {/* Active filters display */}
      {(selectedLocations.length > 0 ||
        selectedDepartments.length > 0 ||
        selectedEmploymentTypes.length > 0 ||
        selectedExperienceLevels.length > 0 ||
        isRemoteOnly !== null ||
        datePosted !== null) && (
        <div className="flex flex-wrap gap-2 mb-4 p-2">
          <span className="text-sm font-medium text-gray-500">
            Active filters:
          </span>

          {selectedLocations.map((loc) => (
            <span
              key={loc}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {loc}
              <button
                onClick={() =>
                  setSelectedLocations((prev) => prev.filter((l) => l !== loc))
                }
                className="ml-1 focus:outline-none">
                <X size={12} />
              </button>
            </span>
          ))}

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

          {selectedExperienceLevels.map((level) => (
            <span
              key={level}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              {level}
              <button
                onClick={() =>
                  setSelectedExperienceLevels((prev) =>
                    prev.filter((l) => l !== level)
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

          {datePosted !== null && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Posted within {datePosted} days
              <button
                onClick={() => setDatePosted(null)}
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
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 p-2">
        {/* Location filter */}
        <div className="flex flex-col w-full relative" ref={locRef}>
          <button
            type="button"
            className="w-full p-3 border border-foreground/10 focus:outline-none flex items-center justify-between"
            onClick={() => setIsLocationOpen((open) => !open)}>
            <span>
              Location
              {selectedLocations.length > 0
                ? ` (${selectedLocations.length})`
                : ''}
            </span>
            <ChevronDown size={16} />
          </button>
          {isLocationOpen && (
            <div className="absolute z-10 mt-12 w-full bg-background border border-foreground/10 p-2 max-h-60 overflow-y-auto">
              {locations.map((location) => (
                <Input
                  key={location}
                  type="checkbox"
                  label={location}
                  name={`location-${location}`}
                  className="m-0"
                  inputClassName="p-0"
                  checked={selectedLocations.includes(location)}
                  onChange={() => {
                    setSelectedLocations((prev) =>
                      prev.includes(location)
                        ? prev.filter((v) => v !== location)
                        : [...prev, location]
                    );
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Department filter */}
        <div className="flex flex-col w-full relative" ref={deptRef}>
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
            <div className="absolute z-10 mt-12 w-full bg-background border border-foreground/10 p-2 max-h-60 overflow-y-auto">
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

        {/* Date posted filter */}
        <div className="flex flex-col w-full">
          <select
            id="date-filter"
            name="posting-period"
            value={datePosted?.toString() || ''}
            onChange={(e) =>
              setDatePosted(e.target.value ? parseInt(e.target.value) : null)
            }
            className="w-full p-3 border border-foreground/10 focus:outline-none focus:border-foreground/50 transition-all duration-300">
            <option value="">Anytime</option>
            <option value="1">Today</option>
            <option value="3">Last 3 days</option>
            <option value="7">Last week</option>
            <option value="14">Last 2 weeks</option>
            <option value="30">Last month</option>
          </select>
        </div>

        {/* Employment Type filter */}
        <div className="flex flex-col w-full relative" ref={empTypeRef}>
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
            <div className="absolute z-10 mt-12 w-full bg-background border border-foreground/10 p-2">
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

        {/* Experience Level filter */}
        <div className="flex flex-col w-full relative" ref={expRef}>
          <button
            type="button"
            className="w-full p-3 border border-foreground/10 focus:outline-none flex items-center justify-between"
            onClick={() => setIsExperienceOpen((open) => !open)}>
            <span>
              Experience
              {selectedExperienceLevels.length > 0
                ? ` (${selectedExperienceLevels.length})`
                : ''}
            </span>
            <ChevronDown size={16} />
          </button>
          {isExperienceOpen && (
            <div className="absolute z-10 mt-12 w-full bg-background border border-foreground/10 p-2">
              <Input
                type="checkbox"
                label="Entry Level"
                name="exp-entry"
                className="m-0"
                inputClassName="p-0"
                checked={selectedExperienceLevels.includes('entry')}
                onChange={() => {
                  setSelectedExperienceLevels((prev) =>
                    prev.includes('entry')
                      ? prev.filter((v) => v !== 'entry')
                      : [...prev, 'entry']
                  );
                }}
              />
              <Input
                type="checkbox"
                label="Mid Level"
                name="exp-mid"
                className="m-0"
                inputClassName="p-0"
                checked={selectedExperienceLevels.includes('mid')}
                onChange={() => {
                  setSelectedExperienceLevels((prev) =>
                    prev.includes('mid')
                      ? prev.filter((v) => v !== 'mid')
                      : [...prev, 'mid']
                  );
                }}
              />
              <Input
                type="checkbox"
                label="Senior Level"
                name="exp-senior"
                className="m-0"
                inputClassName="p-0"
                checked={selectedExperienceLevels.includes('senior')}
                onChange={() => {
                  setSelectedExperienceLevels((prev) =>
                    prev.includes('senior')
                      ? prev.filter((v) => v !== 'senior')
                      : [...prev, 'senior']
                  );
                }}
              />
              <Input
                type="checkbox"
                label="Executive"
                name="exp-executive"
                className="m-0"
                inputClassName="p-0"
                checked={selectedExperienceLevels.includes('executive')}
                onChange={() => {
                  setSelectedExperienceLevels((prev) =>
                    prev.includes('executive')
                      ? prev.filter((v) => v !== 'executive')
                      : [...prev, 'executive']
                  );
                }}
              />
            </div>
          )}
        </div>

        {/* Remote filter */}
        <div className="flex flex-col w-full">
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
            className="w-full p-3 border border-foreground/10 focus:outline-none focus:border-foreground/50 transition-all duration-300">
            <option value="">Any location type</option>
            <option value="remote">Remote only</option>
            <option value="onsite">On-site only</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
