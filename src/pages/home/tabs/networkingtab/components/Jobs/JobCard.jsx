import React from 'react';
import { UrgentBadge } from './UrgentBadge';
import { JobHeader } from './JobHeader';
import { JobDetails } from './JobDetails';
import { JobSkills } from './JobSkills';
import { JobBenefits } from './JobBenefits';
import { JobFooter } from './JobFooter';
import './Jobs.css';

export const JobCard = ({ job, onApply }) => {
  return (
    <div className="job-card">
      {job.urgent && <UrgentBadge />}
      
      <JobHeader job={job} />
      <JobDetails job={job} />
      <JobSkills skills={job.skills} />
      {job.benefits && <JobBenefits benefits={job.benefits} />}
      <JobFooter job={job} onApply={onApply} />
    </div>
  );
};