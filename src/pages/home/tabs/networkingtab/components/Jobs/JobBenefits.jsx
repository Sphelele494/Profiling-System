import React from 'react';
import './Jobs.css';

export const JobBenefits = ({ benefits }) => {
  return (
    <div className="job-benefits">
      <span className="benefits-label">Benefits:</span>
      <div className="benefits-list">
        {benefits.map((benefit, index) => (
          <span key={index} className="benefit-tag">{benefit}</span>
        ))}
      </div>
    </div>
  );
};