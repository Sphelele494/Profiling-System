import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserCheck, Edit, Shield, Lock, Eye, EyeOff, GraduationCap,
  Award, Briefcase, Plus, Settings, DownloadCloud, BellRing,
  LogOut, Trash2, ChevronRight, Camera, CheckCircle, X
} from "lucide-react";

function ProfileTab({ user, setUser, credibilityScore, setCredibilityScore }) {
  const navigate = useNavigate();
  const [showSensitiveInfo, setShowSensitiveInfo] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  const profilePicRef = useRef(null);

  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        localStorage.setItem('relink_profile_pic', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('relink_token');
      localStorage.removeItem('relink_user');
      navigate('/login');
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm("⚠️ WARNING: Are you sure you want to delete your account?\n\nThis action cannot be undone. All your data including:\n• Profile information\n• Job applications\n• Messages\n• Referral documents\n• Community posts\n\nWill be permanently deleted.")) {
      localStorage.removeItem('relink_token');
      localStorage.removeItem('relink_user');
      localStorage.removeItem('relink_email');
      localStorage.removeItem('relink_remember');
      navigate('/');
    }
  };

  return (
    <div className="profile-tab">
      <div className="profile-header-section">
        <div className="profile-cover">
          <div className="profile-avatar-large">
            {profilePicture ? (
              <img src={profilePicture} alt="Profile" className="profile-avatar-img-large" />
            ) : (
              <span className="avatar-initial-large">{user?.name?.charAt(0) || "U"}</span>
            )}
            <button 
              className="change-photo-btn"
              onClick={() => profilePicRef.current?.click()}
            >
              <Camera size={16} />
              <span>Change Photo</span>
            </button>
            <input
              type="file"
              ref={profilePicRef}
              accept="image/*"
              onChange={handleProfilePictureUpload}
              style={{ display: 'none' }}
            />
          </div>
          <div className="profile-info-main">
            <h2 className="profile-name">{user?.name || "Your Name"}</h2>
            <p className="profile-title">RE-Link Member - South Africa</p>
            <div className="profile-stats">
              <div className="profile-stat-item">
                <span className="stat-number">{credibilityScore}</span>
                <span className="stat-label">Credibility</span>
              </div>
              <div className="profile-stat-item">
                <span className="stat-number">12</span>
                <span className="stat-label">Applications</span>
              </div>
              <div className="profile-stat-item">
                <span className="stat-number">5</span>
                <span className="stat-label">Documents</span>
              </div>
              <div className="profile-stat-item">
                <span className="stat-number">8</span>
                <span className="stat-label">Appointments</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-content">
        {/* Personal Information */}
        <div className="profile-section">
          <div className="section-header">
            <h3 className="section-title">
              <UserCheck size={24} />
              <span>Personal Information</span>
            </h3>
            <button className="edit-section-btn">
              <Edit size={16} />
              <span>Edit</span>
            </button>
          </div>
          
          <div className="personal-info-grid">
            <div className="info-item">
              <span className="info-label">Full Name</span>
              <span className="info-value">{user?.name || "Not provided"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email</span>
              <span className="info-value">{user?.email || "Not provided"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Phone</span>
              <span className="info-value">+27 {user?.phone || "Not provided"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">ID Number</span>
              <span className="info-value">{user?.idNumber || "Not provided"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Date of Birth</span>
              <span className="info-value">{user?.dob || "Not provided"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Location</span>
              <span className="info-value">{user?.location || "Not provided"}</span>
            </div>
          </div>
        </div>

        {/* Sensitive Information */}
        <div className="profile-section">
          <div className="section-header">
            <h3 className="section-title">
              <Shield size={24} />
              <span>Sensitive Information</span>
              <span className="section-badge">Visible to Verified South African Recruiters Only</span>
            </h3>
            <button 
              className="toggle-sensitive-btn"
              onClick={() => setShowSensitiveInfo(!showSensitiveInfo)}
            >
              {showSensitiveInfo ? <EyeOff size={16} /> : <Eye size={16} />}
              <span>{showSensitiveInfo ? 'Hide' : 'Show'}</span>
            </button>
          </div>
          
          {showSensitiveInfo ? (
            <div className="sensitive-info-grid">
              <div className="info-item">
                <span className="info-label">Correctional Facility</span>
                <span className="info-value">Johannesburg Correctional Centre</span>
              </div>
              <div className="info-item">
                <span className="info-label">Sentence Duration</span>
                <span className="info-value">2019 - 2023 (4 years)</span>
              </div>
              <div className="info-item">
                <span className="info-label">Offense Category</span>
                <span className="info-value">Non-violent property crime</span>
              </div>
              <div className="info-item">
                <span className="info-label">Parole Officer</span>
                <span className="info-value">Officer Sarah Johnson (SAPS)</span>
              </div>
              <div className="info-item">
                <span className="info-label">Parole End Date</span>
                <span className="info-value">December 2025</span>
              </div>
              <div className="info-item">
                <span className="info-label">Rehabilitation Status</span>
                <span className="info-value success">Completed</span>
              </div>
            </div>
          ) : (
            <div className="sensitive-info-hidden">
              <Lock size={32} />
              <p>This information is hidden and only visible to verified South African recruiters</p>
              <button 
                className="show-sensitive-btn"
                onClick={() => setShowSensitiveInfo(true)}
              >
                <Eye size={16} />
                <span>Show to View</span>
              </button>
            </div>
          )}
        </div>

        {/* Skills & Education */}
        <div className="profile-section">
          <div className="section-header">
            <h3 className="section-title">
              <GraduationCap size={24} />
              <span>Skills, Education & Certificates</span>
            </h3>
            <button className="add-item-btn">
              <Plus size={16} />
              <span>Add</span>
            </button>
          </div>
          
          <div className="skills-section">
            <h4 className="subsection-title">Skills</h4>
            <div className="skills-list">
              {["Construction", "Leadership", "Team Management", "Safety Compliance", "Problem Solving", "Communication"].map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
          
          <div className="education-section">
            <h4 className="subsection-title">Education & Certificates</h4>
            <div className="education-list">
              <div className="education-item">
                <div className="edu-icon">
                  <Award size={20} />
                </div>
                <div className="edu-details">
                  <h5 className="edu-title">Construction Management Certificate</h5>
                  <p className="edu-institution">SA Technical Training Centre, Johannesburg</p>
                  <span className="edu-year">2022</span>
                </div>
              </div>
              <div className="education-item">
                <div className="edu-icon">
                  <Award size={20} />
                </div>
                <div className="edu-details">
                  <h5 className="edu-title">Forklift Operator License</h5>
                  <p className="edu-institution">SA Construction Authority</p>
                  <span className="edu-year">2023</span>
                </div>
              </div>
              <div className="education-item">
                <div className="edu-icon">
                  <Award size={20} />
                </div>
                <div className="edu-details">
                  <h5 className="edu-title">Health & Safety Training</h5>
                  <p className="edu-institution">Construction Safety Board of SA</p>
                  <span className="edu-year">2023</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Work Experience */}
        <div className="profile-section">
          <div className="section-header">
            <h3 className="section-title">
              <Briefcase size={24} />
              <span>Work Experience in South Africa</span>
            </h3>
            <button className="add-item-btn">
              <Plus size={16} />
              <span>Add Experience</span>
            </button>
          </div>
          
          <div className="experience-list">
            <div className="experience-item">
              <div className="exp-icon">
                <Briefcase size={20} />
              </div>
              <div className="exp-details">
                <h5 className="exp-title">Construction Supervisor</h5>
                <p className="exp-company">BuildRight Construction, Soweto</p>
                <span className="exp-duration">2023 - Present</span>
                <p className="exp-description">Leading construction projects, managing teams of 15+, ensuring safety compliance, and coordinating with clients.</p>
              </div>
            </div>
            <div className="experience-item">
              <div className="exp-icon">
                <Briefcase size={20} />
              </div>
              <div className="exp-details">
                <h5 className="exp-title">Construction Worker</h5>
                <p className="exp-company">BuildRight Construction, Soweto</p>
                <span className="exp-duration">2023 - 2023 (6 months)</span>
                <p className="exp-description">General construction work, team collaboration, following safety protocols, and learning advanced skills.</p>
              </div>
            </div>
            <div className="experience-item">
              <div className="exp-icon">
                <Briefcase size={20} />
              </div>
              <div className="exp-details">
                <h5 className="exp-title">Warehouse Assistant</h5>
                <p className="exp-company">Unitrans Logistics, Johannesburg</p>
                <span className="exp-duration">2023 - 2023 (3 months)</span>
                <p className="exp-description">Inventory management, packing, shipping, and assisting with warehouse operations.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="profile-section">
          <div className="section-header">
            <h3 className="section-title">
              <Settings size={24} />
              <span>Account Settings</span>
            </h3>
          </div>
          
          <div className="account-actions">
            <button className="account-action-btn">
              <DownloadCloud size={18} />
              <div className="action-content">
                <span className="action-title">Export Data</span>
                <span className="action-desc">Download all your RE-Link data</span>
              </div>
              <ChevronRight size={16} />
            </button>
            
            <button className="account-action-btn">
              <Shield size={18} />
              <div className="action-content">
                <span className="action-title">Privacy Settings</span>
                <span className="action-desc">Manage your privacy preferences</span>
              </div>
              <ChevronRight size={16} />
            </button>
            
            <button className="account-action-btn">
              <BellRing size={18} />
              <div className="action-content">
                <span className="action-title">Notifications</span>
                <span className="action-desc">Configure your notification settings</span>
              </div>
              <ChevronRight size={16} />
            </button>
            
            <button className="account-action-btn logout" onClick={handleLogout}>
              <LogOut size={18} />
              <div className="action-content">
                <span className="action-title">Logout</span>
                <span className="action-desc">Sign out of your account</span>
              </div>
              <ChevronRight size={16} />
            </button>
            
            <button className="account-action-btn delete" onClick={handleDeleteAccount}>
              <Trash2 size={18} />
              <div className="action-content">
                <span className="action-title">Delete Account</span>
                <span className="action-desc">Permanently remove your account</span>
              </div>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileTab;