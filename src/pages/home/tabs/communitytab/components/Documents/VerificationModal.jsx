import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import './Documents.css';

export const VerificationModal = ({
  document,
  verificationCode,
  onCodeChange,
  onVerify,
  onClose
}) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content small" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Verify Document</h3>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <p>Enter verification code for:</p>
          <p className="document-name">{document.name}</p>

          <input
            type="text"
            placeholder="Verification code"
            value={verificationCode}
            onChange={(e) => onCodeChange(e.target.value)}
            className="verification-input"
          />

          <div className="verification-options">
            <button
              className="verify-btn"
              onClick={onVerify}
            >
              <ShieldCheck size={16} />
              Verify
            </button>
            <button
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};