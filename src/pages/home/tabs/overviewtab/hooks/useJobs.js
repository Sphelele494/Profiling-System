import { useLocalStorage } from './useLocalStorage';

export function useJobs(setSuccessMessage) {
  const [jobsApplied, setJobsApplied] = useLocalStorage('relink_jobsApplied', [
    { id: 1, title: "Construction Supervisor", company: "BuildRight", date: "2024-02-10", status: "review", salary: "R15,000 - R20,000", location: "Soweto", type: "Full-time", appliedDate: "2024-02-10", lastUpdate: "2024-02-12" },
    { id: 2, title: "Warehouse Assistant", company: "Unitrans Logistics", date: "2024-02-08", status: "interview", salary: "R8,000 - R12,000", location: "Johannesburg", type: "Full-time", appliedDate: "2024-02-08", lastUpdate: "2024-02-14" },
    { id: 3, title: "Customer Service", company: "Vodacom", date: "2024-02-05", status: "applied", salary: "R10,000 - R14,000", location: "Midrand", type: "Permanent", appliedDate: "2024-02-05", lastUpdate: "2024-02-05" },
    { id: 4, title: "Driver", company: "Bidvest Steiner", date: "2024-02-03", status: "rejected", salary: "R9,000 - R13,000", location: "Germiston", type: "Contract", appliedDate: "2024-02-03", lastUpdate: "2024-02-07" },
    { id: 5, title: "Retail Assistant", company: "Shoprite", date: "2024-02-01", status: "accepted", salary: "R7,500 - R10,000", location: "Soweto", type: "Part-time", appliedDate: "2024-02-01", lastUpdate: "2024-02-09" }
  ]);

  const handleWithdrawApplication = (id) => {
    if (window.confirm('Withdraw this application?')) {
      setJobsApplied(jobsApplied.filter(job => job.id !== id));
      setSuccessMessage({ text: 'Application withdrawn', type: 'success' });
    }
  };

  const handleSaveJob = (job) => {
    setSuccessMessage({ text: 'Job saved to bookmarks', type: 'success' });
  };

  const handleShareJob = (job) => {
    navigator.clipboard.writeText(`Check out this job: ${job.title} at ${job.company}`);
    setSuccessMessage({ text: 'Job link copied to clipboard', type: 'success' });
  };

  return {
    jobsApplied,
    handleWithdrawApplication,
    handleSaveJob,
    handleShareJob
  };
}