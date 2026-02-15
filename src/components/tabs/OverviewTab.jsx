import React, { useState } from 'react';
import {
  BarChart3, Target, Calendar, Briefcase, Activity,
  CheckCircle, MoreVertical, Plus, RefreshCw, TrendingUp,
  Eye, Network, Send, FileText, Clock, Users, HeartHandshake,
  GraduationCap, BookOpen, ShieldCheck, X, Edit, Trash2
} from "lucide-react";

function OverviewTab({ user, credibilityScore, setCredibilityScore }) {
  const [quickStats, setQuickStats] = useState({
    dailyViews: 24,
    weeklyConnections: 8,
    monthlyApplications: 12,
    totalReferrals: 5,
    eventsAttended: 3,
    certificatesEarned: 2
  });

  const [appointments, setAppointments] = useState([
    { id: 1, type: "rehab", title: "Rehabilitation Session", date: "2024-02-15", time: "10:00 AM", location: "Soweto Hope Center", status: "upcoming" },
    { id: 2, type: "medical", title: "Clinic Check-up", date: "2024-02-18", time: "2:30 PM", location: "Chris Hani Baragwanath", status: "upcoming" },
    { id: 3, type: "community", title: "Community Service", date: "2024-02-20", time: "9:00 AM", location: "Orlando Park", status: "upcoming" },
    { id: 4, type: "volunteer", title: "Volunteer Work", date: "2024-02-22", time: "8:00 AM", location: "Soweto Food Bank", status: "upcoming" },
    { id: 5, type: "counseling", title: "Counseling Session", date: "2024-02-25", time: "11:00 AM", location: "Soweto Support Center", status: "upcoming" }
  ]);

  const [jobsApplied, setJobsApplied] = useState([
    { id: 1, title: "Construction Supervisor", company: "BuildRight", date: "2024-02-10", status: "review" },
    { id: 2, title: "Warehouse Assistant", company: "Unitrans Logistics", date: "2024-02-08", status: "interview" },
    { id: 3, title: "Customer Service", company: "Vodacom", date: "2024-02-05", status: "applied" },
    { id: 4, title: "Driver", company: "Bidvest Steiner", date: "2024-02-03", status: "rejected" },
    { id: 5, title: "Retail Assistant", company: "Shoprite", date: "2024-02-01", status: "accepted" }
  ]);

  const [userProgress, setUserProgress] = useState({
    profileCompletion: 85,
    jobSearchActivity: 90,
    networkingScore: 75,
    skillDevelopment: 60,
    communityEngagement: 95,
    documentSubmission: 80
  });

  const credibilityMetrics = [
    { label: "Community Participation", score: 85, color: "#10b981", points: 25, icon: "👥" },
    { label: "Professional Development", score: 72, color: "#059669", points: 18, icon: "📚" },
    { label: "Employment Stability", score: 90, color: "#047857", points: 30, icon: "💼" },
    { label: "Mentorship Engagement", score: 65, color: "#065f46", points: 15, icon: "👨‍🏫" },
    { label: "Rehabilitation Completion", score: 100, color: "#064e3b", points: 20, icon: "✅" },
    { label: "Document Verification", score: 80, color: "#022c22", points: 25, icon: "📄" }
  ];

  const handleAppointmentStatus = (id, status) => {
    const updatedAppointments = appointments.map(apt => 
      apt.id === id ? { ...apt, status: status } : apt
    );
    setAppointments(updatedAppointments);
    localStorage.setItem('relink_appointments', JSON.stringify(updatedAppointments));
  };

  return (
    <div className="overview-tab">
      <div className="overview-header">
        <h3 className="section-title">
          <BarChart3 size={28} />
          <span>Your Dashboard</span>
        </h3>
        <p className="section-subtitle">Track your progress, appointments, and opportunities all in one place</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="quick-stats-grid">
        <div className="quick-stat-card">
          <div className="quick-stat-icon" style={{ background: 'linear-gradient(135deg, #10b981, #34d399)' }}>
            <Eye size={24} />
          </div>
          <div className="quick-stat-content">
            <span className="quick-stat-number">{quickStats.dailyViews}</span>
            <span className="quick-stat-label">Daily Profile Views</span>
          </div>
          <div className="quick-stat-trend">
            <TrendingUp size={16} />
            <span>+12%</span>
          </div>
        </div>
        
        <div className="quick-stat-card">
          <div className="quick-stat-icon" style={{ background: 'linear-gradient(135deg, #3b82f6, #60a5fa)' }}>
            <Network size={24} />
          </div>
          <div className="quick-stat-content">
            <span className="quick-stat-number">{quickStats.weeklyConnections}</span>
            <span className="quick-stat-label">Weekly Connections</span>
          </div>
          <div className="quick-stat-trend">
            <TrendingUp size={16} />
            <span>+8%</span>
          </div>
        </div>
        
        <div className="quick-stat-card">
          <div className="quick-stat-icon" style={{ background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)' }}>
            <Send size={24} />
          </div>
          <div className="quick-stat-content">
            <span className="quick-stat-number">{quickStats.monthlyApplications}</span>
            <span className="quick-stat-label">Monthly Applications</span>
          </div>
          <div className="quick-stat-trend">
            <TrendingUp size={16} />
            <span>+15%</span>
          </div>
        </div>
        
        <div className="quick-stat-card">
          <div className="quick-stat-icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #fbbf24)' }}>
            <FileText size={24} />
          </div>
          <div className="quick-stat-content">
            <span className="quick-stat-number">{quickStats.totalReferrals}</span>
            <span className="quick-stat-label">Total Referrals</span>
          </div>
          <div className="quick-stat-trend">
            <TrendingUp size={16} />
            <span>+5%</span>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Credibility Score Card */}
        <div className="dashboard-card large">
          <div className="card-header">
            <h4 className="card-title">
              <Target size={20} />
              <span>Credibility Score</span>
            </h4>
            <button className="card-action">
              <RefreshCw size={16} />
            </button>
          </div>
          <div className="credibility-display">
            <div className="score-circle-large">
              <span className="score-value-large">{credibilityScore}</span>
              <span className="score-label-large">/100</span>
            </div>
            <div className="score-breakdown">
              {credibilityMetrics.map((metric, index) => (
                <div key={index} className="score-metric">
                  <div className="metric-info">
                    <span className="metric-icon">{metric.icon}</span>
                    <span className="metric-label">{metric.label}</span>
                  </div>
                  <div className="metric-bar-container">
                    <div 
                      className="metric-bar"
                      style={{ width: `${metric.score}%`, backgroundColor: metric.color }}
                    ></div>
                    <span className="metric-value">{metric.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="dashboard-card">
          <div className="card-header">
            <h4 className="card-title">
              <Calendar size={20} />
              <span>Upcoming Appointments</span>
            </h4>
            <button className="card-action">
              <Plus size={16} />
            </button>
          </div>
          <div className="appointments-list">
            {appointments.slice(0, 3).map(appointment => (
              <div key={appointment.id} className="appointment-item">
                <div className="appointment-type">
                  <div 
                    className="type-indicator"
                    style={{ 
                      backgroundColor: 
                        appointment.type === 'rehab' ? '#10b981' :
                        appointment.type === 'medical' ? '#3b82f6' :
                        appointment.type === 'community' ? '#8b5cf6' :
                        appointment.type === 'volunteer' ? '#f59e0b' : '#ef4444'
                    }}
                  ></div>
                  <span className="appointment-title">{appointment.title}</span>
                </div>
                <div className="appointment-details">
                  <span className="appointment-date">{appointment.date}</span>
                  <span className="appointment-time">{appointment.time}</span>
                </div>
                <div className="appointment-actions">
                  <button 
                    className="status-btn"
                    onClick={() => handleAppointmentStatus(appointment.id, 'completed')}
                  >
                    <CheckCircle size={14} />
                  </button>
                  <button className="more-btn">
                    <MoreVertical size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Jobs Applied */}
        <div className="dashboard-card">
          <div className="card-header">
            <h4 className="card-title">
              <Briefcase size={20} />
              <span>Jobs Applied</span>
            </h4>
            <span className="card-badge">{jobsApplied.length}</span>
          </div>
          <div className="applications-list">
            {jobsApplied.slice(0, 4).map(job => (
              <div key={job.id} className="application-item">
                <div className="application-info">
                  <span className="application-title">{job.title}</span>
                  <span className="application-company">{job.company}</span>
                </div>
                <div className="application-status">
                  <span className={`status-badge ${job.status}`}>
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </span>
                  <span className="application-date">{job.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Progress */}
        <div className="dashboard-card">
          <div className="card-header">
            <h4 className="card-title">
              <Activity size={20} />
              <span>Your Progress</span>
            </h4>
            <span className="card-badge">85%</span>
          </div>
          <div className="progress-metrics">
            {Object.entries(userProgress).map(([key, value]) => (
              <div key={key} className="progress-item">
                <div className="progress-label">
                  <span className="progress-name">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                  <span className="progress-value">{value}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <div className="activity-header">
          <h4 className="activity-title">Recent Activity</h4>
          <button className="view-all-btn">View All</button>
        </div>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon success">
              <CheckCircle size={16} />
            </div>
            <div className="activity-content">
              <span className="activity-text">Applied for Construction Supervisor at BuildRight</span>
              <span className="activity-time">2 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon info">
              <FileText size={16} />
            </div>
            <div className="activity-content">
              <span className="activity-text">Uploaded Police Clearance Certificate</span>
              <span className="activity-time">1 day ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon warning">
              <Calendar size={16} />
            </div>
            <div className="activity-content">
              <span className="activity-text">Scheduled Rehabilitation Session</span>
              <span className="activity-time">2 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverviewTab;