import React from 'react';
import { StatCard } from './StatCard';
import { Send, Clock, CheckCircle2 } from 'lucide-react';
import './Stats.css';

export const ApplicationStats = ({ applicationsSent, interviewsScheduled, jobOffers }) => {
  return (
    <div className="application-stats">
      <StatCard
        icon={Send}
        number={applicationsSent}
        label="Applications Sent"
        color="#10b981"
      />
      <StatCard
        icon={Clock}
        number={interviewsScheduled}
        label="Interviews Scheduled"
        color="#f59e0b"
      />
      <StatCard
        icon={CheckCircle2}
        number={jobOffers}
        label="Job Offers"
        color="#3b82f6"
      />
    </div>
  );
};