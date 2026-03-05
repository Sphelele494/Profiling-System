export const filterJobs = (jobs, filters, activeCategory) => {
  return jobs.filter(job => {
    if (filters.industry !== "All Industries" && job.industry !== filters.industry) return false;
    if (filters.location !== "All Locations" && !job.location.includes(filters.location)) return false;
    if (filters.jobType !== "All Types" && job.type !== filters.jobType) return false;
    if (activeCategory !== "All" && job.category !== activeCategory) return false;
    return true;
  });
};

export const groupJobsByCategory = (jobs) => {
  return {
    job: jobs.filter(job => job.category === "job"),
    learnership: jobs.filter(job => job.category === "learnership"),
    volunteer: jobs.filter(job => job.category === "volunteer"),
    internship: jobs.filter(job => job.category === "internship")
  };
};