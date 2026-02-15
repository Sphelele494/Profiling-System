import React, { useState, useEffect, useRef } from 'react';
import {
  Users, FileText, UploadCloud, Upload, Loader2, Eye, Download,
  Clock4, Edit, Calendar, ShieldCheck, X, CheckCircle, Lock,
  Award, Briefcase, GraduationCap, HandHeart, Shield, Plus,
  PieChart, TrendingUp, AlertCircle, Search, Filter, Star,
  MapPin, Bell, Gift, Coffee, Globe, BookOpen, Zap,
  Target, ThumbsUp, MessageSquare, Share2, Bookmark,
  HelpCircle, Info, CheckSquare, AlertTriangle, Settings,
  Printer, Mail, Phone, Video, ExternalLink, RefreshCw,
  Archive, Trash2, Copy, Save, Volume2, VolumeX, Maximize2,
  Minimize2, Moon, Sun, Clock, DollarSign, CreditCard,
  Building, Home, Heart, Activity, Smile, Frown,
  Flag, Globe2, Wifi, WifiOff, Battery, BatteryCharging
} from "lucide-react";

function CommunityTab({ user, credibilityScore, setCredibilityScore }) {
  // ==================== STATE MANAGEMENT ====================
  const [referralType, setReferralType] = useState("employer");
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showSensitiveInfo, setShowSensitiveInfo] = useState(false);
  const [activeTab, setActiveTab] = useState("documents");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [showScoreBreakdown, setShowScoreBreakdown] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showComparison, setShowComparison] = useState(false);
  const [showGrants, setShowGrants] = useState(false);
  const [showEvents, setShowEvents] = useState(true);
  const [showVolunteer, setShowVolunteer] = useState(true);
  const [showMeetings, setShowMeetings] = useState(true);
  const [showNotices, setShowNotices] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState("normal");
  const [notifications, setNotifications] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastSync, setLastSync] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Refs
  const fileInputRef = useRef(null);
  const scannerRef = useRef(null);
  const modalRef = useRef(null);

  // ==================== FIXED: ADDED MISSING referralTypes ARRAY ====================
  const referralTypes = [
    { id: 'employer', label: 'Employer', icon: Briefcase, points: 15 },
    { id: 'rehab', label: 'Rehabilitation', icon: HandHeart, points: 20 },
    { id: 'police', label: 'Police Clearance', icon: Shield, points: 25 },
    { id: 'community', label: 'Community Leader', icon: Users, points: 10 },
    { id: 'volunteer', label: 'Volunteer', icon: Heart, points: 12 },
    { id: 'education', label: 'Education', icon: GraduationCap, points: 18 },
    { id: 'clearance', label: 'Security Clearance', icon: ShieldCheck, points: 30 }
  ];

  // ==================== DATA STRUCTURES ====================

  // Enhanced Referral Documents with full metadata
  const [referralDocuments, setReferralDocuments] = useState([
    { 
      id: 1, 
      name: "Police Clearance Certificate.pdf", 
      type: "clearance", 
      date: "2024-02-10", 
      status: "verified", 
      points: 30, 
      size: "2.5 MB",
      verifiedBy: "SAPS Verification System",
      verifiedDate: "2024-02-11",
      expiryDate: "2025-02-10",
      version: 1,
      hash: "0x7d3a...f2b1",
      ocrText: "Police Clearance Certificate...",
      tags: ["clearance", "saps", "verified"],
      comments: []
    },
    { 
      id: 2, 
      name: "Rehabilitation Certificate.jpg", 
      type: "rehab", 
      date: "2024-02-05", 
      status: "verified", 
      points: 20, 
      size: "1.8 MB",
      verifiedBy: "DCS Verification",
      verifiedDate: "2024-02-06",
      expiryDate: "2025-02-05",
      version: 1,
      hash: "0x9f4c...e3d2",
      ocrText: "Rehabilitation Completion Certificate...",
      tags: ["rehab", "dcs", "verified"],
      comments: []
    },
    { 
      id: 3, 
      name: "Previous Employer Reference.pdf", 
      type: "employer", 
      date: "2024-02-01", 
      status: "pending", 
      points: 15, 
      size: "3.2 MB",
      version: 1,
      hash: "0x2b5a...c7d8",
      tags: ["employer", "pending"],
      comments: []
    }
  ]);

  // Document history for version tracking
  const [documentHistory, setDocumentHistory] = useState([
    { docId: 1, version: 1, date: "2024-02-10", action: "upload", user: "Thabo M." },
    { docId: 1, version: 2, date: "2024-02-11", action: "verify", user: "SAPS System" },
    { docId: 2, version: 1, date: "2024-02-05", action: "upload", user: "Thabo M." },
    { docId: 2, version: 2, date: "2024-02-06", action: "verify", user: "DCS System" }
  ]);

  // Enhanced Credibility Metrics
  const credibilityMetrics = [
    { 
      label: "Community Participation", 
      score: 85, 
      color: "#10b981", 
      points: 25, 
      icon: "👥",
      description: "Based on event attendance and community engagement",
      improvement: "Attend 3 more community events this month",
      target: 90,
      industryAvg: 72,
      history: [65, 70, 78, 82, 85]
    },
    { 
      label: "Professional Development", 
      score: 72, 
      color: "#059669", 
      points: 18, 
      icon: "📚",
      description: "Courses completed and skills acquired",
      improvement: "Complete Construction Supervisor Course",
      target: 85,
      industryAvg: 68,
      history: [50, 55, 62, 68, 72]
    },
    { 
      label: "Employment Stability", 
      score: 90, 
      color: "#047857", 
      points: 30, 
      icon: "💼",
      description: "Consistent employment history",
      improvement: "Maintain current position for 6 months",
      target: 95,
      industryAvg: 75,
      history: [70, 80, 85, 88, 90]
    },
    { 
      label: "Mentorship Engagement", 
      score: 65, 
      color: "#065f46", 
      points: 15, 
      icon: "👨‍🏫",
      description: "Both receiving and providing mentorship",
      improvement: "Sign up as a mentor for new members",
      target: 80,
      industryAvg: 55,
      history: [40, 45, 52, 58, 65]
    },
    { 
      label: "Rehabilitation Completion", 
      score: 100, 
      color: "#064e3b", 
      points: 20, 
      icon: "✅",
      description: "All required programs completed",
      improvement: "Perfect score achieved!",
      target: 100,
      industryAvg: 82,
      history: [60, 75, 85, 95, 100]
    },
    { 
      label: "Document Verification", 
      score: 80, 
      color: "#022c22", 
      points: 25, 
      icon: "📄",
      description: "Verified documents uploaded",
      improvement: "Upload and verify 2 more documents",
      target: 90,
      industryAvg: 65,
      history: [40, 55, 65, 72, 80]
    }
  ];

  // Score improvement suggestions
  const scoreSuggestions = [
    { 
      id: 1,
      action: "Upload Police Clearance Certificate",
      points: 30,
      difficulty: "easy",
      timeEstimate: "10 min",
      status: "pending",
      category: "documents"
    },
    { 
      id: 2,
      action: "Complete Construction Safety Course",
      points: 25,
      difficulty: "medium",
      timeEstimate: "2 hours",
      status: "in-progress",
      category: "education"
    },
    { 
      id: 3,
      action: "Attend Soweto Job Fair",
      points: 15,
      difficulty: "easy",
      timeEstimate: "4 hours",
      status: "pending",
      category: "events"
    },
    { 
      id: 4,
      action: "Get Employer Reference Letter",
      points: 20,
      difficulty: "medium",
      timeEstimate: "1 week",
      status: "pending",
      category: "referrals"
    },
    { 
      id: 5,
      action: "Complete 3 Months Employment",
      points: 50,
      difficulty: "hard",
      timeEstimate: "3 months",
      status: "in-progress",
      category: "employment",
      progress: 65
    }
  ];

  // Government Grants
  const governmentGrants = [
    {
      id: 1,
      name: "DCS Reintegration Grant",
      amount: "R5,000",
      eligibility: "Released within last 12 months",
      deadline: "2024-12-31",
      documents: ["Release Certificate", "ID", "Bank Statement"],
      status: "available",
      probability: "high",
      description: "Monthly reintegration support for ex-offenders"
    },
    {
      id: 2,
      name: "SASSA Skills Development",
      amount: "R3,500",
      eligibility: "Registered for approved training",
      deadline: "2024-06-30",
      documents: ["Training Enrollment", "ID", "Proof of Residence"],
      status: "available",
      probability: "medium",
      description: "Training allowance for skill development"
    },
    {
      id: 3,
      name: "NYDA Youth Employment",
      amount: "R2,800",
      eligibility: "Aged 18-35, unemployed",
      deadline: "2024-09-15",
      documents: ["ID", "CV", "Bank Account"],
      status: "available",
      probability: "high",
      description: "Youth employment incentive program"
    },
    {
      id: 4,
      name: "Housing Subsidy",
      amount: "R15,000",
      eligibility: "First-time home buyer, employed",
      deadline: "2024-11-30",
      documents: ["Employment Letter", "ID", "Credit Check"],
      status: "limited",
      probability: "medium",
      description: "Assistance with housing deposit"
    }
  ];

  // SAPS Integration Status
  const [sapsStatus, setSapsStatus] = useState({
    connected: true,
    lastCheck: "2024-02-15 09:30",
    clearanceValid: true,
    clearanceNumber: "SAPS-CLR-2024-01234",
    nextRenewal: "2025-02-10"
  });

  // DCS Integration Status
  const [dcsStatus, setDcsStatus] = useState({
    connected: true,
    offenderNumber: "DCS-2019-87654",
    status: "parole",
    paroleOfficer: "Mr. Johannes Ndlovu",
    nextMeeting: "2024-03-01",
    compliance: 95
  });

  // Bank Verification Status
  const [bankStatus, setBankStatus] = useState({
    verified: true,
    bank: "FNB",
    accountType: "Savings",
    verifiedDate: "2024-01-15",
    salaryPayments: true
  });

  // Enhanced Events Calendar
  const [communityEvents, setCommunityEvents] = useState([
    {
      id: 1,
      title: "Job Fair 2024 - Soweto",
      date: "2024-02-15",
      time: "9:00 AM - 4:00 PM",
      location: "Soweto Expo Centre",
      address: "123 Chris Hani Road, Soweto",
      description: "Connect with 50+ employers hiring in construction, retail, and logistics",
      organizer: "RE-Link SA",
      capacity: 500,
      registered: 342,
      type: "job-fair",
      speakers: ["Thabo Mbeki", "Cyril Ramaphosa"],
      requirements: ["ID", "CV"],
      points: 15,
      rsvpStatus: "attending",
      image: "job-fair.jpg"
    },
    {
      id: 2,
      title: "Skills Workshop - Johannesburg",
      date: "2024-02-22",
      time: "2:00 PM - 5:00 PM",
      location: "Johannesburg Career Centre",
      address: "45 Main Street, Johannesburg CBD",
      description: "Interview skills, CV writing, and professional networking",
      organizer: "Career Development SA",
      capacity: 100,
      registered: 67,
      type: "workshop",
      speakers: ["Mary Ndlovu", "Peter Smith"],
      requirements: ["None"],
      points: 10,
      rsvpStatus: "pending",
      image: "workshop.jpg"
    },
    {
      id: 3,
      title: "Mentorship Meetup - Pretoria",
      date: "2024-03-05",
      time: "10:00 AM - 1:00 PM",
      location: "Pretoria Community Hall",
      address: "78 Church Street, Pretoria",
      description: "Connect with mentors in various industries",
      organizer: "RE-Link Mentorship Program",
      capacity: 50,
      registered: 23,
      type: "networking",
      speakers: ["Dr. Khumalo", "Sipho Dlamini"],
      requirements: ["None"],
      points: 20,
      rsvpStatus: "not-attending",
      image: "mentorship.jpg"
    }
  ]);

  // Volunteer Opportunities
  const volunteerOpportunities = [
    {
      id: 1,
      title: "Community Cleanup - Soweto",
      organization: "Soweto Green",
      date: "2024-02-24",
      time: "8:00 AM - 12:00 PM",
      location: "Orlando West, Soweto",
      description: "Help clean and beautify community spaces",
      skills: ["Physical work", "Teamwork"],
      slots: 30,
      filled: 18,
      points: 10,
      certificate: true
    },
    {
      id: 2,
      title: "Youth Mentor - Weekend Program",
      organization: "RE-Link Youth",
      date: "Every Saturday",
      time: "9:00 AM - 1:00 PM",
      location: "Johannesburg",
      description: "Mentor at-risk youth in life skills",
      skills: ["Mentoring", "Patience", "Communication"],
      slots: 15,
      filled: 8,
      points: 25,
      certificate: true
    },
    {
      id: 3,
      title: "Food Bank Distribution",
      organization: "Soweto Food Bank",
      date: "2024-02-28",
      time: "10:00 AM - 3:00 PM",
      location: "Pimville, Soweto",
      description: "Help sort and distribute food parcels",
      skills: ["Organization", "Customer service"],
      slots: 20,
      filled: 12,
      points: 15,
      certificate: true
    }
  ];

  // Community Meetings
  const communityMeetings = [
    {
      id: 1,
      title: "Soweto Ex-Offender Support Group",
      date: "2024-02-20",
      time: "5:00 PM - 7:00 PM",
      location: "Soweto Community Centre",
      facilitator: "Thabo M.",
      topic: "Overcoming Employment Barriers",
      attendees: 45,
      type: "support-group"
    },
    {
      id: 2,
      title: "Community Leaders Forum",
      date: "2024-02-27",
      time: "6:00 PM - 8:00 PM",
      location: "Johannesburg City Hall",
      facilitator: "Councillor Dlamini",
      topic: "Reintegration Policy Discussion",
      attendees: 120,
      type: "forum"
    }
  ];

  // Community Notices
  const communityNotices = [
    {
      id: 1,
      title: "New Skills Training Program Available",
      date: "2024-02-14",
      category: "announcement",
      content: "Free construction skills training starting March 1st",
      important: true,
      expires: "2024-03-01"
    },
    {
      id: 2,
      title: "Employment Opportunity: BuildRight Hiring",
      date: "2024-02-13",
      category: "job",
      content: "10 positions available for construction workers",
      important: true,
      expires: "2024-02-28"
    },
    {
      id: 3,
      title: "RE-Link Platform Maintenance",
      date: "2024-02-15",
      category: "system",
      content: "Scheduled maintenance on Feb 20, 2-4 AM",
      important: false,
      expires: "2024-02-21"
    }
  ];

  // ==================== EFFECTS ====================

  useEffect(() => {
    // Online/Offline detection
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Battery status
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        setBatteryLevel(battery.level * 100);
        battery.addEventListener('levelchange', () => {
          setBatteryLevel(battery.level * 100);
        });
      });
    }

    // Load saved data
    loadSavedData();

    // Auto-sync every 5 minutes
    const syncInterval = setInterval(() => {
      if (isOnline) {
        syncData();
      }
    }, 300000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(syncInterval);
    };
  }, []);

  // ==================== DATA FUNCTIONS ====================

  const loadSavedData = () => {
    try {
      const savedDocs = localStorage.getItem('relink_documents');
      if (savedDocs) {
        setReferralDocuments(JSON.parse(savedDocs));
      }
      
      const savedEvents = localStorage.getItem('relink_events_rsvp');
      if (savedEvents) {
        const rsvpData = JSON.parse(savedEvents);
        setCommunityEvents(prev => prev.map(event => ({
          ...event,
          rsvpStatus: rsvpData[event.id] || event.rsvpStatus
        })));
      }
      
      addNotification('Data loaded successfully', 'success');
    } catch (error) {
      setError('Failed to load saved data');
      addNotification('Failed to load data', 'error');
    }
  };

  const syncData = async () => {
    setIsLoading(true);
    try {
      // Simulate sync with server
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLastSync(new Date());
      addNotification('Sync completed successfully', 'success');
    } catch (error) {
      addNotification('Sync failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const addNotification = (message, type) => {
    const newNotification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    };
    setNotifications(prev => [newNotification, ...prev].slice(0, 5));
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  // ==================== DOCUMENT FUNCTIONS ====================

  const handleDocumentUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      addNotification('Please upload PDF, JPG, or PNG files only.', 'error');
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      addNotification('File size too large. Maximum 10MB.', 'error');
      return;
    }
    
    setUploadingFile(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    
    try {
      // Simulate OCR processing
      const ocrText = await simulateOCR(file);
      
      setTimeout(() => {
        clearInterval(interval);
        setUploadProgress(100);
        
        const newDocument = {
          id: referralDocuments.length + 1,
          name: file.name,
          type: referralType,
          date: new Date().toLocaleDateString('en-ZA'),
          status: "pending",
          points: getReferralPoints(referralType),
          size: (file.size / 1024 / 1024).toFixed(2) + " MB",
          version: 1,
          hash: generateHash(file.name + Date.now()),
          ocrText: ocrText,
          tags: [referralType, "pending"],
          comments: []
        };
        
        setReferralDocuments([newDocument, ...referralDocuments]);
        
        // Add to history
        setDocumentHistory(prev => [{
          docId: newDocument.id,
          version: 1,
          date: new Date().toLocaleDateString('en-ZA'),
          action: "upload",
          user: user?.name || "User"
        }, ...prev]);
        
        // Update credibility score
        const newScore = Math.min(100, credibilityScore + newDocument.points);
        setCredibilityScore(newScore);
        localStorage.setItem('relink_credibility_score', newScore.toString());
        localStorage.setItem('relink_documents', JSON.stringify([newDocument, ...referralDocuments]));
        
        setUploadingFile(false);
        addNotification(`Document uploaded successfully! +${newDocument.points} points`, 'success');
        
        // Trigger verification check
        checkDocumentVerification(newDocument);
      }, 2000);
    } catch (error) {
      clearInterval(interval);
      setUploadingFile(false);
      addNotification('Upload failed. Please try again.', 'error');
    }
  };

  const simulateOCR = (file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockOCR = `Extracted text from ${file.name}\nDocument Type: ${referralType}\nDate: ${new Date().toLocaleDateString()}\nReference: REF-${Math.floor(Math.random() * 10000)}`;
        resolve(mockOCR);
      }, 1500);
    });
  };

  const generateHash = (input) => {
    return '0x' + Math.random().toString(36).substring(2, 10) + '...' + 
           Math.random().toString(36).substring(2, 6);
  };

  const checkDocumentVerification = (document) => {
    // Simulate automatic verification for certain document types
    if (document.type === 'clearance' || document.type === 'rehab') {
      setTimeout(() => {
        verifyDocument(document.id, 'system');
      }, 5000);
    }
  };

  const verifyDocument = (docId, verifier) => {
    setReferralDocuments(prev => prev.map(doc => 
      doc.id === docId 
        ? { 
            ...doc, 
            status: "verified", 
            verifiedBy: verifier === 'system' ? 'Automated System' : verifier,
            verifiedDate: new Date().toLocaleDateString('en-ZA'),
            expiryDate: calculateExpiryDate(doc.type)
          }
        : doc
    ));
    
    setDocumentHistory(prev => [{
      docId: docId,
      version: prev.filter(h => h.docId === docId).length + 1,
      date: new Date().toLocaleDateString('en-ZA'),
      action: "verify",
      user: verifier === 'system' ? 'System' : 'Verification Officer'
    }, ...prev]);
    
    addNotification('Document verified successfully!', 'success');
  };

  const calculateExpiryDate = (type) => {
    const date = new Date();
    switch(type) {
      case 'clearance':
        date.setFullYear(date.getFullYear() + 1);
        break;
      case 'rehab':
        date.setFullYear(date.getFullYear() + 2);
        break;
      default:
        date.setFullYear(date.getFullYear() + 5);
    }
    return date.toLocaleDateString('en-ZA');
  };

  const checkExpiredDocuments = () => {
    const today = new Date();
    return referralDocuments.filter(doc => {
      if (!doc.expiryDate) return false;
      const expiry = new Date(doc.expiryDate);
      return expiry < today;
    });
  };

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

  const handleDeleteDocument = (docId) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setReferralDocuments(prev => prev.filter(doc => doc.id !== docId));
      setDocumentHistory(prev => prev.filter(h => h.docId !== docId));
      addNotification('Document deleted', 'info');
    }
  };

  const handleRestoreVersion = (docId, version) => {
    // Simulate restoring previous version
    addNotification(`Restored version ${version}`, 'success');
  };

  // ==================== INTEGRATION FUNCTIONS ====================

  const checkSAPSClearance = async () => {
    setIsLoading(true);
    try {
      // Simulate SAPS API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSapsStatus({
        ...sapsStatus,
        lastCheck: new Date().toLocaleString(),
        clearanceValid: true
      });
      
      addNotification('SAPS clearance verified successfully', 'success');
    } catch (error) {
      addNotification('SAPS verification failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const checkDCSStatus = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setDcsStatus({
        ...dcsStatus,
        lastCheck: new Date().toLocaleString(),
        status: "parole",
        compliance: 95
      });
      
      addNotification('DCS status updated', 'success');
    } catch (error) {
      addNotification('DCS check failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyBankAccount = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setBankStatus({
        ...bankStatus,
        verified: true,
        verifiedDate: new Date().toLocaleDateString()
      });
      
      addNotification('Bank account verified', 'success');
    } catch (error) {
      addNotification('Bank verification failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // ==================== GRANT FUNCTIONS ====================

  const checkGrantEligibility = (grant) => {
    // Simulate eligibility check
    const userProfile = {
      age: 32,
      employed: true,
      released: true,
      releaseDate: "2023-01-15"
    };
    
    switch(grant.id) {
      case 1: // DCS Grant
        return userProfile.released;
      case 2: // SASSA
        return userProfile.age >= 18;
      case 3: // NYDA
        return userProfile.age >= 18 && userProfile.age <= 35;
      case 4: // Housing
        return userProfile.employed;
      default:
        return false;
    }
  };

  const applyForGrant = (grant) => {
    if (checkGrantEligibility(grant)) {
      addNotification(`Application started for ${grant.name}`, 'success');
    } else {
      addNotification('You may not be eligible for this grant', 'warning');
    }
  };

  // ==================== EVENT FUNCTIONS ====================

  const handleRSVP = (eventId) => {
    setCommunityEvents(prev => prev.map(event => {
      if (event.id === eventId) {
        const newStatus = event.rsvpStatus === 'attending' ? 'not-attending' : 'attending';
        
        // Save RSVP to localStorage
        const rsvpData = JSON.parse(localStorage.getItem('relink_events_rsvp') || '{}');
        rsvpData[eventId] = newStatus;
        localStorage.setItem('relink_events_rsvp', JSON.stringify(rsvpData));
        
        // Update points if attending
        if (newStatus === 'attending') {
          const newScore = Math.min(100, credibilityScore + event.points);
          setCredibilityScore(newScore);
          addNotification(`RSVP confirmed! +${event.points} points`, 'success');
        }
        
        return { ...event, rsvpStatus: newStatus };
      }
      return event;
    }));
  };

  const handleVolunteerSignup = (opportunity) => {
    addNotification(`Signed up for ${opportunity.title}`, 'success');
  };

  const handleMeetingRSVP = (meeting) => {
    addNotification(`RSVP confirmed for ${meeting.title}`, 'success');
  };

  // ==================== SCORE FUNCTIONS ====================

  const calculateIndustryAverage = () => {
    const avg = credibilityMetrics.reduce((sum, m) => sum + m.industryAvg, 0) / credibilityMetrics.length;
    return Math.round(avg);
  };

  const getScoreComparison = () => {
    const userAvg = credibilityMetrics.reduce((sum, m) => sum + m.score, 0) / credibilityMetrics.length;
    const industryAvg = calculateIndustryAverage();
    const aboveAvg = userAvg > industryAvg;
    
    return {
      userAvg: Math.round(userAvg),
      industryAvg,
      aboveAvg,
      difference: Math.abs(Math.round(userAvg - industryAvg))
    };
  };

  const getActionableSuggestions = () => {
    return scoreSuggestions.filter(s => s.status !== 'completed').slice(0, 5);
  };

  const completeSuggestion = (suggestionId) => {
    setScoreSuggestions(prev => prev.map(s => 
      s.id === suggestionId ? { ...s, status: 'completed' } : s
    ));
    
    const suggestion = scoreSuggestions.find(s => s.id === suggestionId);
    if (suggestion) {
      const newScore = Math.min(100, credibilityScore + suggestion.points);
      setCredibilityScore(newScore);
      addNotification(`Completed! +${suggestion.points} points`, 'success');
    }
  };

  // ==================== UI FUNCTIONS ====================

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  const increaseFontSize = () => {
    setFontSize(prev => {
      const sizes = ['small', 'normal', 'large', 'x-large'];
      const currentIndex = sizes.indexOf(prev);
      const nextIndex = (currentIndex + 1) % sizes.length;
      document.documentElement.style.fontSize = {
        'small': '14px',
        'normal': '16px',
        'large': '18px',
        'x-large': '20px'
      }[sizes[nextIndex]];
      return sizes[nextIndex];
    });
  };

  const printDocument = (document) => {
    window.print();
    addNotification('Sending to printer...', 'info');
  };

  const shareDocument = (document) => {
    if (navigator.share) {
      navigator.share({
        title: document.name,
        text: `Document from RE-Link: ${document.name}`,
      }).catch(() => {
        addNotification('Share cancelled', 'info');
      });
    } else {
      addNotification('Share feature not supported', 'warning');
    }
  };

  // ==================== RENDER FUNCTIONS ====================

  const renderStatusBar = () => (
    <div className={`status-bar ${darkMode ? 'dark' : ''}`}>
      <div className="status-left">
        <div className={`online-status ${isOnline ? 'online' : 'offline'}`}>
          {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
          <span>{isOnline ? 'Online' : 'Offline'}</span>
        </div>
        <div className="battery-status">
          {batteryLevel > 20 ? <Battery size={14} /> : <BatteryCharging size={14} />}
          <span>{Math.round(batteryLevel)}%</span>
        </div>
        <div className="sync-status">
          <RefreshCw size={14} className={isLoading ? 'spinning' : ''} />
          <span>Last sync: {lastSync.toLocaleTimeString()}</span>
        </div>
      </div>
      <div className="status-right">
        <button onClick={toggleDarkMode} className="status-btn">
          {darkMode ? <Sun size={14} /> : <Moon size={14} />}
        </button>
        <button onClick={increaseFontSize} className="status-btn">
          <Maximize2 size={14} />
        </button>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="notifications-container">
      {notifications.map(notification => (
        <div key={notification.id} className={`notification ${notification.type}`}>
          {notification.type === 'success' && <CheckCircle size={16} />}
          {notification.type === 'error' && <AlertTriangle size={16} />}
          {notification.type === 'warning' && <AlertCircle size={16} />}
          {notification.type === 'info' && <Info size={16} />}
          <span>{notification.message}</span>
          <button onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}>
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );

  const renderDocumentModal = () => {
    if (!selectedDocument) return null;
    
    return (
      <div className="modal-overlay" onClick={() => setShowDocumentModal(false)}>
        <div className="modal-content" onClick={e => e.stopPropagation()} ref={modalRef}>
          <div className="modal-header">
            <h3>{selectedDocument.name}</h3>
            <button onClick={() => setShowDocumentModal(false)}>
              <X size={20} />
            </button>
          </div>
          
          <div className="modal-body">
            <div className="document-preview">
              <FileText size={64} />
              <p>Document Preview</p>
            </div>
            
            <div className="document-details">
              <h4>Document Details</h4>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="label">Type:</span>
                  <span>{selectedDocument.type}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Status:</span>
                  <span className={`status-badge ${selectedDocument.status}`}>
                    {selectedDocument.status}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="label">Uploaded:</span>
                  <span>{selectedDocument.date}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Size:</span>
                  <span>{selectedDocument.size}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Points:</span>
                  <span className="points">+{selectedDocument.points}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Hash:</span>
                  <span className="hash">{selectedDocument.hash}</span>
                </div>
              </div>
              
              {selectedDocument.ocrText && (
                <div className="ocr-text">
                  <h4>Extracted Text</h4>
                  <p>{selectedDocument.ocrText}</p>
                </div>
              )}
              
              <div className="version-history">
                <h4>Version History</h4>
                {documentHistory.filter(h => h.docId === selectedDocument.id).map((history, index) => (
                  <div key={index} className="history-item">
                    <span>v{history.version}</span>
                    <span>{history.date}</span>
                    <span>{history.action}</span>
                    <span>{history.user}</span>
                    {index > 0 && (
                      <button onClick={() => handleRestoreVersion(selectedDocument.id, history.version)}>
                        Restore
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="modal-footer">
            <button onClick={() => printDocument(selectedDocument)}>
              <Printer size={16} />
              Print
            </button>
            <button onClick={() => shareDocument(selectedDocument)}>
              <Share2 size={16} />
              Share
            </button>
            <button onClick={() => handleDeleteDocument(selectedDocument.id)} className="danger">
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`community-tab ${darkMode ? 'dark-mode' : ''}`}>
      {/* Status Bar */}
      {renderStatusBar()}
      
      {/* Notifications */}
      {renderNotifications()}
      
      {/* Community Header */}
      <div className="community-header">
        <h3 className="section-title">
          <Users size={28} />
          <span>Build Your Credibility in South Africa</span>
        </h3>
        <p className="section-subtitle">
          Track your journey, submit referrals, and access reintegration resources
        </p>
        
        {/* Quick Actions */}
        <div className="quick-actions">
          <button 
            className={`quick-action-btn ${activeTab === 'documents' ? 'active' : ''}`}
            onClick={() => setActiveTab('documents')}
          >
            <FileText size={16} />
            Documents
          </button>
          <button 
            className={`quick-action-btn ${activeTab === 'score' ? 'active' : ''}`}
            onClick={() => setActiveTab('score')}
          >
            <Award size={16} />
            Score
          </button>
          <button 
            className={`quick-action-btn ${activeTab === 'grants' ? 'active' : ''}`}
            onClick={() => setActiveTab('grants')}
          >
            <DollarSign size={16} />
            Grants
          </button>
          <button 
            className={`quick-action-btn ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            <Calendar size={16} />
            Events
          </button>
          <button 
            className={`quick-action-btn ${activeTab === 'volunteer' ? 'active' : ''}`}
            onClick={() => setActiveTab('volunteer')}
          >
            <Heart size={16} />
            Volunteer
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="community-content">
        {/* Left Column - Credibility Dashboard */}
        <div className="left-column">
          {/* Credibility Score Card */}
          <div className="credibility-card">
            <div className="card-header">
              <h4>
                <Award size={20} />
                Credibility Score
              </h4>
              <button onClick={() => setShowScoreBreakdown(!showScoreBreakdown)}>
                <PieChart size={16} />
              </button>
            </div>
            
            <div className="score-display-large">
              <div className="score-circle-progress">
                <svg viewBox="0 0 36 36" className="circular-chart">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e0e0e0"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeDasharray={`${credibilityScore}, 100`}
                  />
                  <text x="18" y="20.35" className="percentage">{credibilityScore}%</text>
                </svg>
              </div>
              
              <div className="score-details">
                <div className="score-item">
                  <span>Documents Verified:</span>
                  <span>{referralDocuments.filter(d => d.status === 'verified').length}</span>
                </div>
                <div className="score-item">
                  <span>Pending Verification:</span>
                  <span>{referralDocuments.filter(d => d.status === 'pending').length}</span>
                </div>
                <div className="score-item">
                  <span>Total Points:</span>
                  <span>{referralDocuments.reduce((sum, d) => sum + (d.status === 'verified' ? d.points : 0), 0)}</span>
                </div>
              </div>
            </div>
            
            {/* Score Comparison */}
            {showComparison && (
              <div className="score-comparison">
                <h5>vs Industry Average</h5>
                <div className="comparison-bars">
                  <div className="comparison-item">
                    <span>Your Score</span>
                    <div className="bar">
                      <div style={{ width: `${credibilityScore}%` }}></div>
                    </div>
                    <span>{credibilityScore}%</span>
                  </div>
                  <div className="comparison-item">
                    <span>Industry Avg</span>
                    <div className="bar">
                      <div style={{ width: `${calculateIndustryAverage()}%` }}></div>
                    </div>
                    <span>{calculateIndustryAverage()}%</span>
                  </div>
                </div>
                <div className={`comparison-result ${getScoreComparison().aboveAvg ? 'positive' : 'negative'}`}>
                  {getScoreComparison().aboveAvg 
                    ? `You're ${getScoreComparison().difference}% above average!` 
                    : `You're ${getScoreComparison().difference}% below average`}
                </div>
              </div>
            )}
            
            {/* Score Breakdown */}
            {showScoreBreakdown && (
              <div className="score-breakdown-modal">
                <h5>Detailed Breakdown</h5>
                {credibilityMetrics.map((metric, index) => (
                  <div key={index} className="breakdown-item">
                    <div className="breakdown-label">
                      <span>{metric.icon}</span>
                      <span>{metric.label}</span>
                      <span className="breakdown-value">{metric.score}%</span>
                    </div>
                    <div className="breakdown-bar">
                      <div style={{ width: `${metric.score}%`, backgroundColor: metric.color }}></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Score Improvement Suggestions */}
          {showSuggestions && (
            <div className="suggestions-card">
              <div className="card-header">
                <h4>
                  <Target size={20} />
                  Actionable Suggestions
                </h4>
                <span className="suggestion-count">{getActionableSuggestions().length} tasks</span>
              </div>
              
              <div className="suggestions-list">
                {getActionableSuggestions().map(suggestion => (
                  <div key={suggestion.id} className="suggestion-item">
                    <div className="suggestion-content">
                      <h5>{suggestion.action}</h5>
                      <div className="suggestion-meta">
                        <span className={`difficulty ${suggestion.difficulty}`}>
                          {suggestion.difficulty}
                        </span>
                        <span className="time">
                          <Clock size={12} />
                          {suggestion.timeEstimate}
                        </span>
                        <span className="points">+{suggestion.points} pts</span>
                      </div>
                      {suggestion.progress && (
                        <div className="suggestion-progress">
                          <div className="progress-bar">
                            <div style={{ width: `${suggestion.progress}%` }}></div>
                          </div>
                          <span>{suggestion.progress}%</span>
                        </div>
                      )}
                    </div>
                    <button 
                      className="complete-suggestion-btn"
                      onClick={() => completeSuggestion(suggestion.id)}
                    >
                      <CheckCircle size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Government Grants */}
          {showGrants && (
            <div className="grants-card">
              <div className="card-header">
                <h4>
                  <DollarSign size={20} />
                  Government Grants
                </h4>
                <button onClick={() => setShowGrants(!showGrants)}>
                  <ExternalLink size={16} />
                </button>
              </div>
              
              <div className="grants-list">
                {governmentGrants.map(grant => (
                  <div key={grant.id} className="grant-item">
                    <div className="grant-header">
                      <h5>{grant.name}</h5>
                      <span className="grant-amount">{grant.amount}</span>
                    </div>
                    <p className="grant-description">{grant.description}</p>
                    <div className="grant-details">
                      <div className="grant-eligibility">
                        <Shield size={12} />
                        {checkGrantEligibility(grant) ? (
                          <span className="eligible">You may be eligible</span>
                        ) : (
                          <span className="ineligible">Check requirements</span>
                        )}
                      </div>
                      <div className={`grant-probability ${grant.probability}`}>
                        {grant.probability} chance
                      </div>
                    </div>
                    <button 
                      className="apply-grant-btn"
                      onClick={() => applyForGrant(grant)}
                      disabled={!checkGrantEligibility(grant)}
                    >
                      Apply Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Middle Column - Documents & Verification */}
        <div className="middle-column">
          {/* Document Upload */}
          <div className="upload-card">
            <div className="card-header">
              <h4>
                <UploadCloud size={20} />
                Upload Document
              </h4>
            </div>
            
            <div className="upload-content">
              <div className="referral-types">
                {referralTypes.map(type => (
                  <div 
                    key={type.id}
                    className={`type-chip ${referralType === type.id ? 'selected' : ''}`}
                    onClick={() => setReferralType(type.id)}
                  >
                    <type.icon size={16} />
                    <span>{type.label}</span>
                    <span className="points">+{type.points}</span>
                  </div>
                ))}
              </div>
              
              <div 
                className="upload-area"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file) {
                    handleDocumentUpload({ target: { files: [file] } });
                  }
                }}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleDocumentUpload}
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
          
          {/* Document List with Search & Filter */}
          <div className="documents-card">
            <div className="card-header">
              <h4>
                <FileText size={20} />
                Your Documents
              </h4>
              <div className="document-controls">
                <div className="search-box">
                  <Search size={16} />
                  <input
                    type="text"
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select 
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All</option>
                  <option value="verified">Verified</option>
                  <option value="pending">Pending</option>
                  <option value="expired">Expired</option>
                </select>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="date">Date</option>
                  <option value="name">Name</option>
                  <option value="points">Points</option>
                </select>
              </div>
            </div>
            
            <div className="documents-list">
              {referralDocuments
                .filter(doc => {
                  if (filterStatus === 'expired') {
                    return checkExpiredDocuments().some(e => e.id === doc.id);
                  }
                  return filterStatus === 'all' || doc.status === filterStatus;
                })
                .filter(doc => doc.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .sort((a, b) => {
                  if (sortBy === 'name') return a.name.localeCompare(b.name);
                  if (sortBy === 'points') return b.points - a.points;
                  return new Date(b.date) - new Date(a.date);
                })
                .map(doc => (
                  <div 
                    key={doc.id} 
                    className={`document-item ${doc.status} ${checkExpiredDocuments().some(e => e.id === doc.id) ? 'expired' : ''}`}
                    onClick={() => {
                      setSelectedDocument(doc);
                      setShowDocumentModal(true);
                    }}
                  >
                    <div className="document-icon">
                      <FileText size={24} />
                    </div>
                    <div className="document-info">
                      <h5>{doc.name}</h5>
                      <div className="document-meta">
                        <span className="doc-type">{doc.type}</span>
                        <span className="doc-date">{doc.date}</span>
                        <span className={`doc-status ${doc.status}`}>
                          {doc.status}
                        </span>
                        <span className="doc-points">+{doc.points}</span>
                        <span className="doc-size">{doc.size}</span>
                      </div>
                      {doc.expiryDate && (
                        <div className="doc-expiry">
                          <Clock size={12} />
                          Expires: {doc.expiryDate}
                        </div>
                      )}
                      {doc.verifiedBy && (
                        <div className="doc-verified">
                          <ShieldCheck size={12} />
                          Verified by: {doc.verifiedBy}
                        </div>
                      )}
                    </div>
                    <div className="document-actions">
                      <button 
                        className="action-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDocument(doc);
                          setShowDocumentModal(true);
                        }}
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        className="action-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          shareDocument(doc);
                        }}
                      >
                        <Download size={16} />
                      </button>
                      {doc.status === 'pending' && (
                        <button 
                          className="action-btn verify"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDocument(doc);
                            setShowVerificationModal(true);
                          }}
                        >
                          <Shield size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        
        {/* Right Column - Integration & Community */}
        <div className="right-column">
          {/* Integration Status */}
          <div className="integration-card">
            <div className="card-header">
              <h4>
                <Shield size={20} />
                Verification Status
              </h4>
              <button onClick={() => {
                checkSAPSClearance();
                checkDCSStatus();
                verifyBankAccount();
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
                  <div>Number: {sapsStatus.clearanceNumber}</div>
                  <div>Last Check: {sapsStatus.lastCheck}</div>
                  <div>Renewal: {sapsStatus.nextRenewal}</div>
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
                  <div>Offender #: {dcsStatus.offenderNumber}</div>
                  <div>Officer: {dcsStatus.paroleOfficer}</div>
                  <div>Next Meeting: {dcsStatus.nextMeeting}</div>
                  <div>Compliance: {dcsStatus.compliance}%</div>
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
                  <div>Bank: {bankStatus.bank}</div>
                  <div>Verified: {bankStatus.verifiedDate}</div>
                  <div>Salary Payments: {bankStatus.salaryPayments ? 'Active' : 'Inactive'}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Upcoming Events */}
          {showEvents && (
            <div className="events-card">
              <div className="card-header">
                <h4>
                  <Calendar size={20} />
                  Upcoming Events
                </h4>
                <button onClick={() => setShowEvents(!showEvents)}>
                  <ExternalLink size={16} />
                </button>
              </div>
              
              <div className="events-list">
                {communityEvents.map(event => (
                  <div key={event.id} className="event-item">
                    <div className="event-date-badge">
                      <span className="day">{event.date.split('-')[2]}</span>
                      <span className="month">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                    </div>
                    <div className="event-details">
                      <h5>{event.title}</h5>
                      <p>{event.time} • {event.location}</p>
                      <div className="event-meta">
                        <span>{event.registered}/{event.capacity} registered</span>
                        <span className="event-points">+{event.points} pts</span>
                      </div>
                    </div>
                    <button 
                      className={`rsvp-btn ${event.rsvpStatus}`}
                      onClick={() => handleRSVP(event.id)}
                    >
                      {event.rsvpStatus === 'attending' ? 'Attending' : 'RSVP'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Volunteer Opportunities */}
          {showVolunteer && (
            <div className="volunteer-card">
              <div className="card-header">
                <h4>
                  <Heart size={20} />
                  Volunteer
                </h4>
                <button onClick={() => setShowVolunteer(!showVolunteer)}>
                  <ExternalLink size={16} />
                </button>
              </div>
              
              <div className="volunteer-list">
                {volunteerOpportunities.map(opp => (
                  <div key={opp.id} className="volunteer-item">
                    <h5>{opp.title}</h5>
                    <p className="organization">{opp.organization}</p>
                    <p className="description">{opp.description}</p>
                    <div className="volunteer-meta">
                      <span className="date">
                        <Calendar size={12} />
                        {opp.date}
                      </span>
                      <span className="slots">
                        {opp.slots - opp.filled} spots left
                      </span>
                      <span className="points">+{opp.points} pts</span>
                    </div>
                    <button 
                      className="signup-btn"
                      onClick={() => handleVolunteerSignup(opp)}
                    >
                      Sign Up
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Community Meetings */}
          {showMeetings && (
            <div className="meetings-card">
              <div className="card-header">
                <h4>
                  <Users size={20} />
                  Community Meetings
                </h4>
                <button onClick={() => setShowMeetings(!showMeetings)}>
                  <ExternalLink size={16} />
                </button>
              </div>
              
              <div className="meetings-list">
                {communityMeetings.map(meeting => (
                  <div key={meeting.id} className="meeting-item">
                    <h5>{meeting.title}</h5>
                    <p className="topic">Topic: {meeting.topic}</p>
                    <div className="meeting-meta">
                      <span>
                        <Calendar size={12} />
                        {meeting.date} • {meeting.time}
                      </span>
                      <span>
                        <MapPin size={12} />
                        {meeting.location}
                      </span>
                    </div>
                    <div className="meeting-footer">
                      <span className="facilitator">
                        Facilitator: {meeting.facilitator}
                      </span>
                      <button onClick={() => handleMeetingRSVP(meeting)}>
                        Join
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Community Notices */}
          {showNotices && (
            <div className="notices-card">
              <div className="card-header">
                <h4>
                  <Bell size={20} />
                  Community Notices
                </h4>
                <button onClick={() => setShowNotices(!showNotices)}>
                  <ExternalLink size={16} />
                </button>
              </div>
              
              <div className="notices-list">
                {communityNotices.map(notice => (
                  <div key={notice.id} className={`notice-item ${notice.important ? 'important' : ''}`}>
                    <div className="notice-icon">
                      {notice.important ? <AlertCircle size={16} /> : <Info size={16} />}
                    </div>
                    <div className="notice-content">
                      <h5>{notice.title}</h5>
                      <p>{notice.content}</p>
                      <div className="notice-meta">
                        <span>{notice.date}</span>
                        <span className="notice-category">{notice.category}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Modals */}
      {showDocumentModal && renderDocumentModal()}
      
      {/* Verification Modal */}
      {showVerificationModal && selectedDocument && (
        <div className="modal-overlay" onClick={() => setShowVerificationModal(false)}>
          <div className="modal-content small" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Verify Document</h3>
              <button onClick={() => setShowVerificationModal(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body">
              <p>Enter verification code for:</p>
              <p className="document-name">{selectedDocument.name}</p>
              
              <input
                type="text"
                placeholder="Verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="verification-input"
              />
              
              <div className="verification-options">
                <button 
                  className="verify-btn"
                  onClick={() => {
                    verifyDocument(selectedDocument.id, 'Manual Verification');
                    setShowVerificationModal(false);
                    setVerificationCode('');
                  }}
                >
                  <ShieldCheck size={16} />
                  Verify
                </button>
                <button 
                  className="cancel-btn"
                  onClick={() => setShowVerificationModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommunityTab;