import React from 'react';
import { Award, Download } from 'lucide-react';
import './Education.css';

export const Certificates = ({ certificates, platforms }) => {
  return (
    <div className="certificates-section">
      <h5>Certificates Earned</h5>
      <div className="certificates-grid">
        {certificates.map(certId => {
          const platform = platforms.find(p => p.id === certId);
          return platform ? (
            <div key={certId} className="certificate-card">
              <Award size={32} />
              <h6>{platform.name}</h6>
              <p>{platform.provider}</p>
              <button onClick={() => window.open('#', '_blank')}>
                <Download size={16} />
                Download Certificate
              </button>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};