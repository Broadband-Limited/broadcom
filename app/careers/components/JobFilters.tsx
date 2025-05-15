import React from 'react';
import { ChevronDown } from 'lucide-react';
import { divisions } from '@/shared/data/services';

interface FilterProps {
  label: string;
  options: string[];
  onChange: (selected: string[]) => void;
}

function Filter({ label, options, onChange }: FilterProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (option: string) => {
    const newSelected = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];
    setSelectedOptions(newSelected);
    onChange(newSelected);
  };

  return (
    <div className="relative mont" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`px-4 py-2 border transition-colors flex items-center gap-2 hover:border-dark-blue ${
          selectedOptions.length > 0
            ? 'border-dark-blue bg-dark-blue/5 text-dark-blue'
            : 'border-gray-300'
        }`}>
        <span>{label}</span>
        {selectedOptions.length > 0 && (
          <span className="text-xs bg-dark-blue/10 px-2 py-0.5 rounded-full">
            {selectedOptions.length}
          </span>
        )}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-64 mt-1 bg-background border border-gray-200 rounded shadow-lg">
          <div className="py-1 max-h-60 overflow-y-auto hide-scrollbar">
            {options.map((option) => (
              <label
                key={option}
                className="flex items-center px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleOptionClick(option)}
                  className="mr-3 h-4 w-4 accent-dark-blue border-gray-300 rounded focus:ring-dark-blue"
                />
                <span className="text-foreground/80">{option}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface JobFiltersProps {
  totalJobs: number;
  onFilterChange: (filterType: string, values: string[]) => void;
}

const locations = ['Kenya', 'Ethiopia', 'Tanzania'];

// Job functions based on company services and divisions
const jobFunctions = [
  'Network Engineering',
  'RF Planning',
  'Project Management',
  'Technical Support',
  'Site Engineering',
  'Software Development',
  'Sales & Business Development',
  'Administrative',
];

const employeeLevels = [
  'Entry Level',
  'Mid Level',
  'Senior Level',
  'Management',
  'Executive',
];

const employmentTypes = ['Full Time', 'Contract', 'Internship'];

const filters = {
  locations,
  divisions: divisions.map((d) => d.name),
  jobFunctions,
  employeeLevels,
  employmentTypes,
  postingDates: ['Last 24 hours', 'Past week', 'Past month'],
};

export default function JobFilters({
  totalJobs,
  onFilterChange,
}: JobFiltersProps) {
  return (
    <div className="w-full max-w-7xl mx-auto mb-8">
      <div className="flex items-center gap-2 mb-4">
        <span className="montserrat font-semibold text-foreground/90">
          {totalJobs} OPEN POSITIONS
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        <Filter
          label="Location"
          options={filters.locations}
          onChange={(selected) => onFilterChange('locations', selected)}
        />
        <Filter
          label="Division"
          options={filters.divisions}
          onChange={(selected) => onFilterChange('divisions', selected)}
        />
        <Filter
          label="Job Function"
          options={filters.jobFunctions}
          onChange={(selected) => onFilterChange('functions', selected)}
        />
        <Filter
          label="Level"
          options={filters.employeeLevels}
          onChange={(selected) => onFilterChange('level', selected)}
        />
        <Filter
          label="Type"
          options={filters.employmentTypes}
          onChange={(selected) => onFilterChange('type', selected)}
        />
        <Filter
          label="Posted"
          options={filters.postingDates}
          onChange={(selected) => onFilterChange('posted', selected)}
        />

        {/* TODO: clear filters */}
      </div>
    </div>
  );
}
