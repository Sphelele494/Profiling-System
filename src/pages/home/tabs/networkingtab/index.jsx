// src/pages/home/tabs/networkingtab/NetworkingTab.jsx
import React from 'react';
import { NetworkingHeader } from './components/Header/NetworkingHeader';           // Removed {}
import { FiltersSection } from './components/Filters/FiltersSection';            // Removed {}
import CategoryTabs from './components/Categories/CategoryTabs';               // Removed {}
import { JobsSection }from './components/Jobs/JobsSection';                       // Removed {}
import { NetworkingTips } from './components/Tips/NetworkingTips';   
import { ApplicationStats } from './components/Stats/StatCard'; // Updated import
import { useFilters } from './hooks/useFilters';
import { useJobs } from './hooks/useJobs';
import { useCategories } from './hooks/useCategories';
import { useApplications } from './hooks/useApplications';
import './components/styles/networking.css';

function NetworkingTab({ user, jobsApplied = [], setJobsApplied }) {
  const { filters, updateFilter, resetFilters } = useFilters();
  const { jobs, jobCategories } = useJobs(); // Removed 'categories' if not used
  const { activeCategory, setActiveCategory, getJobsByCategory } = useCategories();
  const { handleApplyForJob } = useApplications({ jobsApplied, setJobsApplied });

  // Filter jobs based on current filters
  const filteredJobs = jobs.filter(job => {
    if (filters.industry !== "All Industries" && job.industry !== filters.industry) return false;
    if (filters.location !== "All Locations" && !job.location.includes(filters.location)) return false;
    if (filters.jobType !== "All Types" && job.type !== filters.jobType) return false;
    if (activeCategory !== "All" && job.category !== activeCategory) return false;
    return true;
  });

  // Jobs grouped by category
  const jobsByCategory = getJobsByCategory(filteredJobs);

  return (
    <div className="networking-tab">
      <NetworkingHeader />
      
      <FiltersSection
        filters={filters}
        onFilterChange={updateFilter}
        onReset={resetFilters}
      />

      <CategoryTabs
        categories={jobCategories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        jobCounts={{
          All: filteredJobs.length,
          job: jobsByCategory.job.length,
          learnership: jobsByCategory.learnership.length,
          volunteer: jobsByCategory.volunteer.length,
          internship: jobsByCategory.internship.length
        }}
      />

      <JobsSection
        jobs={filteredJobs}
        activeCategory={activeCategory}
        onApply={handleApplyForJob}
      />

      <NetworkingTips />
      
      {/* This now uses the StatCard component */}
      <ApplicationStats
        applicationsSent={jobsApplied.length}
        interviewsScheduled={3}
        jobOffers={1}
      />
    </div>
  );
}

export default NetworkingTab;