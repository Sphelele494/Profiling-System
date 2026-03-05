import { useState } from 'react';

export function useCategories() {
  const [activeCategory, setActiveCategory] = useState('All');

  const getJobsByCategory = (jobs) => {
    return {
      job: jobs.filter(job => job.category === "job"),
      learnership: jobs.filter(job => job.category === "learnership"),
      volunteer: jobs.filter(job => job.category === "volunteer"),
      internship: jobs.filter(job => job.category === "internship")
    };
  };

  return {
    activeCategory,
    setActiveCategory,
    getJobsByCategory
  };
}