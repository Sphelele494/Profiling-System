import React from 'react';
import { 
  BadgeCheck, Search, GraduationCap, Briefcase, Map, 
  Target, Award, Check, X, Globe, DollarSign 
} from 'lucide-react';

const SkillsEducation = ({
  formData,
  formErrors,
  skillSearch,
  filteredSkills,
  saSkills,
  educationLevels,
  saLanguages,
  handleChange,
  setSkillSearch,
  handleSkillToggle,
  handleLanguageToggle
}) => {
  return (
    <div className="form-step fade-in">
      <div className="step-header">
        <h2 className="step-title">
          <div className="step-icon-container">
            <BadgeCheck size={28} />
          </div>
          <span>Skills & Qualifications</span>
        </h2>
        <p className="step-description">
          Showcase your abilities for better job matching with South African employers
        </p>
      </div>
      
      {/* Skills Section */}
      <div className="form-group full-width">
        <label className="form-label">
          <div className="form-icon">
            <Award size={18} />
          </div>
          <span className="label-text">Select Your Skills *</span>
        </label>
        
        <div className="skills-search">
          <div className="search-container">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search for skills..."
              value={skillSearch}
              onChange={(e) => setSkillSearch(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        
        <div className="skills-grid">
          {filteredSkills.map((skill, index) => (
            <div
              key={index}
              className={`skill-card ${formData.skills.includes(skill.skill) ? 'selected' : ''}`}
              onClick={() => handleSkillToggle(skill)}
            >
              <span className="skill-icon">{skill.icon}</span>
              <span className="skill-name">{skill.skill}</span>
              {formData.skills.includes(skill.skill) ? (
                <Check className="skill-check" size={16} />
              ) : (
                <X size={16} style={{ opacity: 0.3 }} />
              )}
            </div>
          ))}
        </div>
        
        {formErrors.skills && (
          <p className="error-text">{formErrors.skills}</p>
        )}
        
        <p className="skills-count">
          {formData.skills.length} skill{formData.skills.length !== 1 ? 's' : ''} selected
        </p>
      </div>
      
      {/* Certifications */}
      <div className="form-group full-width">
        <label className="form-label">
          <div className="form-icon">
            <Award size={18} />
          </div>
          <span className="label-text">Certifications & Qualifications</span>
        </label>
        <div className="input-container">
          <input
            type="text"
            name="certifications"
            value={formData.certifications}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g., NQF Level 4, Trade Test Certificate, First Aid Level 1"
          />
          <div className="input-border"></div>
        </div>
        <p className="input-hint">Separate multiple certifications with commas</p>
      </div>
      
      {/* Education Level */}
      <div className="form-group">
        <label className="form-label">
          <div className="form-icon">
            <GraduationCap size={18} />
          </div>
          <span className="label-text">Highest Education Level</span>
        </label>
        <div className="select-container">
          <select
            name="educationLevel"
            value={formData.educationLevel}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select education level</option>
            {educationLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
          <div className="select-border"></div>
          <div className="select-arrow"></div>
        </div>
      </div>
      
      {/* Languages */}
      <div className="form-group full-width">
        <label className="form-label">
          <div className="form-icon">
            <Globe size={18} />
          </div>
          <span className="label-text">Languages Spoken</span>
        </label>
        
        <div className="languages-grid">
          {saLanguages.map(lang => (
            <div
              key={lang.code}
              className={`language-tag ${formData.languages.includes(lang.name) ? 'selected' : ''}`}
              onClick={() => handleLanguageToggle(lang.name)}
            >
              <span>{lang.native}</span>
              {formData.languages.includes(lang.name) && (
                <Check className="language-check" size={14} />
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Work Experience */}
      <div className="form-group full-width">
        <label className="form-label">
          <div className="form-icon">
            <Briefcase size={18} />
          </div>
          <span className="label-text">Work Experience (if any)</span>
        </label>
        <div className="input-container">
          <textarea
            name="workExperience"
            value={formData.workExperience}
            onChange={handleChange}
            className="form-input"
            rows="3"
            placeholder="Describe your previous work experience, including any skills learned on the job"
          ></textarea>
          <div className="input-border"></div>
        </div>
      </div>
      
      {/* Additional Preferences */}
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">
            <div className="form-icon">
              <Map size={18} />
            </div>
            <span className="label-text">Willing to Relocate?</span>
          </label>
          <div className="checkbox-container">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="willingToRelocate"
                checked={formData.willingToRelocate}
                onChange={handleChange}
              />
              <span>Yes, I'm willing to relocate for work</span>
            </label>
          </div>
        </div>
        
        <div className="form-group">
          <label className="form-label">
            <div className="form-icon">
              <DollarSign size={18} />
            </div>
            <span className="label-text">Expected Salary (Monthly)</span>
          </label>
          <div className="input-container">
            <div className="input-with-icon">
              <DollarSign className="input-icon" />
              <input
                type="text"
                name="expectedSalary"
                value={formData.expectedSalary}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., R5000 - R8000"
              />
            </div>
            <div className="input-border"></div>
          </div>
        </div>
      </div>
      
      {/* Career Goals */}
      <div className="form-group full-width">
        <label className="form-label">
          <div className="form-icon">
            <Target size={18} />
          </div>
          <span className="label-text">Career Goals</span>
        </label>
        <div className="input-container">
          <textarea
            name="careerGoals"
            value={formData.careerGoals}
            onChange={handleChange}
            className="form-input"
            rows="2"
            placeholder="What are your career aspirations after release?"
          ></textarea>
          <div className="input-border"></div>
        </div>
      </div>
    </div>
  );
};

export default SkillsEducation;