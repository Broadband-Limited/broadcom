"use client"

import Button from '@/shared/components/ui/Button';
import Input from '@/shared/components/ui/Input';
import { Search, ChevronDown } from 'lucide-react';
import { FC } from 'react';
import { useState, useRef, useEffect } from 'react';

const JobSearch: FC = () => {
  // Dropdown open states and selections
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const locRef = useRef<HTMLDivElement>(null);
  const deptRef = useRef<HTMLDivElement>(null);
  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locRef.current && !locRef.current.contains(event.target as Node)) {
        setIsLocationOpen(false);
      }
      if (deptRef.current && !deptRef.current.contains(event.target as Node)) {
        setIsDepartmentOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <div className="w-full flex items-end gap-4 p-2">
        <Input
          label="Find Jobs"
          name="job-search"
          placeholder="Search jobs by title"
          className="w-full !m-0"
        />
        <Button className="h-fit aspect-square">
          <Search size={16} />
        </Button>
      </div>

      {/* Filter controls */}
      <div className="w-full grid grid-cols-3 gap-4 p-2">
        <div className="flex flex-col w-full relative" ref={locRef}>
          <button
            type="button"
            className="w-full p-3 border border-foreground/10 focus:outline-none flex items-center justify-between"
            onClick={() => setIsLocationOpen(open => !open)}>
            <span>
              Location{selectedLocations.length > 0 ? ` (${selectedLocations.length})` : ''}
            </span>
            <ChevronDown size={16} />
          </button>
          {isLocationOpen && (
            <div className="mt-1 space-y-1 bg-background border border-foreground/10 p-2">
              <Input type="checkbox" label="Remote" name="location-remote" className="m-0" inputClassName="p-0"
                checked={selectedLocations.includes('remote')}
                onChange={() => {
                  setSelectedLocations(prev => prev.includes('remote') ? prev.filter(v => v!=='remote') : [...prev, 'remote']);
                }} />
              <Input type="checkbox" label="New York" name="location-new-york" className="m-0" inputClassName="p-0"
                checked={selectedLocations.includes('new-york')}
                onChange={() => {
                  setSelectedLocations(prev => prev.includes('new-york') ? prev.filter(v => v!=='new-york') : [...prev, 'new-york']);
                }} />
              <Input type="checkbox" label="San Francisco" name="location-san-francisco" className="m-0" inputClassName="p-0"
                checked={selectedLocations.includes('san-francisco')}
                onChange={() => {
                  setSelectedLocations(prev => prev.includes('san-francisco') ? prev.filter(v => v!=='san-francisco') : [...prev, 'san-francisco']);
                }} />
            </div>
          )}
        </div>
          
        <div className="flex flex-col w-full relative" ref={deptRef}>
          <button
            type="button"
            className="w-full p-3 border border-foreground/10 focus:outline-none flex items-center justify-between"
            onClick={() => setIsDepartmentOpen(open => !open)}>
            <span>
              Department{selectedDepartments.length > 0 ? ` (${selectedDepartments.length})` : ''}
            </span>
            <ChevronDown size={16} />
          </button>
          {isDepartmentOpen && (
            <div className="mt-1 space-y-1 bg-background border border-foreground/10 p-2">
              <Input type="checkbox" label="Engineering" name="dept-engineering" className="m-0" inputClassName="p-0"
                checked={selectedDepartments.includes('engineering')}
                onChange={() => {
                  setSelectedDepartments(prev => prev.includes('engineering') ? prev.filter(v => v!=='engineering') : [...prev, 'engineering']);
                }} />
              <Input type="checkbox" label="Marketing" name="dept-marketing" className="m-0" inputClassName="p-0"
                checked={selectedDepartments.includes('marketing')}
                onChange={() => {
                  setSelectedDepartments(prev => prev.includes('marketing') ? prev.filter(v => v!=='marketing') : [...prev, 'marketing']);
                }} />
              <Input type="checkbox" label="Design" name="dept-design" className="m-0" inputClassName="p-0"
                checked={selectedDepartments.includes('design')}
                onChange={() => {
                  setSelectedDepartments(prev => prev.includes('design') ? prev.filter(v => v!=='design') : [...prev, 'design']);
                }} />
            </div>
          )}
        </div>
        <div className="flex flex-col w-full">
          <select
            id="date-filter"
            name="posting-period"
            className="w-full p-3 border border-foreground/10 focus:outline-none focus:border-foreground/50 transition-all duration-300">
            <option value="">Anytime</option>
            <option value="4">Less than 4 days</option>
            <option value="7">Less than 7 days</option>
            <option value="14">Less than 14 days</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default JobSearch;
