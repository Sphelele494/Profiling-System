export function useApplications({ jobsApplied, setJobsApplied }) {
  const handleApplyForJob = (job) => {
    // Check if already applied
    if (jobsApplied.some(app => app.title === job.title && app.company === job.company)) {
      alert(`You've already applied for ${job.title} at ${job.company}.`);
      return false;
    }
    
    // Create new application
    const newApplication = {
      id: jobsApplied.length + 1,
      title: job.title,
      company: job.company,
      date: new Date().toLocaleDateString('en-ZA'),
      status: "applied"
    };
    
    // Update state
    setJobsApplied([newApplication, ...jobsApplied]);
    
    // Show success message
    alert(`✅ Application submitted for ${job.title} at ${job.company}\nYou will be contacted by the employer within 48 hours.\nCheck your Applications in the Overview tab.`);
    
    return true;
  };

  return {
    handleApplyForJob
  };
}