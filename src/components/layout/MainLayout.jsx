import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home as HomeIcon, Briefcase, MessageCircle, Users, User,
  Calendar, Bell, Search, LogOut, Camera, ChevronRight, Sparkles,
  ShieldCheck, TrendingUp, BarChart3, Sun, Moon, Menu, X,
  Bot, HelpCircle, Phone, Mail, Linkedin, Facebook,
  Twitter, Instagram, Shield, FileText, Send, Loader2,
  CheckCircle, AlertCircle, Info, Clock, Star, Award,
  Target, Globe, Heart, Zap, ChevronLeft, ChevronDown,
  ChevronUp, Settings, Filter, Download, Upload, RefreshCw,
  Maximize2, Minimize2, Volume2, VolumeX, Eye, EyeOff,
  Bookmark, Share2, ThumbsUp, MessageSquare, PlusCircle,
  BellRing, BellOff, AlertTriangle, Wifi, WifiOff
} from "lucide-react";

// Import your actual logo
import ReLinkLogo from "../../assets/ReLinkLogo2.jpeg";

function MainLayout({ children, activeTab, setActiveTab, user, setUser, credibilityScore, setCredibilityScore }) {
  const navigate = useNavigate();
  
  // ==================== STATE MANAGEMENT ====================
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showBot, setShowBot] = useState(false);
  const [botMessage, setBotMessage] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [floatingDots, setFloatingDots] = useState([]);
  const [logoHover, setLogoHover] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(true);
  const [titleGlow, setTitleGlow] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [botSpinning, setBotSpinning] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [logoScale, setLogoScale] = useState(1);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastSync, setLastSync] = useState(new Date());
  const [showSettings, setShowSettings] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationSound] = useState(new Audio('/notification.mp3'));
  
  const logoRef = useRef(null);
  const botRef = useRef(null);
  const profilePicRef = useRef(null);
  const searchRef = useRef(null);
  const notificationRef = useRef(null);

  // ==================== MOCK DATA ====================
  const mockNotifications = [
    { id: 1, type: 'message', title: 'New Message', content: 'BuildRight Construction replied to your application', time: '5 min ago', read: false, icon: '💬', link: '/messages' },
    { id: 2, type: 'job', title: 'Job Match', content: 'New job alert: Construction Foreman in Soweto', time: '15 min ago', read: false, icon: '🔨', link: '/networking' },
    { id: 3, type: 'credibility', title: 'Credibility Score', content: 'Your score increased by 5 points!', time: '1 hour ago', read: false, icon: '⭐', link: '/community' },
    { id: 4, type: 'event', title: 'Upcoming Event', content: 'Job Fair in Johannesburg tomorrow', time: '2 hours ago', read: true, icon: '📅', link: '/community' },
    { id: 5, type: 'application', title: 'Application Update', content: 'Your application at Logistics SA is under review', time: '1 day ago', read: true, icon: '📄', link: '/overview' }
  ];

  const searchableContent = [
    { type: 'job', title: 'Construction Foreman', location: 'Soweto', company: 'BuildRight', tags: ['construction', 'foreman', 'full-time'] },
    { type: 'job', title: 'Warehouse Manager', location: 'Johannesburg', company: 'Logistics SA', tags: ['warehouse', 'manager', 'logistics'] },
    { type: 'job', title: 'Call Center Agent', location: 'Cape Town', company: 'CallCom', tags: ['call center', 'customer service'] },
    { type: 'event', title: 'Job Fair 2024', location: 'Soweto Expo Centre', date: '2024-02-15', tags: ['job fair', 'networking'] },
    { type: 'event', title: 'Skills Workshop', location: 'Johannesburg', date: '2024-02-22', tags: ['workshop', 'skills'] },
    { type: 'member', title: 'Thabo M.', role: 'Construction Worker', location: 'Soweto', tags: ['member', 'construction'] },
    { type: 'member', title: 'Sarah K.', role: 'HR Manager', location: 'Cape Town', tags: ['member', 'hr'] },
    { type: 'resource', title: 'CV Writing Guide', category: 'Document', tags: ['resource', 'cv', 'guide'] }
  ];

  // ==================== ANIMATION EFFECTS ====================
  useEffect(() => {
    // Continuous rotation animation for logo
    const rotationInterval = setInterval(() => {
      setRotationAngle(prev => (prev + 2) % 360);
    }, 50);
    
    // Generate floating dots
    const dots = [];
    for (let i = 0; i < 30; i++) {
      dots.push({
        id: i,
        size: Math.random() * 10 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 30 + 20,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.15 + 0.05,
        color: `rgba(16, 185, 129, ${Math.random() * 0.2 + 0.1})`
      });
    }
    setFloatingDots(dots);

    // Title glow animation
    const glowInterval = setInterval(() => {
      setTitleGlow(prev => !prev);
    }, 2000);
    
    // Bot spinning animation
    const botSpinInterval = setInterval(() => {
      setBotSpinning(prev => !prev);
    }, 4000);
    
    // Online/Offline detection
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load notifications
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);

    // Click outside handlers
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      clearInterval(rotationInterval);
      clearInterval(glowInterval);
      clearInterval(botSpinInterval);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Logo hover effect
  useEffect(() => {
    if (logoHover) {
      setLogoScale(1.15);
    } else {
      setLogoScale(1);
    }
  }, [logoHover]);

  // ==================== SEARCH FUNCTIONALITY ====================
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    setIsSearching(true);
    
    if (query.length > 1) {
      // Simulate search delay
      setTimeout(() => {
        const results = searchableContent.filter(item => 
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
          (item.location && item.location.toLowerCase().includes(query.toLowerCase())) ||
          (item.company && item.company.toLowerCase().includes(query.toLowerCase()))
        );
        setSearchResults(results);
        setShowSearchResults(true);
        setIsSearching(false);
      }, 300);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
      setIsSearching(false);
    }
  }, []);

  const handleSearchSelect = (item) => {
    setSearchQuery(item.title);
    setShowSearchResults(false);
    // Navigate based on type
    if (item.type === 'job') {
      setActiveTab('networking');
    } else if (item.type === 'event') {
      setActiveTab('community');
    } else if (item.type === 'member') {
      setActiveTab('profile');
    }
  };

  // ==================== NOTIFICATION FUNCTIONALITY ====================
  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      playNotificationSound();
    }
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const clearNotification = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    setUnreadCount(prev => {
      const wasUnread = notifications.find(n => n.id === notificationId)?.read === false;
      return wasUnread ? Math.max(0, prev - 1) : prev;
    });
  };

  const playNotificationSound = () => {
    if (soundEnabled && notificationSound) {
      notificationSound.play().catch(() => {});
    }
  };

  // Simulate new notification
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newNotification = {
          id: Date.now(),
          type: 'system',
          title: 'New Update',
          content: 'Check out the latest opportunities in your area',
          time: 'Just now',
          read: false,
          icon: '✨'
        };
        setNotifications(prev => [newNotification, ...prev]);
        setUnreadCount(prev => prev + 1);
        playNotificationSound();
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [soundEnabled]);

  // ==================== BOT FUNCTIONALITY ====================
  const botResponses = {
    greeting: "👋 Molo! I'm your RE-Link Assistant. I'm here to help you navigate your reintegration journey in South Africa. What would you like to know about today?",
    jobs: "💼 **Job Opportunities**\n\nWe have 1,845+ jobs across South Africa in:\n• Construction (450+ positions)\n• Logistics & Transport (320+)\n• Retail & Sales (280+)\n• Manufacturing (210+)\n• IT & Tech (150+)\n• Hospitality (135+)\n\nUse filters in the Networking tab to find jobs by location, salary, and industry!",
    employers: "🏢 **Verified Employers**\n\nConnect with 247+ trusted South African employers including:\n• BuildRight Construction\n• Logistics SA\n• CallCom Solutions\n• Unitrans\n• Shoprite Group\n\nEach employer is verified by DCS and committed to second chances!",
    profile: "👤 **Profile Optimization**\n\nBoost your credibility score by:\n• Adding skills (5 points each)\n• Uploading certificates (10-30 points)\n• Completing work history (15 points)\n• Adding education (10 points)\n\nA complete profile gets 25% more job matches!",
    community: "🤝 **Community Engagement**\n\nBuild your network through:\n• Upcoming job fairs (Soweto, Feb 15)\n• Skills workshops (Johannesburg, Feb 22)\n• Mentorship meetups (Pretoria, Mar 5)\n• Volunteer opportunities\n\nEarn points while connecting!",
    referrals: "📄 **Referral Documents**\n\nUpload these for credibility points:\n• Police Clearance (30 pts)\n• Rehab Certificate (20 pts)\n• Employer Reference (15 pts)\n• Community Leader (10 pts)\n• Training Certificates (12-18 pts)",
    support: "🆘 **24/7 Support**\n\n• Helpline: 0800-RE-LINK (735-465)\n• Email: support@relink.co.za\n• WhatsApp: 060 123 4567\n• Office: Mon-Fri 8am-5pm\n\nEmergency support available 24/7!",
    credibility: "📊 **Credibility Score**\n\nYour score: {score}%\n\nBreakdown:\n• Documents: {docScore}%\n• Employment: {empScore}%\n• Community: {commScore}%\n• Education: {eduScore}%\n\nNext milestone: {nextMilestone}% - {pointsNeeded} points away!",
    default: "I can help you with:\n• 🔍 Finding jobs\n• 📄 Submitting documents\n• 👥 Community events\n• 📈 Credibility score\n• 🆘 Support & resources\n\nWhat would you like to know more about?"
  };

  const handleBotSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const input = userInput.toLowerCase();
    let response = botResponses.default;

    if (input.includes('hello') || input.includes('hi') || input.includes('hey') || input.includes('molo')) {
      response = botResponses.greeting;
    } else if (input.includes('job') || input.includes('work') || input.includes('hire') || input.includes('career')) {
      response = botResponses.jobs;
    } else if (input.includes('employer') || input.includes('company') || input.includes('hire')) {
      response = botResponses.employers;
    } else if (input.includes('profile') || input.includes('skill') || input.includes('experience') || input.includes('resume')) {
      response = botResponses.profile;
    } else if (input.includes('community') || input.includes('event') || input.includes('volunteer')) {
      response = botResponses.community;
    } else if (input.includes('referral') || input.includes('document') || input.includes('upload')) {
      response = botResponses.referrals;
    } else if (input.includes('help') || input.includes('support') || input.includes('contact')) {
      response = botResponses.support;
    } else if (input.includes('credibility') || input.includes('score')) {
      // Calculate dynamic scores
      const docScore = Math.round(credibilityScore * 0.4);
      const empScore = Math.round(credibilityScore * 0.3);
      const commScore = Math.round(credibilityScore * 0.2);
      const eduScore = Math.round(credibilityScore * 0.1);
      const nextMilestone = Math.ceil(credibilityScore / 10) * 10;
      const pointsNeeded = nextMilestone - credibilityScore;
      
      response = botResponses.credibility
        .replace('{score}', credibilityScore)
        .replace('{docScore}', docScore)
        .replace('{empScore}', empScore)
        .replace('{commScore}', commScore)
        .replace('{eduScore}', eduScore)
        .replace('{nextMilestone}', nextMilestone)
        .replace('{pointsNeeded}', pointsNeeded);
    }

    setIsLoading(true);
    setTimeout(() => {
      setBotMessage(response);
      setUserInput("");
      setIsLoading(false);
    }, 500);
  };

  const handleBotActivation = () => {
    setBotSpinning(true);
    setShowBot(true);
    setTimeout(() => setBotSpinning(false), 1000);
  };

  // ==================== USER FUNCTIONS ====================
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('relink_token');
      localStorage.removeItem('relink_user');
      navigate('/login');
    }
  };

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

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  const handleLogoAnimation = () => {
    if (logoRef.current) {
      logoRef.current.classList.add('logo-super-spin');
      setTimeout(() => {
        if (logoRef.current) {
          logoRef.current.classList.remove('logo-super-spin');
        }
      }, 1000);
    }
  };

  // Default user object
  const displayUser = user || { name: "Thabo M.", userType: "job-seeker" };

  return (
    <div className={`home-page ${darkMode ? 'dark-mode' : ''}`}>
      {/* Animated Background */}
      <div className="background-gradient">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>
      
      {/* Floating Dots */}
      <div className="floating-dots-container">
        {floatingDots.map(dot => (
          <div
            key={dot.id}
            className="floating-dot"
            style={{
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              animationDuration: `${dot.duration}s`,
              animationDelay: `${dot.delay}s`,
              backgroundColor: dot.color,
              opacity: dot.opacity
            }}
          />
        ))}
      </div>

      {/* Left Side Navigation - Enhanced */}
      <div className="side-navigation glass-effect">
        <div className="nav-container">
          {/* Enhanced Logo Section with 3D Spin */}
          <div 
            className="logo-section"
            onClick={() => {
              setActiveTab('overview');
              handleLogoAnimation();
            }}
            onMouseEnter={() => setLogoHover(true)}
            onMouseLeave={() => setLogoHover(false)}
          >
            <div className={`logo-glow-3d ${logoHover ? 'active' : ''}`}></div>
            <div className="logo-pulse-ring"></div>
            <div className="logo-orbital-system">
              <div className="orbital-ring ring-outer"></div>
              <div className="orbital-ring ring-middle"></div>
              <div className="orbital-ring ring-inner"></div>
            </div>
            
            {/* 3D Rotating Logo */}
            <div 
              className="logo-3d-container"
              style={{
                transform: `rotateY(${rotationAngle}deg) rotateX(${rotationAngle * 0.5}deg) scale(${logoScale})`,
                transition: 'transform 0.3s ease'
              }}
            >
              <div className="logo-face front">
                <img 
                  ref={logoRef}
                  src={ReLinkLogo} 
                  alt="RE-Link Logo" 
                  className="logo-image-3d"
                  onLoad={() => setLogoLoaded(true)}
                  onError={() => setLogoLoaded(false)}
                />
              </div>
              <div className="logo-face back">
                <div className="logo-back-content">
                  <Shield size={40} />
                </div>
              </div>
              <div className="logo-face right">
                <div className="logo-side-content">
                  <span>RE</span>
                </div>
              </div>
              <div className="logo-face left">
                <div className="logo-side-content">
                  <span>LINK</span>
                </div>
              </div>
            </div>
            
            {/* Animated Text */}
            <div className="logo-text-container">
              <h1 className="logo-title-gradient">RE-LINK</h1>
              <div className="logo-slogan-animated">
                <Heart size={14} className="slogan-icon" />
                <span className="slogan-scroll">Second Chances, Real Connections</span>
                <Star size={12} className="slogan-star" />
              </div>
              <div className="logo-badge-premium">
                <ShieldCheck size={12} />
                <span>DCS Verified Partner</span>
                <Award size={12} />
              </div>
            </div>
          </div>

          {/* Navigation Items with Icons */}
          <div className="nav-items-enhanced">
            <button 
              className={`nav-item-3d ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <div className="nav-icon-3d">
                <BarChart3 size={22} />
              </div>
              <span className="nav-label">Overview</span>
              {activeTab === 'overview' && <div className="nav-indicator-pulse"></div>}
            </button>
            
            <button 
              className={`nav-item-3d ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => setActiveTab('home')}
            >
              <div className="nav-icon-3d">
                <HomeIcon size={22} />
              </div>
              <span className="nav-label">Home</span>
              {activeTab === 'home' && <div className="nav-indicator-pulse"></div>}
            </button>
            
            <button 
              className={`nav-item-3d ${activeTab === 'networking' ? 'active' : ''}`}
              onClick={() => setActiveTab('networking')}
            >
              <div className="nav-icon-3d">
                <Briefcase size={22} />
              </div>
              <span className="nav-label">Networking</span>
              {activeTab === 'networking' && <div className="nav-indicator-pulse"></div>}
            </button>
            
            <button 
              className={`nav-item-3d ${activeTab === 'community' ? 'active' : ''}`}
              onClick={() => setActiveTab('community')}
            >
              <div className="nav-icon-3d">
                <Users size={22} />
              </div>
              <span className="nav-label">Community</span>
              {activeTab === 'community' && <div className="nav-indicator-pulse"></div>}
            </button>
            
            <button 
              className={`nav-item-3d ${activeTab === 'messages' ? 'active' : ''}`}
              onClick={() => setActiveTab('messages')}
            >
              <div className="nav-icon-3d">
                <MessageCircle size={22} />
              </div>
              <span className="nav-label">Messages</span>
              {activeTab === 'messages' && <div className="nav-indicator-pulse"></div>}
            </button>
            
            <button 
              className={`nav-item-3d ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <div className="nav-icon-3d">
                <User size={22} />
              </div>
              <span className="nav-label">Profile</span>
              {activeTab === 'profile' && <div className="nav-indicator-pulse"></div>}
            </button>
          </div>

          {/* Enhanced User Profile Card */}
          <div className="user-profile-card glass-effect">
            <div className="profile-header">
              <div className="profile-avatar-container" onClick={() => profilePicRef.current?.click()}>
                <div className="avatar-ring"></div>
                <div className="avatar-content">
                  {profilePicture ? (
                    <img src={profilePicture} alt="Profile" className="profile-avatar-img" />
                  ) : (
                    <span className="avatar-initial-3d">{displayUser.name?.charAt(0) || "U"}</span>
                  )}
                </div>
                <div className="avatar-status online"></div>
                <div className="avatar-edit-overlay">
                  <Camera size={14} />
                </div>
              </div>
              <input
                type="file"
                ref={profilePicRef}
                accept="image/*"
                onChange={handleProfilePictureUpload}
                style={{ display: 'none' }}
              />
              
              <div className="profile-info-enhanced">
                <h3 className="profile-name-gradient">{displayUser.name || "User"}</h3>
                <div className="profile-badge">
                  <ShieldCheck size={12} />
                  <span>{displayUser.userType?.replace('-', ' ').toUpperCase() || "MEMBER"}</span>
                </div>
              </div>
            </div>
            
            <div className="profile-stats">
              <div className="stat-item-3d">
                <div className="stat-value">{credibilityScore || 0}</div>
                <div className="stat-label">Credibility</div>
                <div className="stat-progress">
                  <div className="progress-fill" style={{ width: `${credibilityScore || 0}%` }}></div>
                </div>
              </div>
              <div className="stat-item-3d">
                <div className="stat-value">12</div>
                <div className="stat-label">Applications</div>
              </div>
              <div className="stat-item-3d">
                <div className="stat-value">5</div>
                <div className="stat-label">Messages</div>
              </div>
            </div>
            
            <div className="profile-actions">
              <button className="profile-action-btn" onClick={() => setActiveTab('profile')}>
                <User size={14} />
                <span>View Profile</span>
              </button>
              <button className="profile-action-btn" onClick={handleLogout}>
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="status-indicators">
            <div className={`status-indicator ${isOnline ? 'online' : 'offline'}`}>
              {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
              <span>{isOnline ? 'Online' : 'Offline'}</span>
            </div>
            <div className="status-indicator">
              <RefreshCw size={14} className={isLoading ? 'spinning' : ''} />
              <span>Synced {lastSync.toLocaleTimeString()}</span>
            </div>
            <button 
              className={`theme-toggle-enhanced ${darkMode ? 'dark' : 'light'}`}
              onClick={handleDarkModeToggle}
            >
              {darkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content-enhanced">
        {/* Enhanced Top Header */}
        <header className="top-header-glass">
          <div className="header-left">
            {/* Enhanced Search Bar */}
            <div className="search-container-enhanced" ref={searchRef}>
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search jobs, companies, events, members..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => searchQuery.length > 1 && setShowSearchResults(true)}
                className="search-input-enhanced"
              />
              {isSearching && <Loader2 size={18} className="search-spinner" />}
              {searchQuery && !isSearching && (
                <button className="clear-search-btn" onClick={() => setSearchQuery("")}>
                  <X size={16} />
                </button>
              )}
              
              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="search-results-dropdown glass-effect">
                  <div className="results-header">
                    <span>{searchResults.length} results found</span>
                    <button onClick={() => setShowSearchResults(false)}>
                      <X size={14} />
                    </button>
                  </div>
                  <div className="results-list">
                    {searchResults.map((item, index) => (
                      <div 
                        key={index} 
                        className="search-result-item"
                        onClick={() => handleSearchSelect(item)}
                      >
                        <div className="result-icon">
                          {item.type === 'job' && <Briefcase size={16} />}
                          {item.type === 'event' && <Calendar size={16} />}
                          {item.type === 'member' && <User size={16} />}
                          {item.type === 'resource' && <FileText size={16} />}
                        </div>
                        <div className="result-info">
                          <h4>{item.title}</h4>
                          <p>
                            {item.company && `${item.company} • `}
                            {item.location && `${item.location}`}
                            {item.role && `${item.role}`}
                          </p>
                        </div>
                        <ChevronRight size={14} className="result-arrow" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="header-right-enhanced">
            {/* Enhanced Notification Bell */}
            <div className="notification-container" ref={notificationRef}>
              <button 
                className={`notification-bell-enhanced ${unreadCount > 0 ? 'has-notifications' : ''}`}
                onClick={handleNotificationClick}
              >
                <Bell size={22} />
                {unreadCount > 0 && (
                  <span className="notification-badge-pulse">{unreadCount}</span>
                )}
                {unreadCount > 0 && <span className="notification-ring"></span>}
              </button>
              
              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="notifications-dropdown glass-effect">
                  <div className="notifications-header">
                    <h3>Notifications</h3>
                    <div className="notification-actions">
                      <button onClick={markAllAsRead} disabled={unreadCount === 0}>
                        <CheckCircle size={14} />
                        Mark all read
                      </button>
                      <button onClick={() => setSoundEnabled(!soundEnabled)}>
                        {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="notifications-list">
                    {notifications.length > 0 ? (
                      notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`notification-item ${!notification.read ? 'unread' : ''}`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="notification-icon">
                            {notification.icon}
                          </div>
                          <div className="notification-content">
                            <h4>{notification.title}</h4>
                            <p>{notification.content}</p>
                            <span className="notification-time">{notification.time}</span>
                          </div>
                          <button 
                            className="notification-clear"
                            onClick={(e) => {
                              e.stopPropagation();
                              clearNotification(notification.id);
                            }}
                          >
                            <X size={12} />
                          </button>
                          {!notification.read && <span className="unread-dot"></span>}
                        </div>
                      ))
                    ) : (
                      <div className="no-notifications">
                        <BellOff size={32} />
                        <p>No notifications</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="notifications-footer">
                    <a href="#" onClick={() => setActiveTab('settings')}>
                      View all notifications
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <button className="quick-action-btn" onClick={() => setActiveTab('messages')}>
                <MessageCircle size={18} />
              </button>
              <button className="quick-action-btn" onClick={() => setActiveTab('community')}>
                <Calendar size={18} />
              </button>
              <button className="quick-action-btn" onClick={() => setShowSettings(!showSettings)}>
                <Settings size={18} />
              </button>
            </div>

            <button 
              className="mobile-menu-btn-enhanced" 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>

        {/* Main Content with Animated Welcome Banner */}
        <main className="content-area-enhanced">
          {/* Animated Welcome Banner */}
          <div className={`welcome-banner-premium ${titleGlow ? 'glow' : ''}`}>
            <div className="banner-particles"></div>
            <div className="banner-content">
              <div className="welcome-badge-animated">
                <Sparkles size={20} className="badge-sparkle" />
                <span>Welcome back, {displayUser.name || "Champion"}!</span>
                <Zap size={16} className="badge-zap" />
              </div>
              
              <div className="welcome-title-container">
                <h1 className="welcome-title-gradient">
                  Your Journey to Success
                  <span className="title-highlight-3d"> Continues Today</span>
                </h1>
                <div className="title-underline"></div>
              </div>
              
              <p className="welcome-subtitle-enhanced">
                Connect with opportunities, build credibility, and thrive with South African 
                professionals who believe in second chances.
              </p>
              
              {/* Quick Stats */}
              <div className="quick-stats-banner">
                <div className="quick-stat">
                  <div className="stat-icon">
                    <Briefcase size={16} />
                  </div>
                  <div className="stat-info">
                    <span className="stat-value">1,845+</span>
                    <span className="stat-label">Jobs</span>
                  </div>
                </div>
                <div className="quick-stat">
                  <div className="stat-icon">
                    <Users size={16} />
                  </div>
                  <div className="stat-info">
                    <span className="stat-value">247+</span>
                    <span className="stat-label">Employers</span>
                  </div>
                </div>
                <div className="quick-stat">
                  <div className="stat-icon">
                    <Award size={16} />
                  </div>
                  <div className="stat-info">
                    <span className="stat-value">3,426+</span>
                    <span className="stat-label">Members</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Content with Smooth Transitions */}
          <div className="tab-content-container-enhanced">
            <div className="tab-transition-wrapper">
              {children}
            </div>
          </div>
        </main>

        {/* Enhanced Footer */}
        <footer className="footer-premium">
          <div className="footer-glow-effect"></div>
          <div className="footer-container-enhanced">
            <div className="footer-left">
              <div className="footer-logo-3d">
                <img src={ReLinkLogo} alt="RE-Link" className="footer-logo-img" />
                <div className="footer-logo-ring"></div>
              </div>
              <div className="footer-info">
                <h4 className="footer-title-gradient">RE-LINK</h4>
                <p className="footer-slogan-animated">Second Chances, Real Connections</p>
                <p className="footer-partnership-enhanced">
                  <ShieldCheck size={14} />
                  Official Partner: Department of Correctional Services South Africa
                </p>
              </div>
            </div>
            
            <div className="footer-right">
              <div className="footer-links-enhanced">
                <a href="#" className="footer-link-3d">
                  <HelpCircle size={14} />
                  <span>Help</span>
                </a>
                <a href="#" className="footer-link-3d">
                  <Shield size={14} />
                  <span>Privacy</span>
                </a>
                <a href="#" className="footer-link-3d">
                  <FileText size={14} />
                  <span>Terms</span>
                </a>
                <a href="#" className="footer-link-3d">
                  <Phone size={14} />
                  <span>Contact</span>
                </a>
              </div>
              
              <div className="footer-social-enhanced">
                <a href="#" className="social-link-3d">
                  <Facebook size={16} />
                </a>
                <a href="#" className="social-link-3d">
                  <Twitter size={16} />
                </a>
                <a href="#" className="social-link-3d">
                  <Linkedin size={16} />
                </a>
                <a href="#" className="social-link-3d">
                  <Instagram size={16} />
                </a>
              </div>
              
              <p className="footer-copyright-enhanced">
                © {new Date().getFullYear()} RE-Link South Africa. All rights reserved.
              </p>
            </div>
          </div>
          
          <div className="footer-certifications">
            <span className="cert-badge">
              <ShieldCheck size={12} />
              POPIA Compliant
            </span>
            <span className="cert-badge">
              <Award size={12} />
              B-BBEE Level 1
            </span>
            <span className="cert-badge">
              <CheckCircle size={12} />
              DCS Verified
            </span>
          </div>
        </footer>
      </div>

      {/* Enhanced 3D Spinning Bot Assistant */}
      <div 
        className={`bot-assistant-premium ${botSpinning ? 'spinning-3d' : ''}`} 
        onClick={handleBotActivation}
        ref={botRef}
      >
        <div className="bot-3d-container">
          <div className="bot-glow-ring"></div>
          <div className="bot-sphere">
            <div className="bot-sphere-face front">
              <img src={ReLinkLogo} alt="RE-Link Assistant" className="bot-logo-3d" />
            </div>
            <div className="bot-sphere-face back">
              <Bot size={30} />
            </div>
            <div className="bot-sphere-face right"></div>
            <div className="bot-sphere-face left"></div>
            <div className="bot-sphere-face top"></div>
            <div className="bot-sphere-face bottom"></div>
          </div>
          <div className="bot-pulse-rings">
            <div className="pulse-ring ring1"></div>
            <div className="pulse-ring ring2"></div>
            <div className="pulse-ring ring3"></div>
          </div>
          <div className="bot-status-indicator-3d online"></div>
        </div>
        <div className="bot-tooltip-premium">
          <Sparkles size={12} />
          <span>Ask me anything!</span>
          <Zap size={12} />
        </div>
      </div>

      {/* Enhanced Bot Modal */}
      {showBot && (
        <div className="bot-modal-premium">
          <div className="bot-modal-overlay" onClick={() => setShowBot(false)}></div>
          <div className="bot-modal-content-enhanced glass-effect" onClick={e => e.stopPropagation()}>
            <div className="bot-modal-header-gradient">
              <div className="bot-modal-title-3d">
                <div className="bot-avatar-3d">
                  <img src={ReLinkLogo} alt="RE-Link Bot" />
                  <div className="avatar-glow"></div>
                </div>
                <div className="bot-info-enhanced">
                  <h3>RE-Link Assistant</h3>
                  <div className="bot-status-enhanced">
                    <div className="status-dot-3d online"></div>
                    <span>AI Assistant • Online</span>
                    <Target size={12} />
                  </div>
                </div>
              </div>
              <button className="close-bot-btn-3d" onClick={() => setShowBot(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="bot-conversation-enhanced">
              <div className="bot-message-3d">
                <div className="message-avatar-3d">
                  <Bot size={20} />
                </div>
                <div className="message-bubble-premium">
                  <p className="message-text-gradient">
                    {botMessage || botResponses.greeting}
                  </p>
                  <span className="message-time-3d">Just now</span>
                </div>
              </div>
              
              <div className="suggested-questions-enhanced">
                <p className="suggested-title">Quick questions:</p>
                <div className="suggested-buttons-3d">
                  <button className="suggested-btn-3d" onClick={() => {
                    setUserInput("How do I find jobs in SA?");
                    setBotMessage(botResponses.jobs);
                  }}>
                    <Briefcase size={14} />
                    Find jobs
                  </button>
                  <button className="suggested-btn-3d" onClick={() => {
                    setUserInput("How to submit referrals?");
                    setBotMessage(botResponses.referrals);
                  }}>
                    <FileText size={14} />
                    Submit referrals
                  </button>
                  <button className="suggested-btn-3d" onClick={() => {
                    setUserInput("Update my profile");
                    setBotMessage(botResponses.profile);
                  }}>
                    <User size={14} />
                    Update profile
                  </button>
                  <button className="suggested-btn-3d" onClick={() => {
                    setUserInput("Need support in South Africa");
                    setBotMessage(botResponses.support);
                  }}>
                    <Heart size={14} />
                    Get support
                  </button>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleBotSubmit} className="bot-input-form-enhanced">
              <div className="input-container-3d">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Ask me anything about RE-Link..."
                  className="bot-input-premium"
                  disabled={isLoading}
                />
                <button type="submit" className="send-bot-btn-3d" disabled={isLoading}>
                  {isLoading ? <Loader2 size={18} className="spinner-3d" /> : <Send size={18} />}
                </button>
              </div>
              <p className="bot-hint-enhanced">
                <Zap size={10} />
                Press Enter to send • Type 'help' for options
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainLayout;