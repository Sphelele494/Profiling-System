import React, { useState, useEffect } from 'react';
import {
  BarChart3, Target, Calendar, Briefcase, Activity,
  CheckCircle, MoreVertical, Plus, RefreshCw, TrendingUp,
  Eye, Network, Send, FileText, Clock, Users,
  GraduationCap, X, Download, Mail, Printer,
  ChevronRight, ArrowUpRight, AlertCircle, Lightbulb, Sparkles,
  Medal, Gift, Rocket, Bell, Filter, Search, Star,
  Zap, Award, BookOpen, HeartHandshake, TrendingDown,
  Edit, Trash2, Save, Flag, Phone, Video, MapPin,
  DollarSign, Percent, Award as Trophy
} from "lucide-react";

function OverviewTab({ user, credibilityScore, setCredibilityScore }) {
  // ==================== STATE MANAGEMENT ====================
  const [selectedTimeRange, setSelectedTimeRange] = useState('month');
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  // ==================== DATA STATES ====================
  const [quickStats, setQuickStats] = useState(() => {
    const saved = localStorage.getItem('relink_quickStats');
    return saved ? JSON.parse(saved) : {
      dailyViews: 24,
      weeklyConnections: 8,
      monthlyApplications: 12,
      totalReferrals: 5,
      eventsAttended: 3,
      certificatesEarned: 2,
      profileStreak: 7,
      interviewsScheduled: 3,
      savedJobs: 8
    };
  });

  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('relink_appointments');
    return saved ? JSON.parse(saved) : [
      { id: 1, type: "rehab", title: "Rehabilitation Session", date: "2024-02-15", time: "10:00 AM", location: "Soweto Hope Center", status: "upcoming", notes: "Bring ID document", reminder: true },
      { id: 2, type: "medical", title: "Clinic Check-up", date: "2024-02-18", time: "2:30 PM", location: "Chris Hani Baragwanath", status: "upcoming", notes: "Fast before appointment", reminder: true },
      { id: 3, type: "community", title: "Community Service", date: "2024-02-20", time: "9:00 AM", location: "Orlando Park", status: "upcoming", notes: "Wear comfortable clothes", reminder: false },
      { id: 4, type: "volunteer", title: "Volunteer Work", date: "2024-02-22", time: "8:00 AM", location: "Soweto Food Bank", status: "upcoming", notes: "Arrive 15 mins early", reminder: true },
      { id: 5, type: "counseling", title: "Counseling Session", date: "2024-02-25", time: "11:00 AM", location: "Soweto Support Center", status: "upcoming", notes: "Weekly session", reminder: true }
    ];
  });

  const [jobsApplied, setJobsApplied] = useState(() => {
    const saved = localStorage.getItem('relink_jobsApplied');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: "Construction Supervisor", company: "BuildRight", date: "2024-02-10", status: "review", salary: "R15,000 - R20,000", location: "Soweto", type: "Full-time", appliedDate: "2024-02-10", lastUpdate: "2024-02-12" },
      { id: 2, title: "Warehouse Assistant", company: "Unitrans Logistics", date: "2024-02-08", status: "interview", salary: "R8,000 - R12,000", location: "Johannesburg", type: "Full-time", appliedDate: "2024-02-08", lastUpdate: "2024-02-14" },
      { id: 3, title: "Customer Service", company: "Vodacom", date: "2024-02-05", status: "applied", salary: "R10,000 - R14,000", location: "Midrand", type: "Permanent", appliedDate: "2024-02-05", lastUpdate: "2024-02-05" },
      { id: 4, title: "Driver", company: "Bidvest Steiner", date: "2024-02-03", status: "rejected", salary: "R9,000 - R13,000", location: "Germiston", type: "Contract", appliedDate: "2024-02-03", lastUpdate: "2024-02-07" },
      { id: 5, title: "Retail Assistant", company: "Shoprite", date: "2024-02-01", status: "accepted", salary: "R7,500 - R10,000", location: "Soweto", type: "Part-time", appliedDate: "2024-02-01", lastUpdate: "2024-02-09" }
    ];
  });

  const [userProgress, setUserProgress] = useState(() => {
    const saved = localStorage.getItem('relink_userProgress');
    return saved ? JSON.parse(saved) : {
      profileCompletion: 85,
      jobSearchActivity: 90,
      networkingScore: 75,
      skillDevelopment: 60,
      communityEngagement: 95,
      documentSubmission: 80,
      interviewReadiness: 70,
      applicationQuality: 85
    };
  });

  const [weeklyActivity, setWeeklyActivity] = useState(() => {
    const saved = localStorage.getItem('relink_weeklyActivity');
    return saved ? JSON.parse(saved) : {
      views: [12, 19, 15, 22, 24, 18, 20],
      applications: [2, 3, 1, 4, 2, 3, 2],
      interviews: [0, 1, 0, 1, 0, 0, 1],
      messages: [5, 8, 6, 10, 7, 4, 3]
    };
  });

  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your document was verified", time: "2 hours ago", read: false, type: "success" },
    { id: 2, message: "New job match: Construction Foreman", time: "5 hours ago", read: false, type: "info" },
    { id: 3, message: "Interview tomorrow at 10 AM", time: "1 day ago", read: true, type: "warning" },
    { id: 4, message: "Profile viewed by 3 employers", time: "2 days ago", read: true, type: "info" }
  ]);

  const [achievements, setAchievements] = useState([
    { id: 1, title: "Profile Master", description: "Complete profile 100%", progress: 85, completed: false, icon: "📋", points: 50 },
    { id: 2, title: "Network Builder", description: "Connect with 10 employers", progress: 8, completed: false, icon: "🤝", points: 75 },
    { id: 3, title: "Job Seeker", description: "Apply to 20 jobs", progress: 12, completed: false, icon: "💼", points: 100 },
    { id: 4, title: "Document Ready", description: "Upload 5 verified documents", progress: 3, completed: false, icon: "📄", points: 60 }
  ]);

  // ==================== CREDIBILITY METRICS ====================
  const credibilityMetrics = [
    { 
      label: "Community Participation", 
      score: 85, 
      color: "#10b981", 
      points: 25, 
      icon: "👥",
      description: "Active in community events and forums",
      improvement: "Attend 2 more events this month",
      tasks: [
        "Join community forum discussion",
        "Attend Soweto Job Fair (Feb 20)",
        "Volunteer at local event"
      ]
    },
    { 
      label: "Professional Development", 
      score: 72, 
      color: "#059669", 
      points: 18, 
      icon: "📚",
      description: "Completed courses and certifications",
      improvement: "Complete the upcoming leadership workshop",
      tasks: [
        "Finish online safety course",
        "Attend leadership workshop",
        "Update skills section"
      ]
    },
    { 
      label: "Employment Stability", 
      score: 90, 
      color: "#047857", 
      points: 30, 
      icon: "💼",
      description: "Consistent employment history",
      improvement: "Maintain current position for 6+ months",
      tasks: [
        "Update employment history",
        "Add reference contacts",
        "Request employer verification"
      ]
    },
    { 
      label: "Mentorship Engagement", 
      score: 65, 
      color: "#065f46", 
      points: 15, 
      icon: "👨‍🏫",
      description: "Active mentor/mentee relationships",
      improvement: "Schedule monthly mentor meetings",
      tasks: [
        "Find a mentor in construction",
        "Schedule monthly check-in",
        "Attend mentorship workshop"
      ]
    },
    { 
      label: "Rehabilitation Completion", 
      score: 100, 
      color: "#064e3b", 
      points: 20, 
      icon: "✅",
      description: "Completed all required programs",
      improvement: "Perfect score - maintain this level",
      tasks: [
        "Maintain attendance record",
        "Complete follow-up sessions",
        "Share success story"
      ]
    },
    { 
      label: "Document Verification", 
      score: 80, 
      color: "#022c22", 
      points: 25, 
      icon: "📄",
      description: "Verified documents on file",
      improvement: "Upload outstanding certificates",
      tasks: [
        "Upload ID document",
        "Upload training certificate",
        "Verify police clearance"
      ]
    }
  ];

  // ==================== IMPROVEMENT SUGGESTIONS ====================
  const [improvementSuggestions, setImprovementSuggestions] = useState([
    {
      id: 1,
      title: "Complete Your Profile",
      description: "Add your skills and experience to increase visibility",
      impact: "+15 points",
      difficulty: "Easy",
      category: "profile",
      icon: "📋",
      completed: false,
      steps: ["Add work experience", "List skills", "Upload profile picture"]
    },
    {
      id: 2,
      title: "Attend Networking Event",
      description: "Join the upcoming Job Fair in Soweto",
      impact: "+10 points",
      difficulty: "Medium",
      category: "networking",
      icon: "🤝",
      completed: false,
      steps: ["Register for event", "Prepare introduction", "Bring copies of CV"]
    },
    {
      id: 3,
      title: "Upload Certificate",
      description: "Add your latest training certificate",
      impact: "+20 points",
      difficulty: "Easy",
      category: "documents",
      icon: "📜",
      completed: false,
      steps: ["Scan certificate", "Upload document", "Submit for verification"]
    },
    {
      id: 4,
      title: "Connect with Mentor",
      description: "Find a mentor in your industry",
      impact: "+25 points",
      difficulty: "Medium",
      category: "mentorship",
      icon: "👨‍🏫",
      completed: false,
      steps: ["Browse mentor directory", "Send connection request", "Schedule first meeting"]
    },
    {
      id: 5,
      title: "Apply for 5 Jobs",
      description: "Increase your chances with more applications",
      impact: "+30 points",
      difficulty: "Hard",
      category: "jobs",
      icon: "💼",
      completed: false,
      steps: ["Find suitable jobs", "Customize applications", "Track applications"]
    }
  ]);

  // ==================== GOALS ====================
  const [goals, setGoals] = useState([
    { id: 1, title: "Reach 85 credibility score", progress: 78, target: 85, deadline: "2024-03-01", category: "credibility" },
    { id: 2, title: "Apply to 20 jobs", progress: 12, target: 20, deadline: "2024-02-28", category: "jobs" },
    { id: 3, title: "Attend 5 networking events", progress: 2, target: 5, deadline: "2024-03-15", category: "networking" },
    { id: 4, title: "Complete 3 certifications", progress: 1, target: 3, deadline: "2024-03-30", category: "learning" }
  ]);

  // ==================== EFFECTS ====================
  useEffect(() => {
    localStorage.setItem('relink_quickStats', JSON.stringify(quickStats));
  }, [quickStats]);

  useEffect(() => {
    localStorage.setItem('relink_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('relink_jobsApplied', JSON.stringify(jobsApplied));
  }, [jobsApplied]);

  useEffect(() => {
    localStorage.setItem('relink_userProgress', JSON.stringify(userProgress));
  }, [userProgress]);

  useEffect(() => {
    localStorage.setItem('relink_weeklyActivity', JSON.stringify(weeklyActivity));
  }, [weeklyActivity]);

  // ==================== HELPER FUNCTIONS ====================
  const getStatusColor = (status) => {
    switch(status) {
      case 'accepted': return '#10b981';
      case 'interview': return '#3b82f6';
      case 'review': return '#f59e0b';
      case 'applied': return '#6b7280';
      case 'rejected': return '#ef4444';
      case 'upcoming': return '#10b981';
      case 'completed': return '#059669';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'rehab': return '#10b981';
      case 'medical': return '#3b82f6';
      case 'community': return '#8b5cf6';
      case 'volunteer': return '#f59e0b';
      case 'counseling': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const showTemporaryMessage = (message, type = 'success') => {
    setShowSuccessMessage({ text: message, type });
    setTimeout(() => setShowSuccessMessage(''), 3000);
  };

  // ==================== APPOINTMENT FUNCTIONS ====================
  const handleAddAppointment = (newAppointment) => {
    const appointment = {
      id: appointments.length + 1,
      ...newAppointment,
      status: 'upcoming'
    };
    setAppointments([...appointments, appointment]);
    showTemporaryMessage('Appointment added successfully');
  };

  const handleUpdateAppointment = (id, updates) => {
    const updatedAppointments = appointments.map(apt => 
      apt.id === id ? { ...apt, ...updates } : apt
    );
    setAppointments(updatedAppointments);
    setEditingAppointment(null);
    setShowAppointmentModal(false);
    showTemporaryMessage('Appointment updated');
  };

  const handleDeleteAppointment = (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      setAppointments(appointments.filter(apt => apt.id !== id));
      showTemporaryMessage('Appointment deleted');
    }
  };

  const handleAppointmentStatus = (id, status) => {
    const updatedAppointments = appointments.map(apt => 
      apt.id === id ? { ...apt, status: status } : apt
    );
    setAppointments(updatedAppointments);
    showTemporaryMessage(`Appointment marked as ${status}`);
  };

  const handleSetReminder = (id) => {
    const updatedAppointments = appointments.map(apt => 
      apt.id === id ? { ...apt, reminder: !apt.reminder } : apt
    );
    setAppointments(updatedAppointments);
    showTemporaryMessage('Reminder updated');
  };

  // ==================== JOB APPLICATION FUNCTIONS ====================
  const handleWithdrawApplication = (id) => {
    if (window.confirm('Withdraw this application?')) {
      setJobsApplied(jobsApplied.filter(job => job.id !== id));
      showTemporaryMessage('Application withdrawn');
    }
  };

  const handleSaveJob = (job) => {
    setQuickStats(prev => ({
      ...prev,
      savedJobs: prev.savedJobs + 1
    }));
    showTemporaryMessage('Job saved to bookmarks');
  };

  const handleShareJob = (job) => {
    navigator.clipboard.writeText(`Check out this job: ${job.title} at ${job.company}`);
    showTemporaryMessage('Job link copied to clipboard');
  };

  // ==================== CREDIBILITY SCORE FUNCTIONS ====================
  const refreshCredibilityScore = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newScore = Math.min(100, credibilityScore + 2);
      setCredibilityScore(newScore);
      setIsLoading(false);
      showTemporaryMessage('Credibility score updated!');
    }, 1500);
  };

  const calculatePotentialScore = () => {
    const maxPossible = credibilityMetrics.reduce((acc, metric) => {
      return acc + (metric.points * (metric.score < 100 ? 1 : 0));
    }, credibilityScore);
    return Math.min(100, maxPossible);
  };

  // ==================== PROGRESS FUNCTIONS ====================
  const updateProgress = (key, value) => {
    setUserProgress(prev => ({
      ...prev,
      [key]: value
    }));
    showTemporaryMessage(`${key} updated to ${value}%`);
  };

  const completeTask = (taskId) => {
    setImprovementSuggestions(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
    
    // Update credibility score
    setCredibilityScore(prev => Math.min(100, prev + 5));
    
    // Update achievements progress
    setAchievements(prev => 
      prev.map(ach => 
        ach.title.includes('Task') ? { ...ach, progress: ach.progress + 20 } : ach
      )
    );
    
    showTemporaryMessage('Task completed! +5 credibility points');
  };

  // ==================== REPORT FUNCTIONS ====================
  const generateMonthlyReport = () => {
    setIsLoading(true);
    setTimeout(() => {
      const report = {
        month: new Date().toLocaleString('default', { month: 'long', year: 'numeric' }),
        overview: {
          scoreChange: "+5",
          applicationsChange: "+12",
          viewsChange: "+18",
          connectionsChange: "+8",
          interviewsChange: "+25"
        },
        achievements: [
          "Reached 85% profile completion",
          "Successfully completed rehabilitation program",
          "Got interview with Unitrans Logistics",
          "Attended 3 community events",
          "Uploaded 2 verified documents"
        ],
        recommendations: [
          "Focus on skill development (currently at 60%)",
          "Apply to more construction positions",
          "Complete digital literacy course",
          "Connect with 5 more employers"
        ],
        nextMonthGoals: [
          "Increase credibility score to 85",
          "Secure job placement",
          "Attend 5 networking events",
          "Upload 2 more certificates",
          "Complete mentorship program"
        ],
        statistics: {
          applicationsSent: 12,
          interviewsAttended: 3,
          messagesExchanged: 48,
          profileViews: 124,
          connections: 18
        }
      };
      setReportData(report);
      setShowReportModal(true);
      setIsLoading(false);
    }, 1000);
  };

  const downloadReport = () => {
    const reportText = `
      RE-LINK MONTHLY PROGRESS REPORT
      ================================
      Month: ${reportData.month}
      
      OVERVIEW
      --------
      Credibility Score Change: ${reportData.overview.scoreChange}
      Applications: ${reportData.overview.applicationsChange}
      Profile Views: ${reportData.overview.viewsChange}
      Connections: ${reportData.overview.connectionsChange}
      Interviews: ${reportData.overview.interviewsChange}
      
      STATISTICS
      ----------
      Applications Sent: ${reportData.statistics.applicationsSent}
      Interviews Attended: ${reportData.statistics.interviewsAttended}
      Messages Exchanged: ${reportData.statistics.messagesExchanged}
      Profile Views: ${reportData.statistics.profileViews}
      Connections Made: ${reportData.statistics.connections}
      
      ACHIEVEMENTS
      ------------
      ${reportData.achievements.map(a => `✓ ${a}`).join('\n')}
      
      RECOMMENDATIONS
      ---------------
      ${reportData.recommendations.map(r => `• ${r}`).join('\n')}
      
      NEXT MONTH GOALS
      ----------------
      ${reportData.nextMonthGoals.map(g => `→ ${g}`).join('\n')}
      
      Generated on: ${new Date().toLocaleDateString()}
    `;
    
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RE-Link_Report_${reportData.month.replace(' ', '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showTemporaryMessage('Report downloaded successfully');
  };

  const emailReport = () => {
    window.location.href = `mailto:?subject=RE-Link Monthly Report ${reportData.month}&body=Please find attached my monthly progress report from RE-Link.`;
    showTemporaryMessage('Email client opened');
  };

  const printReport = () => {
    window.print();
  };

  // ==================== NOTIFICATION FUNCTIONS ====================
  const markNotificationAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
    showTemporaryMessage('All notifications marked as read');
  };

  const clearNotifications = () => {
    if (window.confirm('Clear all notifications?')) {
      setNotifications([]);
      showTemporaryMessage('Notifications cleared');
    }
  };

  // ==================== FILTER FUNCTIONS ====================
  const getFilteredJobs = () => {
    let filtered = jobsApplied;
    
    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (activeFilter !== 'all') {
      filtered = filtered.filter(job => job.status === activeFilter);
    }
    
    return filtered;
  };

  const getFilteredAppointments = () => {
    let filtered = appointments;
    
    if (searchTerm) {
      filtered = filtered.filter(apt => 
        apt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (activeFilter !== 'all') {
      filtered = filtered.filter(apt => apt.status === activeFilter);
    }
    
    return filtered;
  };

  // ==================== GOAL FUNCTIONS ====================
  const updateGoalProgress = (id, progress) => {
    setGoals(prev =>
      prev.map(goal =>
        goal.id === id ? { ...goal, progress } : goal
      )
    );
    showTemporaryMessage('Goal progress updated');
  };

  // ==================== RENDER FUNCTIONS ====================
  const renderReportModal = () => (
    <div className="report-modal-overlay" onClick={() => setShowReportModal(false)}>
      <div className="report-modal" onClick={e => e.stopPropagation()}>
        <div className="report-modal-header">
          <div className="report-title">
            <Award size={24} color="#10b981" />
            <h3>Monthly Progress Report</h3>
          </div>
          <button className="close-modal-btn" onClick={() => setShowReportModal(false)}>
            <X size={20} />
          </button>
        </div>
        
        <div className="report-content">
          <div className="report-period">
            <Calendar size={16} />
            <span>{reportData.month}</span>
          </div>

          <div className="report-stats-grid">
            <div className="report-stat-card" onClick={() => showTemporaryMessage('Score trend: +5% this month')}>
              <span className="report-stat-label">Score Change</span>
              <div className="report-stat-value positive">
                <ArrowUpRight size={20} />
                <span>{reportData.overview.scoreChange}</span>
              </div>
            </div>
            <div className="report-stat-card" onClick={() => showTemporaryMessage('Applications: 12 total')}>
              <span className="report-stat-label">Applications</span>
              <div className="report-stat-value positive">
                <ArrowUpRight size={20} />
                <span>{reportData.overview.applicationsChange}</span>
              </div>
            </div>
            <div className="report-stat-card" onClick={() => showTemporaryMessage('Views: 124 total')}>
              <span className="report-stat-label">Profile Views</span>
              <div className="report-stat-value positive">
                <ArrowUpRight size={20} />
                <span>{reportData.overview.viewsChange}</span>
              </div>
            </div>
            <div className="report-stat-card" onClick={() => showTemporaryMessage('Connections: 18 total')}>
              <span className="report-stat-label">Connections</span>
              <div className="report-stat-value positive">
                <ArrowUpRight size={20} />
                <span>{reportData.overview.connectionsChange}</span>
              </div>
            </div>
          </div>

          <div className="report-section">
            <h4 onClick={() => showTemporaryMessage('Your key achievements this month')}>
              <Star size={18} color="#f59e0b" />
              Key Achievements
            </h4>
            <div className="achievements-list">
              {reportData.achievements.map((achievement, index) => (
                <div key={index} className="achievement-item" onClick={() => showTemporaryMessage('Achievement unlocked!')}>
                  <CheckCircle size={16} color="#10b981" />
                  <span>{achievement}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="report-section">
            <h4 onClick={() => showTemporaryMessage('Personalized recommendations')}>
              <Lightbulb size={18} color="#3b82f6" />
              Recommendations
            </h4>
            <div className="recommendations-list">
              {reportData.recommendations.map((rec, index) => (
                <div key={index} className="recommendation-item" onClick={() => completeTask(index + 1)}>
                  <Sparkles size={16} color="#3b82f6" />
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="report-section">
            <h4 onClick={() => showTemporaryMessage('Set your goals for next month')}>
              <Target size={18} color="#8b5cf6" />
              Next Month Goals
            </h4>
            <div className="goals-list">
              {reportData.nextMonthGoals.map((goal, index) => (
                <div key={index} className="goal-item" onClick={() => updateGoalProgress(index + 1, 50)}>
                  <Rocket size={16} color="#8b5cf6" />
                  <span>{goal}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="report-section">
            <h4 onClick={() => showTemporaryMessage('Your activity statistics')}>
              <BarChart3 size={18} color="#10b981" />
              Statistics
            </h4>
            <div className="statistics-grid">
              <div className="stat-item" onClick={() => showTemporaryMessage('Applications sent')}>
                <span className="stat-label">Applications Sent</span>
                <span className="stat-value">{reportData.statistics.applicationsSent}</span>
              </div>
              <div className="stat-item" onClick={() => showTemporaryMessage('Interviews attended')}>
                <span className="stat-label">Interviews</span>
                <span className="stat-value">{reportData.statistics.interviewsAttended}</span>
              </div>
              <div className="stat-item" onClick={() => showTemporaryMessage('Messages exchanged')}>
                <span className="stat-label">Messages</span>
                <span className="stat-value">{reportData.statistics.messagesExchanged}</span>
              </div>
              <div className="stat-item" onClick={() => showTemporaryMessage('Profile views')}>
                <span className="stat-label">Profile Views</span>
                <span className="stat-value">{reportData.statistics.profileViews}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="report-modal-footer">
          <button className="download-report-btn" onClick={downloadReport}>
            <Download size={18} />
            <span>Download</span>
          </button>
          <button className="email-report-btn" onClick={emailReport}>
            <Mail size={18} />
            <span>Email</span>
          </button>
          <button className="print-report-btn" onClick={printReport}>
            <Printer size={18} />
            <span>Print</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderAppointmentModal = () => (
    <div className="modal-overlay" onClick={() => setShowAppointmentModal(false)}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{editingAppointment ? 'Edit Appointment' : 'Add Appointment'}</h3>
          <button className="close-btn" onClick={() => setShowAppointmentModal(false)}>
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const appointment = {
              title: formData.get('title'),
              type: formData.get('type'),
              date: formData.get('date'),
              time: formData.get('time'),
              location: formData.get('location'),
              notes: formData.get('notes'),
              reminder: formData.get('reminder') === 'on'
            };
            if (editingAppointment) {
              handleUpdateAppointment(editingAppointment.id, appointment);
            } else {
              handleAddAppointment(appointment);
            }
          }}>
            <div className="form-group">
              <label>Title</label>
              <input type="text" name="title" defaultValue={editingAppointment?.title} required />
            </div>
            <div className="form-group">
              <label>Type</label>
              <select name="type" defaultValue={editingAppointment?.type || 'rehab'}>
                <option value="rehab">Rehabilitation</option>
                <option value="medical">Medical</option>
                <option value="community">Community</option>
                <option value="volunteer">Volunteer</option>
                <option value="counseling">Counseling</option>
              </select>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Date</label>
                <input type="date" name="date" defaultValue={editingAppointment?.date} required />
              </div>
              <div className="form-group">
                <label>Time</label>
                <input type="time" name="time" defaultValue={editingAppointment?.time} required />
              </div>
            </div>
            <div className="form-group">
              <label>Location</label>
              <input type="text" name="location" defaultValue={editingAppointment?.location} required />
            </div>
            <div className="form-group">
              <label>Notes</label>
              <textarea name="notes" rows="3" defaultValue={editingAppointment?.notes}></textarea>
            </div>
            <div className="form-checkbox">
              <label>
                <input type="checkbox" name="reminder" defaultChecked={editingAppointment?.reminder} />
                Set reminder
              </label>
            </div>
            <div className="form-actions">
              <button type="submit" className="save-btn">
                <Save size={16} />
                {editingAppointment ? 'Update' : 'Save'}
              </button>
              <button type="button" className="cancel-btn" onClick={() => setShowAppointmentModal(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  const renderTaskModal = () => (
    <div className="modal-overlay" onClick={() => setShowTaskModal(false)}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{selectedTask?.title}</h3>
          <button className="close-btn" onClick={() => setShowTaskModal(false)}>
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          <p className="task-description">{selectedTask?.description}</p>
          <h4>Steps to complete:</h4>
          <ul className="task-steps">
            {selectedTask?.steps.map((step, index) => (
              <li key={index} onClick={() => showTemporaryMessage(`Step ${index + 1} completed!`)}>
                <CheckCircle size={16} color="#10b981" />
                {step}
              </li>
            ))}
          </ul>
          <div className="task-meta">
            <span className="task-impact">
              <Zap size={14} />
              {selectedTask?.impact}
            </span>
            <span className={`task-difficulty ${selectedTask?.difficulty.toLowerCase()}`}>
              {selectedTask?.difficulty}
            </span>
          </div>
          <button className="complete-task-btn" onClick={() => {
            completeTask(selectedTask.id);
            setShowTaskModal(false);
          }}>
            <CheckCircle size={16} />
            Mark as Complete
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="overview-tab">
      {/* Success Message Toast */}
      {showSuccessMessage && (
        <div className={`success-toast ${showSuccessMessage.type}`}>
          <CheckCircle size={20} />
          <span>{showSuccessMessage.text}</span>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      )}

      {/* Header with Enhanced Controls */}
      <div className="overview-header">
        <div className="header-left">
          <h3 className="section-title">
            <BarChart3 size={32} />
            <span>Your Dashboard</span>
            <span className="welcome-badge">Welcome back, {user?.name || 'Thabo'}!</span>
          </h3>
          <p className="section-subtitle">
            Track your progress, manage appointments, and achieve your goals
          </p>
        </div>
        
        <div className="header-actions">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search jobs, appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="clear-search" onClick={() => setSearchTerm('')}>
                <X size={14} />
              </button>
            )}
          </div>

          <div className="notification-bell" onClick={() => setShowNotifications(!showNotifications)}>
            <Bell size={20} />
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="notification-count">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </div>

          <div className="time-range-selector">
            <button 
              className={`time-range-btn ${selectedTimeRange === 'week' ? 'active' : ''}`}
              onClick={() => {
                setSelectedTimeRange('week');
                showTemporaryMessage('Showing weekly data');
              }}
            >
              Week
            </button>
            <button 
              className={`time-range-btn ${selectedTimeRange === 'month' ? 'active' : ''}`}
              onClick={() => {
                setSelectedTimeRange('month');
                showTemporaryMessage('Showing monthly data');
              }}
            >
              Month
            </button>
            <button 
              className={`time-range-btn ${selectedTimeRange === 'year' ? 'active' : ''}`}
              onClick={() => {
                setSelectedTimeRange('year');
                showTemporaryMessage('Showing yearly data');
              }}
            >
              Year
            </button>
          </div>

          <button className="generate-report-btn" onClick={generateMonthlyReport} disabled={isLoading}>
            <Download size={18} />
            <span>Generate Report</span>
          </button>
        </div>

        {/* Notifications Dropdown */}
        {showNotifications && (
          <div className="notifications-dropdown">
            <div className="notifications-header">
              <h4>Notifications</h4>
              <div className="notification-actions">
                <button onClick={markAllNotificationsRead}>Mark all read</button>
                <button onClick={clearNotifications}>Clear all</button>
              </div>
            </div>
            <div className="notifications-list">
              {notifications.length === 0 ? (
                <p className="no-notifications">No notifications</p>
              ) : (
                notifications.map(notif => (
                  <div 
                    key={notif.id} 
                    className={`notification-item ${!notif.read ? 'unread' : ''}`}
                    onClick={() => markNotificationAsRead(notif.id)}
                  >
                    <div className={`notification-icon ${notif.type}`}></div>
                    <div className="notification-content">
                      <p>{notif.message}</p>
                      <span className="notification-time">{notif.time}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Report Modal */}
      {showReportModal && reportData && renderReportModal()}

      {/* Appointment Modal */}
      {showAppointmentModal && renderAppointmentModal()}

      {/* Task Modal */}
      {showTaskModal && selectedTask && renderTaskModal()}

      {/* Enhanced Quick Stats Grid */}
      <div className="quick-stats-grid">
        <div className="quick-stat-card glass-effect" onClick={() => showTemporaryMessage('Daily profile views: ' + quickStats.dailyViews)}>
          <div className="quick-stat-icon gradient-green">
            <Eye size={24} />
          </div>
          <div className="quick-stat-content">
            <span className="quick-stat-number">{quickStats.dailyViews}</span>
            <span className="quick-stat-label">Daily Views</span>
          </div>
          <div className="quick-stat-trend positive">
            <TrendingUp size={16} />
            <span>+12%</span>
          </div>
        </div>
        
        <div className="quick-stat-card glass-effect" onClick={() => showTemporaryMessage('Weekly connections: ' + quickStats.weeklyConnections)}>
          <div className="quick-stat-icon gradient-blue">
            <Network size={24} />
          </div>
          <div className="quick-stat-content">
            <span className="quick-stat-number">{quickStats.weeklyConnections}</span>
            <span className="quick-stat-label">Connections</span>
          </div>
          <div className="quick-stat-trend positive">
            <TrendingUp size={16} />
            <span>+8%</span>
          </div>
        </div>
        
        <div className="quick-stat-card glass-effect" onClick={() => showTemporaryMessage('Monthly applications: ' + quickStats.monthlyApplications)}>
          <div className="quick-stat-icon gradient-purple">
            <Send size={24} />
          </div>
          <div className="quick-stat-content">
            <span className="quick-stat-number">{quickStats.monthlyApplications}</span>
            <span className="quick-stat-label">Applications</span>
          </div>
          <div className="quick-stat-trend positive">
            <TrendingUp size={16} />
            <span>+15%</span>
          </div>
        </div>
        
        <div className="quick-stat-card glass-effect" onClick={() => showTemporaryMessage('Total referrals: ' + quickStats.totalReferrals)}>
          <div className="quick-stat-icon gradient-orange">
            <FileText size={24} />
          </div>
          <div className="quick-stat-content">
            <span className="quick-stat-number">{quickStats.totalReferrals}</span>
            <span className="quick-stat-label">Referrals</span>
          </div>
          <div className="quick-stat-trend positive">
            <TrendingUp size={16} />
            <span>+5%</span>
          </div>
        </div>

        <div className="quick-stat-card glass-effect" onClick={() => showTemporaryMessage('Events attended: ' + quickStats.eventsAttended)}>
          <div className="quick-stat-icon gradient-red">
            <Users size={24} />
          </div>
          <div className="quick-stat-content">
            <span className="quick-stat-number">{quickStats.eventsAttended}</span>
            <span className="quick-stat-label">Events</span>
          </div>
          <div className="quick-stat-trend positive">
            <TrendingUp size={16} />
            <span>+25%</span>
          </div>
        </div>

        <div className="quick-stat-card glass-effect" onClick={() => showTemporaryMessage('Certificates earned: ' + quickStats.certificatesEarned)}>
          <div className="quick-stat-icon gradient-teal">
            <GraduationCap size={24} />
          </div>
          <div className="quick-stat-content">
            <span className="quick-stat-number">{quickStats.certificatesEarned}</span>
            <span className="quick-stat-label">Certificates</span>
          </div>
          <div className="quick-stat-trend positive">
            <TrendingUp size={16} />
            <span>+50%</span>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Enhanced Credibility Score Card */}
        <div className="dashboard-card large glass-effect">
          <div className="card-header">
            <h4 className="card-title">
              <Target size={20} />
              <span>Credibility Score</span>
            </h4>
            <button 
              className="card-action"
              onClick={refreshCredibilityScore}
              disabled={isLoading}
            >
              <RefreshCw size={16} className={isLoading ? 'spinning' : ''} />
            </button>
          </div>
          
          <div className="credibility-display">
            <div className="score-circle-large" onClick={() => showTemporaryMessage(`Potential score: ${calculatePotentialScore()}`)}>
              <div className="score-ring">
                <svg className="score-ring-svg" viewBox="0 0 120 120">
                  <circle 
                    className="score-ring-bg" 
                    cx="60" cy="60" r="54" 
                    fill="none" 
                    stroke="#e5e7eb" 
                    strokeWidth="8"
                  />
                  <circle 
                    className="score-ring-fill" 
                    cx="60" cy="60" r="54" 
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth="8"
                    strokeDasharray="339.292"
                    strokeDashoffset={339.292 - (339.292 * credibilityScore / 100)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="score-value-large">
                  {credibilityScore}
                  <span className="score-max">/100</span>
                </div>
              </div>
              <div className="score-badge" onClick={() => showTemporaryMessage('Gold Level - Top 15% of users')}>
                <Medal size={16} color="#f59e0b" />
                <span>Gold Level</span>
              </div>
              <div className="score-potential" onClick={() => showTemporaryMessage(`Complete tasks to reach ${calculatePotentialScore()}`)}>
                <Zap size={14} color="#10b981" />
                <span>Potential: {calculatePotentialScore()}</span>
              </div>
            </div>

            <div className="score-breakdown">
              {credibilityMetrics.map((metric, index) => (
                <div key={index} className="score-metric" onClick={() => showTemporaryMessage(metric.improvement)}>
                  <div className="metric-info">
                    <span className="metric-icon">{metric.icon}</span>
                    <div className="metric-details">
                      <span className="metric-label">{metric.label}</span>
                      <span className="metric-description">{metric.description}</span>
                    </div>
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

        {/* Upcoming Appointments with Full CRUD */}
        <div className="dashboard-card glass-effect">
          <div className="card-header">
            <h4 className="card-title">
              <Calendar size={20} />
              <span>Appointments</span>
            </h4>
            <button 
              className="card-action"
              onClick={() => {
                setEditingAppointment(null);
                setShowAppointmentModal(true);
              }}
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="filter-tabs">
            <button 
              className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-tab ${activeFilter === 'upcoming' ? 'active' : ''}`}
              onClick={() => setActiveFilter('upcoming')}
            >
              Upcoming
            </button>
            <button 
              className={`filter-tab ${activeFilter === 'completed' ? 'active' : ''}`}
              onClick={() => setActiveFilter('completed')}
            >
              Completed
            </button>
          </div>

          <div className="appointments-list">
            {getFilteredAppointments().length === 0 ? (
              <p className="no-items">No appointments found</p>
            ) : (
              getFilteredAppointments().map(appointment => (
                <div key={appointment.id} className="appointment-item">
                  <div className="appointment-time-indicator" onClick={() => showTemporaryMessage(`Time: ${appointment.time}`)}>
                    <Clock size={12} />
                    <span>{appointment.time}</span>
                  </div>
                  
                  <div className="appointment-type">
                    <div 
                      className="type-indicator"
                      style={{ backgroundColor: getTypeColor(appointment.type) }}
                      onClick={() => showTemporaryMessage(`Type: ${appointment.type}`)}
                    ></div>
                    <span className="appointment-title">{appointment.title}</span>
                  </div>
                  
                  <div className="appointment-details">
                    <span className="appointment-date" onClick={() => showTemporaryMessage(`Date: ${appointment.date}`)}>
                      {appointment.date}
                    </span>
                    <span className="appointment-location" onClick={() => showTemporaryMessage(`Location: ${appointment.location}`)}>
                      <MapPin size={10} />
                      {appointment.location}
                    </span>
                  </div>
                  
                  <div className="appointment-actions">
                    <button 
                      className={`reminder-btn ${appointment.reminder ? 'active' : ''}`}
                      onClick={() => handleSetReminder(appointment.id)}
                      title={appointment.reminder ? 'Reminder set' : 'Set reminder'}
                    >
                      <Bell size={14} />
                    </button>
                    <button 
                      className="status-btn"
                      onClick={() => handleAppointmentStatus(appointment.id, 'completed')}
                      title="Mark as completed"
                    >
                      <CheckCircle size={14} />
                    </button>
                    <button 
                      className="edit-btn"
                      onClick={() => {
                        setEditingAppointment(appointment);
                        setShowAppointmentModal(true);
                      }}
                      title="Edit"
                    >
                      <Edit size={14} />
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteAppointment(appointment.id)}
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {appointment.notes && (
                    <div className="appointment-notes" onClick={() => showTemporaryMessage(appointment.notes)}>
                      <FileText size={12} />
                      <span>{appointment.notes}</span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Jobs Applied with Enhanced Features */}
        <div className="dashboard-card glass-effect">
          <div className="card-header">
            <h4 className="card-title">
              <Briefcase size={20} />
              <span>Job Applications</span>
            </h4>
            <div className="card-stats">
              <span className="stat-badge success" onClick={() => showTemporaryMessage('Active applications')}>
                {jobsApplied.filter(j => j.status === 'interview' || j.status === 'review').length} Active
              </span>
              <span className="stat-badge" onClick={() => showTemporaryMessage('Total applications')}>
                {jobsApplied.length} Total
              </span>
            </div>
          </div>

          <div className="filter-tabs">
            <button 
              className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-tab ${activeFilter === 'applied' ? 'active' : ''}`}
              onClick={() => setActiveFilter('applied')}
            >
              Applied
            </button>
            <button 
              className={`filter-tab ${activeFilter === 'interview' ? 'active' : ''}`}
              onClick={() => setActiveFilter('interview')}
            >
              Interview
            </button>
            <button 
              className={`filter-tab ${activeFilter === 'accepted' ? 'active' : ''}`}
              onClick={() => setActiveFilter('accepted')}
            >
              Accepted
            </button>
          </div>

          <div className="applications-list">
            {getFilteredJobs().length === 0 ? (
              <p className="no-items">No job applications found</p>
            ) : (
              getFilteredJobs().map(job => (
                <div key={job.id} className="application-item">
                  <div className="application-info">
                    <span className="application-title" onClick={() => showTemporaryMessage(job.title)}>
                      {job.title}
                    </span>
                    <span className="application-company" onClick={() => showTemporaryMessage(`Company: ${job.company}`)}>
                      {job.company}
                    </span>
                    <div className="application-meta">
                      <span className="application-salary" onClick={() => showTemporaryMessage(`Salary: ${job.salary}`)}>
                        <DollarSign size={10} />
                        {job.salary}
                      </span>
                      <span className="application-location" onClick={() => showTemporaryMessage(`Location: ${job.location}`)}>
                        <MapPin size={10} />
                        {job.location}
                      </span>
                      <span className="application-type" onClick={() => showTemporaryMessage(`Type: ${job.type}`)}>
                        {job.type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="application-status">
                    <span 
                      className="status-badge" 
                      style={{ backgroundColor: `${getStatusColor(job.status)}20`, color: getStatusColor(job.status) }}
                      onClick={() => showTemporaryMessage(`Status: ${job.status}`)}
                    >
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </span>
                    <span className="application-date" onClick={() => showTemporaryMessage(`Applied: ${job.appliedDate}`)}>
                      {job.appliedDate}
                    </span>
                    {job.status === 'interview' && (
                      <button 
                        className="schedule-btn"
                        onClick={() => showTemporaryMessage('Schedule interview')}
                        title="Schedule interview"
                      >
                        <Video size={12} />
                      </button>
                    )}
                    <button 
                      className="save-job-btn"
                      onClick={() => handleSaveJob(job)}
                      title="Save job"
                    >
                      <Star size={12} />
                    </button>
                    <button 
                      className="share-job-btn"
                      onClick={() => handleShareJob(job)}
                      title="Share job"
                    >
                      <Send size={12} />
                    </button>
                    <button 
                      className="withdraw-btn"
                      onClick={() => handleWithdrawApplication(job.id)}
                      title="Withdraw application"
                    >
                      <X size={12} />
                    </button>
                  </div>

                  {job.lastUpdate !== job.appliedDate && (
                    <div className="application-update" onClick={() => showTemporaryMessage(`Last updated: ${job.lastUpdate}`)}>
                      <Clock size={10} />
                      <span>Updated {job.lastUpdate}</span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* User Progress with Interactive Elements */}
        <div className="dashboard-card glass-effect">
          <div className="card-header">
            <h4 className="card-title">
              <Activity size={20} />
              <span>Progress Tracker</span>
            </h4>
            <span className="card-badge" onClick={() => showTemporaryMessage('Overall progress: 85%')}>
              85% Overall
            </span>
          </div>

          <div className="progress-metrics">
            {Object.entries(userProgress).map(([key, value]) => (
              <div key={key} className="progress-item">
                <div className="progress-label">
                  <span className="progress-name" onClick={() => showTemporaryMessage(`Click to update ${key}`)}>
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                  <span className="progress-value">{value}%</span>
                </div>
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar"
                    onClick={() => {
                      const newValue = Math.min(100, value + 5);
                      updateProgress(key, newValue);
                    }}
                  >
                    <div 
                      className="progress-fill"
                      style={{ 
                        width: `${value}%`,
                        background: `linear-gradient(90deg, #10b981, ${value > 70 ? '#059669' : '#f59e0b'})`
                      }}
                    ></div>
                  </div>
                  {value < 70 && (
                    <span className="progress-warning" onClick={() => showTemporaryMessage('Needs improvement')}>
                      <AlertCircle size={12} />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Goals Section */}
          <div className="goals-section">
            <h5 onClick={() => showTemporaryMessage('Your monthly goals')}>
              <Target size={14} />
              Monthly Goals
            </h5>
            {goals.map(goal => (
              <div key={goal.id} className="goal-progress" onClick={() => showTemporaryMessage(`Goal: ${goal.title}`)}>
                <div className="goal-info">
                  <span className="goal-title">{goal.title}</span>
                  <span className="goal-deadline">Due: {goal.deadline}</span>
                </div>
                <div className="goal-bar-container">
                  <div 
                    className="goal-bar"
                    style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                  ></div>
                  <span className="goal-value">{goal.progress}/{goal.target}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="dashboard-card glass-effect">
          <div className="card-header">
            <h4 className="card-title">
              <Award size={20} />
              <span>Achievements</span>
            </h4>
            <span className="card-badge" onClick={() => showTemporaryMessage('4 achievements in progress')}>
              {achievements.filter(a => !a.completed).length} In Progress
            </span>
          </div>

          <div className="achievements-grid">
            {achievements.map(achievement => (
              <div 
                key={achievement.id} 
                className={`achievement-badge ${achievement.completed ? 'completed' : ''}`}
                onClick={() => showTemporaryMessage(achievement.description)}
              >
                <div className="achievement-icon">{achievement.icon}</div>
                <div className="achievement-info">
                  <span className="achievement-title">{achievement.title}</span>
                  <div className="achievement-progress">
                    <div 
                      className="achievement-progress-bar"
                      style={{ width: `${achievement.progress}%` }}
                    ></div>
                    <span className="achievement-progress-text">{achievement.progress}%</span>
                  </div>
                  <span className="achievement-points">+{achievement.points} pts</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Improvement Suggestions with Actions */}
        <div className="dashboard-card full-width glass-effect">
          <div className="card-header">
            <h4 className="card-title">
              <Lightbulb size={20} />
              <span>Recommended Actions</span>
            </h4>
            <span className="card-badge" onClick={() => showTemporaryMessage(`${improvementSuggestions.filter(t => !t.completed).length} tasks available`)}>
              {improvementSuggestions.filter(t => !t.completed).length} Tasks
            </span>
          </div>

          <div className="suggestions-grid">
            {improvementSuggestions
              .filter(task => !task.completed)
              .map(suggestion => (
                <div 
                  key={suggestion.id} 
                  className="suggestion-card"
                  onClick={() => {
                    setSelectedTask(suggestion);
                    setShowTaskModal(true);
                  }}
                >
                  <div className="suggestion-icon">{suggestion.icon}</div>
                  <div className="suggestion-content">
                    <h5 className="suggestion-title">{suggestion.title}</h5>
                    <p className="suggestion-description">{suggestion.description}</p>
                    <div className="suggestion-meta">
                      <span className="suggestion-impact">
                        <Zap size={12} />
                        {suggestion.impact}
                      </span>
                      <span className={`suggestion-difficulty ${suggestion.difficulty.toLowerCase()}`}>
                        {suggestion.difficulty}
                      </span>
                    </div>
                  </div>
                  <button className="suggestion-action">
                    <ChevronRight size={16} />
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Enhanced Recent Activity */}
      <div className="recent-activity glass-effect">
        <div className="activity-header">
          <h4 className="activity-title">Recent Activity</h4>
          <div className="activity-filters">
            <button className="activity-filter active">All</button>
            <button className="activity-filter">Applications</button>
            <button className="activity-filter">Messages</button>
            <button className="activity-filter">Documents</button>
          </div>
          <button className="view-all-btn" onClick={() => showTemporaryMessage('View all activity')}>
            View All
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="activity-list">
          <div className="activity-item" onClick={() => showTemporaryMessage('Application submitted successfully')}>
            <div className="activity-icon success">
              <CheckCircle size={16} />
            </div>
            <div className="activity-content">
              <span className="activity-text">Applied for Construction Supervisor at BuildRight</span>
              <div className="activity-meta">
                <span className="activity-time">2 hours ago</span>
                <span className="activity-status success">Success</span>
              </div>
            </div>
          </div>

          <div className="activity-item" onClick={() => showTemporaryMessage('Document pending verification')}>
            <div className="activity-icon info">
              <FileText size={16} />
            </div>
            <div className="activity-content">
              <span className="activity-text">Uploaded Police Clearance Certificate</span>
              <div className="activity-meta">
                <span className="activity-time">1 day ago</span>
                <span className="activity-status pending">Pending</span>
              </div>
            </div>
          </div>

          <div className="activity-item" onClick={() => showTemporaryMessage('Appointment scheduled')}>
            <div className="activity-icon warning">
              <Calendar size={16} />
            </div>
            <div className="activity-content">
              <span className="activity-text">Scheduled Rehabilitation Session</span>
              <div className="activity-meta">
                <span className="activity-time">2 days ago</span>
                <span className="activity-status info">Upcoming</span>
              </div>
            </div>
          </div>

          <div className="activity-item" onClick={() => showTemporaryMessage('Profile viewed by employer')}>
            <div className="activity-icon success">
              <Eye size={16} />
            </div>
            <div className="activity-content">
              <span className="activity-text">Your profile was viewed by 3 employers</span>
              <div className="activity-meta">
                <span className="activity-time">3 days ago</span>
                <span className="activity-status success">Viewed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Activity Summary */}
      <div className="weekly-summary glass-effect">
        <div className="summary-header">
          <h4>Weekly Summary</h4>
          <div className="summary-stats">
            <div className="summary-stat" onClick={() => showTemporaryMessage(`Total views this week: ${weeklyActivity.views.reduce((a, b) => a + b, 0)}`)}>
              <Eye size={14} />
              <span>{weeklyActivity.views.reduce((a, b) => a + b, 0)} Views</span>
            </div>
            <div className="summary-stat" onClick={() => showTemporaryMessage(`Total applications: ${weeklyActivity.applications.reduce((a, b) => a + b, 0)}`)}>
              <Send size={14} />
              <span>{weeklyActivity.applications.reduce((a, b) => a + b, 0)} Apps</span>
            </div>
            <div className="summary-stat" onClick={() => showTemporaryMessage(`Interviews scheduled: ${weeklyActivity.interviews.reduce((a, b) => a + b, 0)}`)}>
              <Video size={14} />
              <span>{weeklyActivity.interviews.reduce((a, b) => a + b, 0)} Interviews</span>
            </div>
          </div>
        </div>
        
        <div className="week-days">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
            <div 
              key={day} 
              className="day-column"
              onClick={() => showTemporaryMessage(`${day}: ${weeklyActivity.views[index]} views, ${weeklyActivity.applications[index]} applications`)}
            >
              <span className="day-name">{day}</span>
              <div className="day-activities">
                <div 
                  className="day-activity views"
                  style={{ height: `${weeklyActivity.views[index] * 3}px` }}
                  title={`${weeklyActivity.views[index]} views`}
                ></div>
                <div 
                  className="day-activity apps"
                  style={{ height: `${weeklyActivity.applications[index] * 10}px` }}
                  title={`${weeklyActivity.applications[index]} applications`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OverviewTab;