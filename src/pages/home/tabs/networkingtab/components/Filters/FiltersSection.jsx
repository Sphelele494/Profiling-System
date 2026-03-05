import React from 'react';
import { FilterGroup } from './FilterGroup';
import { ResetFiltersButton } from './ResetFiltersButton';
import { industries, locations, salaryRanges, availabilityOptions, jobTypes } from "../utils/constants";
import './Filters.css';

export const FiltersSection = ({ filters, onFilterChange, onReset }) => {
  return (
    <div className="filters-section">
      <div className="filters-grid">
        <FilterGroup
          label="Industry"
          icon="Filter"
          value={filters.industry}
          options={industries}
          onChange={(value) => onFilterChange('industry', value)}
        />
        
        <FilterGroup
          label="Location"
          icon="MapPin"
          value={filters.location}
          options={locations}
          onChange={(value) => onFilterChange('location', value)}
        />
        
        <FilterGroup
          label="Salary Range"
          icon="salary"
          value={filters.salaryRange}
          options={salaryRanges}
          onChange={(value) => onFilterChange('salaryRange', value)}
        />
        
        <FilterGroup
          label="Availability"
          icon="Calendar"
          value={filters.availability}
          options={availabilityOptions}
          onChange={(value) => onFilterChange('availability', value)}
        />
        
        <FilterGroup
          label="Job Type"
          icon="Briefcase"
          value={filters.jobType}
          options={jobTypes}
          onChange={(value) => onFilterChange('jobType', value)}
        />
        
        <ResetFiltersButton onReset={onReset} />
      </div>
    </div>
  );
};