import React from 'react';
import Input from '@/shared/components/ui/Input';
import Button from '@/shared/components/ui/Button';
import { Search } from 'lucide-react';

interface JobSearchProps {
  onSearch: (query: string, location: string) => void;
}

export default function JobSearch({ onSearch }: JobSearchProps) {
  const [query, setQuery] = React.useState('');
  const [location, setLocation] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() === '' && location.trim() === '') return; // Prevent empty search
    onSearch(query, location);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-baseline-last gap-3 p-4 border border-gray-200 mb-8">
      <Input
        label="FIND JOBS"
        id="jobSearch"
        name="jobSearch"
        placeholder="Job title, skill, keyword"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1"
        inputClassName="py-2.5"
        labelClassName="text-xs font-medium text-foreground/70"
      />
      <Input
        label="NEAR LOCATION"
        id="location"
        name="location"
        placeholder="City, state, country"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="flex-1"
        inputClassName="py-2.5"
        labelClassName="text-xs font-medium text-foreground/70"
      />

      <Button
        type="submit"
        variant="primary"
        className="py-3 flex items-center justify-center gap-2 montserrat font-semibold"
      >
        <Search size={16} className="text-background" />
        {/* <span className="hidden sm:inline">Search</span> */}
      </Button>
    </form>
  );
}
