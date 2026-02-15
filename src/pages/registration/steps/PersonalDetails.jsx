import React from 'react';
import { 
  User, Mail, Phone, MapPin, Fingerprint, Home, Lock, Eye, EyeOff,
  CheckCircle 
} from 'lucide-react';
import PasswordStrength from '../components/PasswordStrength';

const PersonalDetails = ({
  formData,
  formErrors,
  validFields,
  fieldFocus,
  showPassword,
  passwordStrength,
  saProvinces,
  handleChange,
  setShowPassword,
  setFieldFocus,
  getIconGlowClass
}) => {
  return (
    <div className="form-step fade-in">
      <div className="step-header">
        <h2 className="step-title">
          <div className="step-icon-container">
            <Fingerprint size={28} />
          </div>
          <span>Personal Information</span>
          <div className="step-pulse-indicator"></div>
        </h2>
        <p className="step-description">
          Tell us about yourself. All fields marked with * are required for DCS verification.
        </p>
      </div>
      
      <div className="form-grid">
        {/* First Name */}
        <div className="form-group">
          <label className="form-label animated-label">
            <div className={`form-icon ${getIconGlowClass('firstName')}`}>
              <User size={18} />
            </div>
            <span className="label-text">First Name *</span>
            <div className="label-underline"></div>
          </label>
          <div className="input-container">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onFocus={() => setFieldFocus(prev => ({ ...prev, firstName: true }))}
              onBlur={() => setFieldFocus(prev => ({ ...prev, firstName: false }))}
              className={`form-input ${formErrors.firstName ? 'error' : ''} ${validFields.firstName ? 'valid' : ''} ${fieldFocus.firstName ? 'focused' : ''}`}
              placeholder="e.g., Lesedi"
              required
            />
            <div className="input-border"></div>
          </div>
          {formErrors.firstName && (
            <p className="error-text">{formErrors.firstName}</p>
          )}
          {validFields.firstName && !formErrors.firstName && (
            <div className="success-indicator">
              <CheckCircle size={14} />
              <span>Valid name</span>
            </div>
          )}
        </div>
        
        {/* Last Name */}
        <div className="form-group">
          <label className="form-label animated-label">
            <div className={`form-icon ${getIconGlowClass('lastName')}`}>
              <User size={18} />
            </div>
            <span className="label-text">Last Name *</span>
            <div className="label-underline"></div>
          </label>
          <div className="input-container">
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onFocus={() => setFieldFocus(prev => ({ ...prev, lastName: true }))}
              onBlur={() => setFieldFocus(prev => ({ ...prev, lastName: false }))}
              className={`form-input ${formErrors.lastName ? 'error' : ''} ${validFields.lastName ? 'valid' : ''} ${fieldFocus.lastName ? 'focused' : ''}`}
              placeholder="e.g., Masetle"
              required
            />
            <div className="input-border"></div>
          </div>
          {formErrors.lastName && (
            <p className="error-text">{formErrors.lastName}</p>
          )}
        </div>
        
        {/* ID Number */}
        <div className="form-group">
          <label className="form-label animated-label">
            <div className={`form-icon ${getIconGlowClass('idNumber')}`}>
              <Fingerprint size={18} />
            </div>
            <span className="label-text">South African ID Number *</span>
            <div className="label-underline"></div>
          </label>
          <div className="input-container">
            <div className="input-with-icon">
              <Fingerprint className={`input-icon ${getIconGlowClass('idNumber')} ${fieldFocus.idNumber ? 'animated' : ''}`} />
              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                onFocus={() => setFieldFocus(prev => ({ ...prev, idNumber: true }))}
                onBlur={() => setFieldFocus(prev => ({ ...prev, idNumber: false }))}
                className={`form-input ${formErrors.idNumber ? 'error' : ''} ${validFields.idNumber ? 'valid' : ''} ${fieldFocus.idNumber ? 'focused' : ''}`}
                placeholder="e.g., 9001015000089"
                required
              />
            </div>
            <div className="input-border"></div>
          </div>
          {formErrors.idNumber && (
            <p className="error-text">{formErrors.idNumber}</p>
          )}
          {validFields.idNumber && !formErrors.idNumber && (
            <div className="success-indicator">
              <CheckCircle size={14} />
              <span>Valid ID format</span>
            </div>
          )}
          <p className="input-hint">13-digit South African ID number</p>
        </div>
        
        {/* Email */}
        <div className="form-group">
          <label className="form-label animated-label">
            <div className={`form-icon ${getIconGlowClass('email')}`}>
              <Mail size={18} />
            </div>
            <span className="label-text">Email Address *</span>
            <div className="label-underline"></div>
          </label>
          <div className="input-container">
            <div className="input-with-icon">
              <Mail className={`input-icon ${getIconGlowClass('email')} ${fieldFocus.email ? 'animated' : ''}`} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFieldFocus(prev => ({ ...prev, email: true }))}
                onBlur={() => setFieldFocus(prev => ({ ...prev, email: false }))}
                className={`form-input ${formErrors.email ? 'error' : ''} ${validFields.email ? 'valid' : ''} ${fieldFocus.email ? 'focused' : ''}`}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="input-border"></div>
          </div>
          {formErrors.email && (
            <p className="error-text">{formErrors.email}</p>
          )}
          {validFields.email && !formErrors.email && (
            <div className="success-indicator">
              <CheckCircle size={14} />
              <span>Valid email format</span>
            </div>
          )}
        </div>
        
        {/* Phone */}
        <div className="form-group">
          <label className="form-label animated-label">
            <div className={`form-icon ${getIconGlowClass('phone')}`}>
              <Phone size={18} />
            </div>
            <span className="label-text">Phone Number *</span>
            <div className="label-underline"></div>
          </label>
          <div className="input-container">
            <div className="input-with-icon">
              <Phone className={`input-icon ${getIconGlowClass('phone')} ${fieldFocus.phone ? 'animated' : ''}`} />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => setFieldFocus(prev => ({ ...prev, phone: true }))}
                onBlur={() => setFieldFocus(prev => ({ ...prev, phone: false }))}
                className={`form-input ${formErrors.phone ? 'error' : ''} ${validFields.phone ? 'valid' : ''} ${fieldFocus.phone ? 'focused' : ''}`}
                placeholder="e.g., 072 123 4567"
                required
              />
            </div>
            <div className="input-border"></div>
          </div>
          {formErrors.phone && (
            <p className="error-text">{formErrors.phone}</p>
          )}
          {validFields.phone && !formErrors.phone && (
            <div className="success-indicator">
              <CheckCircle size={14} />
              <span>Valid SA number</span>
            </div>
          )}
          <p className="input-hint">South African mobile number starting with 07 or +27</p>
        </div>
        
        {/* Province */}
        <div className="form-group">
          <label className="form-label animated-label">
            <div className={`form-icon ${getIconGlowClass('province')}`}>
              <MapPin size={18} />
            </div>
            <span className="label-text">Province *</span>
            <div className="label-underline"></div>
          </label>
          <div className="select-container">
            <select
              name="province"
              value={formData.province}
              onChange={handleChange}
              onFocus={() => setFieldFocus(prev => ({ ...prev, province: true }))}
              onBlur={() => setFieldFocus(prev => ({ ...prev, province: false }))}
              className={`form-select ${formErrors.province ? 'error' : ''} ${formData.province ? 'valid' : ''} ${fieldFocus.province ? 'focused' : ''}`}
              required
            >
              <option value="">Select your province</option>
              {saProvinces.map(province => (
                <option key={province} value={province}>{province}</option>
              ))}
            </select>
            <div className="select-border"></div>
            <div className="select-arrow"></div>
          </div>
          {formErrors.province && (
            <p className="error-text">{formErrors.province}</p>
          )}
        </div>
      </div>
      
      {/* Address */}
      <div className="form-group full-width">
        <label className="form-label animated-label">
          <div className="form-icon">
            <Home size={18} />
          </div>
          <span className="label-text">Residential Address</span>
          <div className="label-underline"></div>
        </label>
        <div className="input-container">
          <div className="input-with-icon">
            <Home className="input-icon" />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-input"
              placeholder="Street, City, Postal Code"
            />
          </div>
          <div className="input-border"></div>
        </div>
        <p className="input-hint">Help employers know your location for job opportunities</p>
      </div>

      {/* Password Section */}
      <div className="password-section">
        <div className="form-group">
          <label className="form-label animated-label">
            <div className={`form-icon ${getIconGlowClass('password')}`}>
              <Lock size={18} />
            </div>
            <span className="label-text">Create Password *</span>
            <div className="label-underline"></div>
          </label>
          <div className="input-container">
            <div className="input-with-icon">
              <Lock className={`input-icon ${getIconGlowClass('password')} ${fieldFocus.password ? 'animated' : ''}`} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setFieldFocus(prev => ({ ...prev, password: true }))}
                onBlur={() => setFieldFocus(prev => ({ ...prev, password: false }))}
                className={`form-input ${formErrors.password ? 'error' : ''} ${validFields.password ? 'valid' : ''} ${fieldFocus.password ? 'focused' : ''}`}
                placeholder="Minimum 8 characters"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="input-border"></div>
          </div>
          
          <PasswordStrength 
            password={formData.password} 
            strength={passwordStrength} 
          />
          
          {formErrors.password && (
            <p className="error-text">{formErrors.password}</p>
          )}
        </div>
        
        <div className="form-group">
          <label className="form-label animated-label">
            <div className="form-icon">
              <Lock size={18} />
            </div>
            <span className="label-text">Confirm Password *</span>
            <div className="label-underline"></div>
          </label>
          <div className="input-container">
            <div className="input-with-icon">
              <Lock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`form-input ${formErrors.confirmPassword ? 'error' : ''} ${formData.confirmPassword === formData.password && formData.password ? 'valid' : ''}`}
                placeholder="Confirm your password"
                required
              />
            </div>
            <div className="input-border"></div>
          </div>
          {formErrors.confirmPassword && (
            <p className="error-text">{formErrors.confirmPassword}</p>
          )}
          {formData.confirmPassword && formData.confirmPassword === formData.password && (
            <div className="success-indicator">
              <CheckCircle size={14} />
              <span>Passwords match</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;