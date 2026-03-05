import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  ArrowLeft, 
  Shield, 
  CheckCircle, 
  Building2, 
  FileText, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Award,
  Users,
  Heart,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  CheckSquare,
  Loader2
} from 'lucide-react';
import './RecruiterRegister.css';

function RecruiterRegister() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Company Basic Information
    companyName: '',
    registrationNumber: '',
    companyType: '',
    yearEstablished: '',
    vatNumber: '',
    taxCompliant: false,
    bbbeeLevel: '',
    bbbeeCertificate: null,
    
    // Step 2: Contact & Location
    email: '',
    phone: '',
    alternatePhone: '',
    website: '',
    physicalAddress: '',
    postalAddress: '',
    province: '',
    city: '',
    postalCode: '',
    
    // Step 3: Verification Documents & Compliance
    cipcDocument: null,
    taxClearance: null,
    proofOfAddress: null,
    companyLogo: null,
    companyProfile: '',
    industrySector: '',
    numberOfEmployees: '',
    socialMediaLinkedin: '',
    socialMediaFacebook: '',
    empowermentCredentials: '',
    agreesToTerms: false,
    agreesToVerification: false,
    confirmsAccuracy: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const validateStep = (step) => {
    // Basic validation - you can expand this
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Handle success/redirect
      console.log('Form submitted:', formData);
    }, 2000);
  };

  const provinces = [
    'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 
    'Limpopo', 'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape'
  ];

  const companyTypes = [
    'Pty Ltd', 'NPC (Non-Profit Company)', 'NGO', 'NPO', 'Section 21 Company',
    'Trust', 'Sole Proprietor', 'Partnership', 'Co-operative', 'Public Company'
  ];

  const industrySectors = [
    'Construction', 'Manufacturing', 'Retail', 'Wholesale', 'Transport & Logistics',
    'Security Services', 'Hospitality', 'Agriculture', 'Mining', 'Professional Services',
    'Social Services', 'Education & Training', 'Healthcare', 'Technology', 'Other'
  ];

  return (
    <div className="re-link-recruiter-page">
      <div className="re-link-container">
        <Link to="/" className="back-link">
          <ArrowLeft size={20} />
          <span>Back to Re-Link Home</span>
        </Link>
        
        <div className="header-section">
          <div className="icon-wrapper">
            <Building2 size={48} />
          </div>
          <h1>Employer & Partner Registration</h1>
          <p className="subtitle">Join Re-Link in creating second chances through employment</p>
          
          <div className="progress-indicator">
            <div className={`progress-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
              <span className="step-number">1</span>
              <span className="step-label">Company Details</span>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
              <span className="step-number">2</span>
              <span className="step-label">Contact & Location</span>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
              <span className="step-number">3</span>
              <span className="step-label">Verification</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="registration-form">
          {/* Step 1: Company Basic Information */}
          {currentStep === 1 && (
            <div className="form-step fade-in">
              <h2>Company Information</h2>
              <p className="step-description">Please provide your official South African company details</p>
              
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Registered Company Name <span className="required">*</span></label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="e.g., Re-Link Solutions (Pty) Ltd"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Company Registration Number <span className="required">*</span></label>
                  <input
                    type="text"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleInputChange}
                    placeholder="e.g., 2024/123456/07"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Company Type <span className="required">*</span></label>
                  <select
                    name="companyType"
                    value={formData.companyType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select company type</option>
                    {companyTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Year Established</label>
                  <input
                    type="number"
                    name="yearEstablished"
                    value={formData.yearEstablished}
                    onChange={handleInputChange}
                    placeholder="e.g., 2015"
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                </div>

                <div className="form-group">
                  <label>VAT Number (if registered)</label>
                  <input
                    type="text"
                    name="vatNumber"
                    value={formData.vatNumber}
                    onChange={handleInputChange}
                    placeholder="e.g., 4123456789"
                  />
                </div>

                <div className="form-group">
                  <label>B-BBEE Level</label>
                  <select
                    name="bbbeeLevel"
                    value={formData.bbbeeLevel}
                    onChange={handleInputChange}
                  >
                    <option value="">Select level</option>
                    <option value="Level 1">Level 1 (100% B-BBEE)</option>
                    <option value="Level 2">Level 2 (125% B-BBEE)</option>
                    <option value="Level 3">Level 3 (150% B-BBEE)</option>
                    <option value="Level 4">Level 4 (175% B-BBEE)</option>
                    <option value="Level 5">Level 5 (200% B-BBEE)</option>
                    <option value="Level 6">Level 6 (225% B-BBEE)</option>
                    <option value="Level 7">Level 7 (250% B-BBEE)</option>
                    <option value="Level 8">Level 8 (275% B-BBEE)</option>
                    <option value="Non-Compliant">Non-Compliant</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label>Industry/Sector <span className="required">*</span></label>
                  <select
                    name="industrySector"
                    value={formData.industrySector}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select primary industry sector</option>
                    {industrySectors.map(sector => (
                      <option key={sector} value={sector}>{sector}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Number of Employees</label>
                  <input
                    type="number"
                    name="numberOfEmployees"
                    value={formData.numberOfEmployees}
                    onChange={handleInputChange}
                    placeholder="e.g., 50"
                    min="0"
                  />
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="taxCompliant"
                      checked={formData.taxCompliant}
                      onChange={handleInputChange}
                    />
                    <span>I confirm my company is tax compliant with SARS</span>
                  </label>
                </div>

                <div className="form-group file-upload">
                  <label>B-BBEE Certificate (if available)</label>
                  <input
                    type="file"
                    name="bbbeeCertificate"
                    onChange={handleInputChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <small>Upload PDF or image (max 5MB)</small>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Contact & Location */}
          {currentStep === 2 && (
            <div className="form-step fade-in">
              <h2>Contact & Location Details</h2>
              <p className="step-description">How can Re-Link and potential candidates reach you?</p>

              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Business Email <span className="required">*</span></label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="info@yourcompany.co.za"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number <span className="required">*</span></label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+27 11 123 4567"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Alternate Phone</label>
                  <input
                    type="tel"
                    name="alternatePhone"
                    value={formData.alternatePhone}
                    onChange={handleInputChange}
                    placeholder="+27 81 123 4567"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Website</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://www.yourcompany.co.za"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Physical Address <span className="required">*</span></label>
                  <textarea
                    name="physicalAddress"
                    value={formData.physicalAddress}
                    onChange={handleInputChange}
                    placeholder="Street address, building name, etc."
                    rows="3"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Province <span className="required">*</span></label>
                  <select
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select province</option>
                    {provinces.map(province => (
                      <option key={province} value={province}>{province}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>City/Town <span className="required">*</span></label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g., Johannesburg"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Postal Code <span className="required">*</span></label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="e.g., 2000"
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label>Postal Address (if different)</label>
                  <textarea
                    name="postalAddress"
                    value={formData.postalAddress}
                    onChange={handleInputChange}
                    placeholder="Leave blank if same as physical address"
                    rows="2"
                  />
                </div>

                <div className="form-group">
                  <label>LinkedIn Company Page</label>
                  <input
                    type="url"
                    name="socialMediaLinkedin"
                    value={formData.socialMediaLinkedin}
                    onChange={handleInputChange}
                    placeholder="https://www.linkedin.com/company/..."
                  />
                </div>

                <div className="form-group">
                  <label>Facebook Page</label>
                  <input
                    type="url"
                    name="socialMediaFacebook"
                    value={formData.socialMediaFacebook}
                    onChange={handleInputChange}
                    placeholder="https://www.facebook.com/..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Verification Checklist */}
          {currentStep === 3 && (
            <div className="form-step fade-in">
              <h2>Verification & Compliance</h2>
              <p className="step-description">Complete this checklist to verify your organization</p>

              <div className="verification-section">
                <div className="verification-checklist">
                  <h3><Shield size={20} /> Required Documents</h3>
                  
                  <div className="checklist-item">
                    <div className="item-header">
                      <CheckCircle className="required-icon" size={20} />
                      <span>CIPC Registration Document</span>
                    </div>
                    <input
                      type="file"
                      name="cipcDocument"
                      onChange={handleInputChange}
                      accept=".pdf"
                      className="file-input"
                    />
                    <small>Upload your Company Registration Certificate (CK or CoR)</small>
                  </div>

                  <div className="checklist-item">
                    <div className="item-header">
                      <CheckCircle className="required-icon" size={20} />
                      <span>Tax Clearance Certificate</span>
                    </div>
                    <input
                      type="file"
                      name="taxClearance"
                      onChange={handleInputChange}
                      accept=".pdf"
                      className="file-input"
                    />
                    <small>Upload valid SARS Tax Clearance Certificate</small>
                  </div>

                  <div className="checklist-item">
                    <div className="item-header">
                      <CheckCircle className="required-icon" size={20} />
                      <span>Proof of Business Address</span>
                    </div>
                    <input
                      type="file"
                      name="proofOfAddress"
                      onChange={handleInputChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="file-input"
                    />
                    <small>Municipal bill, lease agreement, or bank statement (last 3 months)</small>
                  </div>

                  <div className="checklist-item">
                    <div className="item-header">
                      <CheckCircle className="optional-icon" size={20} />
                      <span>Company Logo</span>
                    </div>
                    <input
                      type="file"
                      name="companyLogo"
                      onChange={handleInputChange}
                      accept=".jpg,.jpeg,.png,.svg"
                      className="file-input"
                    />
                    <small>Upload your company logo (optional)</small>
                  </div>
                </div>

                <div className="verification-checklist">
                  <h3><FileText size={20} /> Company Profile</h3>
                  
                  <div className="form-group">
                    <label>Brief Company Profile</label>
                    <textarea
                      name="companyProfile"
                      value={formData.companyProfile}
                      onChange={handleInputChange}
                      placeholder="Tell us about your company's mission, values, and commitment to transformation..."
                      rows="4"
                    />
                  </div>

                  <div className="form-group">
                    <label>Empowerment & Transformation Credentials</label>
                    <textarea
                      name="empowermentCredentials"
                      value={formData.empowermentCredentials}
                      onChange={handleInputChange}
                      placeholder="Describe your B-BBEE initiatives, skills development programs, or community engagement..."
                      rows="3"
                    />
                  </div>
                </div>

                <div className="verification-checklist">
                  <h3><Award size={20} /> Declarations</h3>
                  
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="agreesToTerms"
                      checked={formData.agreesToTerms}
                      onChange={handleInputChange}
                      required
                    />
                    <span>I agree to the Re-Link <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></span>
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="agreesToVerification"
                      checked={formData.agreesToVerification}
                      onChange={handleInputChange}
                      required
                    />
                    <span>I consent to Re-Link verifying all provided information with relevant authorities</span>
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="confirmsAccuracy"
                      checked={formData.confirmsAccuracy}
                      onChange={handleInputChange}
                      required
                    />
                    <span>I confirm that all information provided is true, accurate, and complete</span>
                  </label>

                  <label className="checkbox-label highlight">
                    <input
                      type="checkbox"
                      name="commitsToOpportunity"
                      onChange={handleInputChange}
                    />
                    <span>I commit to providing fair employment opportunities to rehabilitated individuals</span>
                  </label>
                </div>

                <div className="verification-summary">
                  <div className="summary-icon">
                    <CheckSquare size={32} />
                  </div>
                  <div className="summary-text">
                    <h4>Almost there!</h4>
                    <p>By completing this verification, you'll join trusted employers committed to transforming lives through Re-Link.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="form-navigation">
            {currentStep > 1 && (
              <button type="button" onClick={handlePrevious} className="nav-button prev">
                <ChevronLeft size={20} />
                Previous
              </button>
            )}
            
            {currentStep < 3 ? (
              <button type="button" onClick={handleNext} className="nav-button next">
                Next Step
                <ChevronRight size={20} />
              </button>
            ) : (
              <button 
                type="submit" 
                className="nav-button submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} />
                    Complete Registration
                  </>
                )}
              </button>
            )}
          </div>
        </form>

        <div className="footer-section">
          <div className="trust-indicators">
            <div className="trust-item">
              <Shield size={16} />
              <span>POPIA Compliant</span>
            </div>
            <div className="trust-item">
              <CheckCircle size={16} />
              <span>Verified by FCSA</span>
            </div>
            <div className="trust-item">
              <Users size={16} />
              <span>Supporting Reintegration</span>
            </div>
            <div className="trust-item">
              <Heart size={16} />
              <span>Making a Difference</span>
            </div>
          </div>
          
          <p className="help-text">
            Need assistance? Contact our employer support team at <a href="mailto:employers@re-link.co.za">employers@re-link.co.za</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RecruiterRegister;