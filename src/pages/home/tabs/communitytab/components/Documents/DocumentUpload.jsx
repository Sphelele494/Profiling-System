import React from 'react';
import { UploadCloud, Briefcase, HandHeart, Shield, Users, Heart, GraduationCap, ShieldCheck } from 'lucide-react';
import './Documents.css';

const iconMap = {
  Briefcase, HandHeart, Shield, Users, Heart, GraduationCap, ShieldCheck
};

export const DocumentUpload = ({
  referralTypes,
  selectedType,
  onSelectType,
  onUpload,
  uploadingFile,
  uploadProgress,
  fileInputRef
}) => {
  return (
    <div className="upload-card">
      <div className="card-header">
        <h4>
          <UploadCloud size={20} />
          Upload Document
        </h4>
      </div>

      <div className="upload-content">
        <div className="referral-types">
          {referralTypes.map(type => {
            const Icon = iconMap[type.icon] || UploadCloud;
            return (
              <div
                key={type.id}
                className={`type-chip ${selectedType === type.id ? 'selected' : ''}`}
                onClick={() => onSelectType(type.id)}
              >
                <Icon size={16} />
                <span>{type.label}</span>
                <span className="points">+{type.points}</span>
              </div>
            );
          })}
        </div>

        <div
          className="upload-area"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file) {
              onUpload({ target: { files: [file] } });
            }
          }}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={onUpload}
            accept=".pdf,.jpg,.jpeg,.png"
            style={{ display: 'none' }}
          />
          <UploadCloud size={48} />
          <p>Drag & drop or click to upload</p>
          <span>PDF, JPG, PNG (Max 10MB)</span>

          {uploadingFile && (
            <div className="upload-progress">
              <div className="progress-bar">
                <div style={{ width: `${uploadProgress}%` }}></div>
              </div>
              <span>{uploadProgress}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};