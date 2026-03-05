import React from 'react';
import { Briefcase, DollarSign, MapPin, Clock, Star, Send, X, Video } from 'lucide-react';
import { FilterTabs } from '../common/FilterTabs';
import { STATUS_COLORS } from '../../utils/constants';
import './JobsAppliedCard.css';

export const JobsAppliedCard = ({
  jobsApplied,
  activeFilter,
  setActiveFilter,
  getFilteredJobs,
  onWithdraw,
  onSave,
  onShare,
  showTemporaryMessage
}) => {
  return (
    <div className="dashboard-card glass-effect">
      <div className="card-header">
        <h4 className="card-title">
          <Briefcase size={20} />
          <span>Job Applications</span>
        </h4>
        <div className="card-stats">
          <span className="stat-badge success" onClick={() => showTemporaryMessage('Active applications')}>
            {jobsApplied.filter(j => j.status === 'interview' || j.status === 'review').length} Active
          </span>
          <span className="stat-badge" onClick={() => showTemporaryMessage('Total applications')}>
            {jobsApplied.length} Total
          </span>
        </div>
      </div>

      <FilterTabs
        options={['all', 'applied', 'interview', 'accepted']}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <div className="applications-list">
        {getFilteredJobs().length === 0 ? (
          <p className="no-items">No job applications found</p>
        ) : (
          getFilteredJobs().map(job => (
            <div key={job.id} className="application-item">
              <div className="application-info">
                <span className="application-title" onClick={() => showTemporaryMessage(job.title)}>
                  {job.title}
                </span>
                <span className="application-company" onClick={() => showTemporaryMessage(`Company: ${job.company}`)}>
                  {job.company}
                </span>
                <div className="application-meta">
                  <span className="application-salary" onClick={() => showTemporaryMessage(`Salary: ${job.salary}`)}>
                    <DollarSign size={10} />
                    {job.salary}
                  </span>
                  <span className="application-location" onClick={() => showTemporaryMessage(`Location: ${job.location}`)}>
                    <MapPin size={10} />
                    {job.location}
                  </span>
                  <span className="application-type" onClick={() => showTemporaryMessage(`Type: ${job.type}`)}>
                    {job.type}
                  </span>
                </div>
              </div>
              
              <div className="application-status">
                <span 
                  className="status-badge" 
                  style={{ backgroundColor: `${STATUS_COLORS[job.status]}20`, color: STATUS_COLORS[job.status] }}
                  onClick={() => showTemporaryMessage(`Status: ${job.status}`)}
                >
                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                </span>
                <span className="application-date" onClick={() => showTemporaryMessage(`Applied: ${job.appliedDate}`)}>
                  {job.appliedDate}
                </span>
                
                <div className="application-actions">
                  {job.status === 'interview' && (
                    <button 
                      className="schedule-btn"
                      onClick={() => showTemporaryMessage('Schedule interview')}
                      title="Schedule interview"
                    >
                      <Video size={12} />
                    </button>
                  )}
                  <button 
                    className="save-job-btn"
                    onClick={() => onSave(job)}
                    title="Save job"
                  >
                    <Star size={12} />
                  </button>
                  <button 
                    className="share-job-btn"
                    onClick={() => onShare(job)}
                    title="Share job"
                  >
                    <Send size={12} />
                  </button>
                  <button 
                    className="withdraw-btn"
                    onClick={() => onWithdraw(job.id)}
                    title="Withdraw application"
                  >
                    <X size={12} />
                  </button>
                </div>
              </div>

              {job.lastUpdate !== job.appliedDate && (
                <div className="application-update" onClick={() => showTemporaryMessage(`Last updated: ${job.lastUpdate}`)}>
                  <Clock size={10} />
                  <span>Updated {job.lastUpdate}</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};