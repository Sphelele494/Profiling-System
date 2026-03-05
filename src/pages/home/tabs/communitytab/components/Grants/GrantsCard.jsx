import React from 'react';
import { DollarSign, Shield, Calendar, ExternalLink, Clock } from 'lucide-react';
import './Grants.css';

export const GrantsCard = ({ grants, onCheckEligibility, onApply, onClose }) => {
  return (
    <div className="grants-card">
      <div className="card-header">
        <h4>
          <DollarSign size={20} />
          Government Grants
        </h4>
        <button onClick={onClose}>
          <ExternalLink size={16} />
        </button>
      </div>

      <div className="grants-list">
        {grants.map(grant => {
          const isEligible = onCheckEligibility(grant);
          return (
            <div key={grant.id} className="grant-item">
              <div className="grant-header">
                <h5>{grant.name}</h5>
                <span className="grant-amount">{grant.amount}</span>
              </div>
              <p className="grant-description">{grant.description}</p>
              <div className="grant-details">
                <div className="grant-eligibility">
                  <Shield size={12} />
                  {isEligible ? (
                    <span className="eligible">✓ You may be eligible</span>
                  ) : (
                    <span className="ineligible">Check requirements</span>
                  )}
                </div>
                <div className="grant-deadline">
                  <Calendar size={12} />
                  <span>Deadline: {new Date(grant.deadline).toLocaleDateString('en-ZA')}</span>
                </div>
                <div className={`grant-probability ${grant.probability}`}>
                  {grant.probability} chance
                </div>
              </div>
              <div className="grant-documents">
                <span className="doc-label">Required docs:</span>
                <div className="doc-tags">
                  {grant.documents.map((doc, idx) => (
                    <span key={idx} className="doc-tag">{doc}</span>
                  ))}
                </div>
              </div>
              <button
                className="apply-grant-btn"
                onClick={() => onApply(grant)}
                disabled={!isEligible}
              >
                Apply Now
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};