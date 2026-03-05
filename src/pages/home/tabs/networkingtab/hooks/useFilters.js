import { useState } from 'react';

export function useFilters() {
  const [filters, setFilters] = useState({
    industry: "All Industries",
    location: "All Locations",
    salaryRange: "All Ranges",
    availability: "All",
    jobType: "All Types"
  });

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      industry: "All Industries",
      location: "All Locations",
      salaryRange: "All Ranges",
      availability: "All",
      jobType: "All Types"
    });
  };

  return {
    filters,
    updateFilter,
    resetFilters
  };
}