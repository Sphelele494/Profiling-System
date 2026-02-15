import React from 'react';
import { ShieldCheck, Building, Calendar, FileText, User, Clock } from 'lucide-react';

const Rehabilitation = ({
  formData,
  formErrors,
  saFacilities,
  handleChange,
  setFieldFocus,
  fieldFocus
}) => {
  return (
    <div className="form-step fade-in">
      <div className="step-header">
        <h2 className="step-title">
          <div className="step-icon-container">
            <ShieldCheck size={28} />
          </div>
          <span>Rehabilitation Journey</span>
        </h2>
        <p className="step-description">
          This information helps verify your rehabilitation progress with DCS officers and builds employer trust
        </p>
      </div>
      
      <div className="form-grid">
        {/* Correctional Facility */}
        <div className="form-group">
          <label className="form-label animated-label">
            <div className="form-icon">
              <Building size={18} />
            </div>
            <span className="label-text">Correctional Facility *</span>
            <div className="label-underline"></div>
          </label>
          <div className="select-container">
            <select
              name="facility"
              value={formData.facility}
              onChange={handleChange}
              onFocus={() => setFieldFocus(prev => ({ ...prev, facility: true }))}
              onBlur={() => setFieldFocus(prev => ({ ...prev, facility: false }))}
              className={`form-select ${formErrors.facility ? 'error' : ''} ${formData.facility ? 'valid' : ''}`}
              required
            >
              <option value="">Select your facility</option>
              {saFacilities.map(facility => (
                <option key={facility} value={facility}>{facility}</option>
              ))}
            </select>
            <div className="select-border"></div>
            <div className="select-arrow"></div>
          </div>
          {formErrors.facility && (
            <p className="error-text">{formErrors.facility}</p>
          )}
        </div>
        
        {/* Release Date */}
        <div className="form-group">
          <label className="form-label animated-label">
            <div className="form-icon">
              <Calendar size={18} />
            </div>
            <span className="label-text">Expected Release Date *</span>
            <div className="label-underline"></div>
          </label>
          <div className="input-container">
            <div className="input-with-icon">
              <Calendar className="input-icon" />
              <input
                type="date"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleChange}
                onFocus={() => setFieldFocus(prev => ({ ...prev, releaseDate: true }))}
                onBlur={() => setFieldFocus(prev => ({ ...prev, releaseDate: false }))}
                className={`form-input ${formErrors.releaseDate ? 'error' : ''} ${formData.releaseDate ? 'valid' : ''}`}
                required
              />
            </div>
            <div className="input-border"></div>
          </div>
          {formErrors.releaseDate && (
            <p className="error-text">{formErrors.releaseDate}</p>
          )}
        </div>
        
        {/* Sentence Duration */}
        <div className="form-group">
          <label className="form-label animated-label">
            <div className="form-icon">
              <Clock size={18} />
            </div>
            <span className="label-text">Sentence Duration</span>
            <div className="label-underline"></div>
          </label>
          <div className="input-container">
            <div className="input-with-icon">
              <Clock className="input-icon" />
              <input
                type="text"
                name="sentenceDuration"
                value={formData.sentenceDuration}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., 5 years"
              />
            </div>
            <div className="input-border"></div>
          </div>
        </div>
        
        {/* Behavior Level */}
        <div className="form-group">
          <label className="form-label animated-label">
            <div className="form-icon">
              <ShieldCheck size={18} />
            </div>
            <span className="label-text">Behavior Level</span>
            <div className="label-underline"></div>
          </label>
          <div className="select-container">
            <select
              name="behaviorLevel"
              value={formData.behaviorLevel}
              onChange={handleChange}
              className="form-select"
            >
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Satisfactory">Satisfactory</option>
              <option value="Needs Improvement">Needs Improvement</option>
            </select>
            <div className="select-border"></div>
            <div className="select-arrow"></div>
          </div>
        </div>
        
        {/* Case Number */}
        <div className="form-group">
          <label className="form-label animated-label">
            <div className="form-icon">
              <FileText size={18} />
            </div>
            <span className="label-text">Case Number</span>
            <div className="label-underline"></div>
          </label>
          <div className="input-container">
            <div className="input-with-icon">
              <FileText className="input-icon" />
              <input
                type="text"
                name="caseNumber"
                value={formData.caseNumber}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., DCS-2024-001"
              />
            </div>
            <div className="input-border"></div>
          </div>
          <p className="input-hint">For verification purposes</p>
        </div>
        
        {/* Parole Officer */}
        <div className="form-group">
          <label className="form-label animated-label">
            <div className="form-icon">
              <User size={18} />
            </div>
            <span className="label-text">Parole Officer Name</span>
            <div className="label-underline"></div>
          </label>
          <div className="input-container">
            <div className="input-with-icon">
              <User className="input-icon" />
              <input
                type="text"
                name="paroleOfficer"
                value={formData.paroleOfficer}
                onChange={handleChange}
                className="form-input"
                placeholder="Full name"
              />
            </div>
            <div className="input-border"></div>
          </div>
        </div>
        
        {/* Parole End Date */}
        <div className="form-group">
          <label className="form-label animated-label">
            <div className="form-icon">
              <Calendar size={18} />
            </div>
            <span className="label-text">Parole End Date</span>
            <div className="label-underline"></div>
          </label>
          <div className="input-container">
            <div className="input-with-icon">
              <Calendar className="input-icon" />
              <input
                type="date"
                name="paroleEndDate"
                value={formData.paroleEndDate}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="input-border"></div>
          </div>
        </div>
      </div>
      
      {/* Rehabilitation Programs */}
      <div className="form-group full-width">
        <label className="form-label animated-label">
          <div className="form-icon">
            <ShieldCheck size={18} />
          </div>
          <span className="label-text">Rehabilitation Programs Completed</span>
          <div className="label-underline"></div>
        </label>
        <div className="input-container">
          <textarea
            name="rehabilitationPrograms"
            value={formData.rehabilitationPrograms}
            onChange={handleChange}
            className="form-input"
            rows="3"
            placeholder="e.g., Anger Management, Substance Abuse Program, Skills Development"
          ></textarea>
          <div className="input-border"></div>
        </div>
        <p className="input-hint">List any programs you've completed during your rehabilitation</p>
      </div>
    </div>
  );
};

export default Rehabilitation;