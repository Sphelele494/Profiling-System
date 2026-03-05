import { useState } from 'react';
import { mockJobs, jobCategories } from '../components/utils/mockData';

export function useJobs() {
  const [jobs] = useState(mockJobs);

  const getJobsByCategory = (jobsList) => {
    return {
      job: jobsList.filter(job => job.category === "job"),
      learnership: jobsList.filter(job => job.category === "learnership"),
      volunteer: jobsList.filter(job => job.category === "volunteer"),
      internship: jobsList.filter(job => job.category === "internship")
    };
  };

  return {
    jobs,
    jobCategories,
    getJobsByCategory
  };
}