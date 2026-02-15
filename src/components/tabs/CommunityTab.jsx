import React, { useState, useRef } from 'react';
import {
  Users, FileText, UploadCloud, Upload, Loader2, Eye, Download,
  Clock4, Edit, Calendar, ShieldCheck, X, CheckCircle, Lock,
  Award, Briefcase, GraduationCap, HandHeart, Shield, Plus
} from "lucide-react";

function CommunityTab({ user, credibilityScore, setCredibilityScore }) {
  const [referralType, setReferralType] = useState("employer");
  const [uploadingFile, setUploadingFile] = useState(false);
  const [showSensitiveInfo, setShowSensitiveInfo] = useState(false);

  const [referralDocuments, setReferralDocuments] = useState([
    { id: 1, name: "Police Clearance Certificate.pdf", type: "clearance", date: "2024-02-10", status: "verified", points: 30, size: "2.5 MB" },
    { id: 2, name: "Rehabilitation Certificate.jpg", type: "rehab", date: "2024-02-05", status: "verified", points: 20, size: "1.8 MB" },
    { id: 3, name: "Previous Employer Reference.pdf", type: "employer", date: "2024-02-01", status: "pending", points: 15, size: "3.2 MB" }
  ]);

  // Credibility metrics
  const credibilityMetrics = [
    { label: "Community Participation", score: 85, color: "#10b981", points: 25, icon: "👥" },
    { label: "Professional Development", score: 72, color: "#059669", points: 18, icon: "📚" },
    { label: "Employment Stability", score: 90, color: "#047857", points: 30, icon: "💼" },
    { label: "Mentorship Engagement", score: 65, color: "#065f46", points: 15, icon: "👨‍🏫" },
    { label: "Rehabilitation Completion", score: 100, color: "#064e3b", points: 20, icon: "✅" },
    { label: "Document Verification", score: 80, color: "#022c22", points: 25, icon: "📄" }
  ];

  // Referral types
  const referralTypes = [
    { id: "employer", label: "Previous Employer", icon: Briefcase, description: "Reference letter from past employer", points: 15, color: "#10b981" },
    { id: "rehab", label: "Rehabilitation Center", icon: HandHeart, description: "Completion certificate from rehab", points: 20, color: "#059669" },
    { id: "police", label: "Police Officer", icon: ShieldCheck, description: "Character reference from SAPS", points: 25, color: "#047857" },
    { id: "community", label: "Community Leader", icon: Users, description: "Recommendation from community leader", points: 10, color: "#065f46" },
    { id: "volunteer", label: "Volunteer Work", icon: HandHeart, description: "Proof of volunteer service", points: 12, color: "#064e3b" },
    { id: "education", label: "Education/Training", icon: GraduationCap, description: "Certificates or diplomas", points: 18, color: "#022c22" },
    { id: "clearance", label: "Police Clearance", icon: FileText, description: "Official SAPS clearance certificate", points: 30, color: "#10b981" }
  ];

  // Rehabilitation timeline
  const rehabilitationTimeline = [
    {
      id: 1,
      year: "2018",
      event: "Pre-Incarceration",
      description: "Working as construction assistant in Soweto, learning basic skills",
      status: "pre",
      icon: "🏗️",
      color: "#10b981"
    },
    {
      id: 2,
      year: "2019",
      event: "Incarceration Begins",
      description: "Started sentence at Johannesburg Correctional Facility",
      status: "incarcerated",
      icon: "🔒",
      color: "#ef4444"
    },
    {
      id: 3,
      year: "2020",
      event: "Vocational Training",
      description: "Completed construction certification in prison program",
      status: "progress",
      icon: "📚",
      color: "#3b82f6"
    },
    {
      id: 4,
      year: "2021",
      event: "Behavioral Rehabilitation",
      description: "Completed anger management and life skills programs",
      status: "progress",
      icon: "🧠",
      color: "#8b5cf6"
    },
    {
      id: 5,
      year: "2022",
      event: "Release Preparation",
      description: "Pre-release counseling and job readiness training",
      status: "progress",
      icon: "🚪",
      color: "#f59e0b"
    },
    {
      id: 6,
      year: "2023",
      event: "Release Date",
      description: "Released and joined RE-Link platform in South Africa",
      status: "post",
      icon: "🎉",
      color: "#10b981"
    },
    {
      id: 7,
      year: "2023",
      event: "First Job Placement",
      description: "Construction worker at BuildRight Construction in Soweto",
      status: "post",
      icon: "👷",
      color: "#10b981"
    },
    {
      id: 8,
      year: "2024",
      event: "Current Position",
      description: "Promoted to Construction Supervisor",
      status: "post",
      icon: "⭐",
      color: "#10b981"
    },
    {
      id: 9,
      year: "2024",
      event: "Community Leadership",
      description: "Started mentoring new RE-Link members in Soweto",
      status: "post",
      icon: "👥",
      color: "#10b981"
    }
  ];

  const getReferralPoints = (type) => {
    const pointsMap = {
      employer: 15,
      rehab: 20,
      police: 25,
      community: 10,
      volunteer: 12,
      education: 18,
      clearance: 30
    };
    return pointsMap[type] || 10;
  };

  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      alert("Please upload PDF, JPG, or PNG files only.");
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      alert("File size too large. Maximum 10MB.");
      return;
    }
    
    setUploadingFile(true);
    
    setTimeout(() => {
      const newDocument = {
        id: referralDocuments.length + 1,
        name: file.name,
        type: referralType,
        date: new Date().toLocaleDateString(),
        status: "pending",
        points: getReferralPoints(referralType),
        size: (file.size / 1024 / 1024).toFixed(2) + " MB"
      };
      
      setReferralDocuments([newDocument, ...referralDocuments]);
      setUploadingFile(false);
      
      const newScore = Math.min(100, credibilityScore + newDocument.points);
      setCredibilityScore(newScore);
      localStorage.setItem('relink_credibility_score', newScore.toString());
      localStorage.setItem('relink_documents', JSON.stringify([newDocument, ...referralDocuments]));
      
      alert(`✅ Document "${file.name}" uploaded successfully!\n+${newDocument.points} credibility points added.`);
    }, 2000);
  };

  return (
    <div className="community-tab">
      <div className="community-header">
        <h3 className="section-title">
          <Users size={28} />
          <span>Build Your Credibility</span>
        </h3>
        <p className="section-subtitle">Track your journey and submit referrals to increase your credibility score</p>
      </div>

      {/* Credibility Dashboard */}
      <div className="credibility-dashboard">
        <div className="dashboard-header">
          <div className="score-display">
            <div className="score-circle-large">
              <span className="score-value-large">{credibilityScore}</span>
              <span className="score-label-large">/100</span>
            </div>
            <div className="score-info">
              <h4 className="score-title">Credibility Score</h4>
              <p className="score-description">Based on referrals, employment history, and community engagement in South Africa</p>
              <div className="score-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${credibilityScore}%` }}
                  ></div>
                </div>
                <span className="progress-text">{credibilityScore}% complete</span>
              </div>
            </div>
          </div>
          
          <div className="score-breakdown">
            <h5 className="breakdown-title">Score Breakdown</h5>
            {credibilityMetrics.map((metric, index) => (
              <div key={index} className="metric-item">
                <div className="metric-label">
                  <div 
                    className="metric-dot"
                    style={{ backgroundColor: metric.color }}
                  ></div>
                  <span className="metric-name">{metric.label}</span>
                  <span className="metric-icon">{metric.icon}</span>
                </div>
                <div className="metric-details">
                  <div className="metric-bar">
                    <div 
                      className="metric-fill"
                      style={{ width: `${metric.score}%`, backgroundColor: metric.color }}
                    ></div>
                  </div>
                  <span className="metric-value">{metric.score}% (+{metric.points} pts)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Referral System */}
      <div className="referral-system">
        <div className="referral-header">
          <h4 className="referral-title">
            <FileText size={24} />
            Submit Referral Documents
          </h4>
          <p className="referral-subtitle">Upload documents to increase your credibility score</p>
        </div>
        
        <div className="referral-types">
          {referralTypes.map(type => (
            <div 
              key={type.id}
              className={`referral-type-card ${referralType === type.id ? 'selected' : ''}`}
              onClick={() => setReferralType(type.id)}
              style={{ borderLeftColor: type.color }}
            >
              <div className="type-icon">
                <type.icon size={24} />
              </div>
              <div className="type-details">
                <h5 className="type-name">{type.label}</h5>
                <p className="type-desc">{type.description}</p>
              </div>
              <div className="type-points">
                <span className="points-value">+{type.points} pts</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="upload-section">
          <div className="upload-card">
            <div className="upload-icon">
              <UploadCloud size={48} />
            </div>
            <div className="upload-info">
              <h5 className="upload-title">Upload {referralTypes.find(t => t.id === referralType)?.label} Document</h5>
              <p className="upload-description">
                Upload scanned copy or photo of your document. Accepted formats: PDF, JPG, PNG (Max 10MB)
              </p>
            </div>
            <div className="upload-actions">
              <input
                type="file"
                id="document-upload"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleDocumentUpload}
                className="file-input"
              />
              <label htmlFor="document-upload" className="upload-btn">
                {uploadingFile ? (
                  <>
                    <Loader2 size={16} className="spinner" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload size={16} />
                    <span>Choose File</span>
                  </>
                )}
              </label>
            </div>
          </div>
          
          {/* Uploaded Documents */}
          {referralDocuments.length > 0 && (
            <div className="uploaded-documents">
              <h5 className="documents-title">Recently Uploaded Documents</h5>
              <div className="documents-list">
                {referralDocuments.slice(0, 3).map(doc => (
                  <div key={doc.id} className="document-item">
                    <div className="document-icon">
                      <FileText size={20} />
                    </div>
                    <div className="document-info">
                      <span className="document-name">{doc.name}</span>
                      <div className="document-meta">
                        <span className="document-type">{doc.type}</span>
                        <span className="document-date">{doc.date}</span>
                        <span className="document-points">+{doc.points} pts</span>
                        <span className="document-size">{doc.size}</span>
                      </div>
                    </div>
                    <div className="document-actions">
                      <button className="document-action">
                        <Eye size={16} />
                      </button>
                      <button className="document-action">
                        <Download size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Rehabilitation Timeline */}
      <div className="timeline-section">
        <div className="timeline-header">
          <h4 className="timeline-title">
            <Clock4 size={24} />
            Your Rehabilitation Journey in South Africa
          </h4>
          <button className="edit-timeline-btn">
            <Edit size={16} />
            <span>Edit Timeline</span>
          </button>
        </div>
        
        <div className="timeline-container">
          <div className="timeline-track">
            {rehabilitationTimeline.map((item, index) => (
              <div key={item.id} className={`timeline-item ${item.status}`}>
                <div className="timeline-marker">
                  <div 
                    className="marker-dot"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  {index < rehabilitationTimeline.length - 1 && (
                    <div className="timeline-connector"></div>
                  )}
                </div>
                <div className="timeline-content">
                  <div className="timeline-year">{item.year}</div>
                  <div className="timeline-event-row">
                    <span className="timeline-event-icon">{item.icon}</span>
                    <h5 className="timeline-event">{item.event}</h5>
                  </div>
                  <p className="timeline-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Community Events */}
      <div className="community-events">
        <div className="events-header">
          <h4 className="events-title">
            <Calendar size={24} />
            Upcoming Community Events
          </h4>
          <button className="view-all-btn">View All</button>
        </div>
        <div className="events-grid">
          <div className="event-card">
            <div className="event-date">
              <span className="event-day">15</span>
              <span className="event-month">FEB</span>
            </div>
            <div className="event-details">
              <h5 className="event-title">Job Fair 2024 - Soweto</h5>
              <p className="event-description">Connect with employers and find opportunities</p>
              <div className="event-info">
                <span className="event-location">Soweto Expo Centre</span>
                <span className="event-time">9:00 AM - 4:00 PM</span>
              </div>
            </div>
            <button className="event-rsvp">RSVP</button>
          </div>
          <div className="event-card">
            <div className="event-date">
              <span className="event-day">22</span>
              <span className="event-month">FEB</span>
            </div>
            <div className="event-details">
              <h5 className="event-title">Skills Workshop - Johannesburg</h5>
              <p className="event-description">Learn interview skills and resume writing</p>
              <div className="event-info">
                <span className="event-location">Johannesburg Career Centre</span>
                <span className="event-time">2:00 PM - 5:00 PM</span>
              </div>
            </div>
            <button className="event-rsvp">RSVP</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityTab;

