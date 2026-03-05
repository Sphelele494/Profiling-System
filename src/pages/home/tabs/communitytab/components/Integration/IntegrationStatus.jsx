import React from 'react';
import { Shield, Users, CreditCard, RefreshCw, ShieldCheck, Clock, Calendar } from 'lucide-react';
import './Integration.css';

export const IntegrationStatus = ({
  sapsStatus,
  dcsStatus,
  bankStatus,
  onCheckSAPS,
  onCheckDCS,
  onVerifyBank,
  isLoading
}) => {
  return (
    <div className="integration-card">
      <div className="card-header">
        <h4>
          <Shield size={20} />
          Verification Status
        </h4>
        <button onClick={() => {
          onCheckSAPS();
          onCheckDCS();
          onVerifyBank();
        }}>
          <RefreshCw size={16} className={isLoading ? 'spinning' : ''} />
        </button>
      </div>

      <div className="integration-list">
        {/* SAPS */}
        <div className="integration-item">
          <div className="integration-header">
            <div className="integration-icon">
              <ShieldCheck size={16} />
              <span>SAPS Clearance</span>
            </div>
            <span className={`status-badge ${sapsStatus.clearanceValid ? 'verified' : 'pending'}`}>
              {sapsStatus.clearanceValid ? 'Verified' : 'Pending'}
            </span>
          </div>
          <div className="integration-details">
            <div className="detail-row">
              <span className="label">Number:</span>
              <span className="value">{sapsStatus.clearanceNumber}</span>
            </div>
            <div className="detail-row">
              <span className="label">
                <Clock size={12} />
                Last Check:
              </span>
              <span className="value">{sapsStatus.lastCheck}</span>
            </div>
            <div className="detail-row">
              <span className="label">
                <Calendar size={12} />
                Renewal:
              </span>
              <span className="value">{sapsStatus.nextRenewal}</span>
            </div>
          </div>
        </div>

        {/* DCS */}
        <div className="integration-item">
          <div className="integration-header">
            <div className="integration-icon">
              <Users size={16} />
              <span>DCS Status</span>
            </div>
            <span className={`status-badge ${dcsStatus.status}`}>
              {dcsStatus.status}
            </span>
          </div>
          <div className="integration-details">
            <div className="detail-row">
              <span className="label">Offender #:</span>
              <span className="value">{dcsStatus.offenderNumber}</span>
            </div>
            <div className="detail-row">
              <span className="label">Officer:</span>
              <span className="value">{dcsStatus.paroleOfficer}</span>
            </div>
            <div className="detail-row">
              <span className="label">Next Meeting:</span>
              <span className="value">{dcsStatus.nextMeeting}</span>
            </div>
            <div className="detail-row">
              <span className="label">Compliance:</span>
              <div className="compliance-bar">
                <div style={{ width: `${dcsStatus.compliance}%` }}></div>
                <span>{dcsStatus.compliance}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bank */}
        <div className="integration-item">
          <div className="integration-header">
            <div className="integration-icon">
              <CreditCard size={16} />
              <span>Bank Verification</span>
            </div>
            <span className={`status-badge ${bankStatus.verified ? 'verified' : 'pending'}`}>
              {bankStatus.verified ? 'Verified' : 'Pending'}
            </span>
          </div>
          <div className="integration-details">
            <div className="detail-row">
              <span className="label">Bank:</span>
              <span className="value">{bankStatus.bank}</span>
            </div>
            <div className="detail-row">
              <span className="label">Account Type:</span>
              <span className="value">{bankStatus.accountType}</span>
            </div>
            <div className="detail-row">
              <span className="label">Verified:</span>
              <span className="value">{bankStatus.verifiedDate}</span>
            </div>
            <div className="detail-row">
              <span className="label">Salary Payments:</span>
              <span className={`value ${bankStatus.salaryPayments ? 'active' : 'inactive'}`}>
                {bankStatus.salaryPayments ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};