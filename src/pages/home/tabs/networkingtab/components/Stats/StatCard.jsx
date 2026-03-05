// src/pages/home/tabs/networkingtab/components/Stats/StatCard.jsx
import React from 'react';
import { 
  Briefcase, 
  CalendarCheck, 
  Award,
  Users,
  UserPlus,
  MessageCircle,
  TrendingUp,
  MapPin,
  Building2,
  Handshake,
  Target,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

const StatCard = ({ 
  number, 
  label, 
  icon, 
  iconBgColor = '#e6f0ff',
  iconColor = '#0066cc',
  onClick,
  loading = false
}) => {
  
  // Map icon strings to components
  const getIcon = () => {
    const iconProps = { size: 24, color: iconColor };
    
    switch(icon) {
      // Application stats
      case 'applications':
        return <Briefcase {...iconProps} />;
      case 'interviews':
        return <CalendarCheck {...iconProps} />;
      case 'offers':
        return <Award {...iconProps} />;
      
      // Connection stats
      case 'connections':
        return <Users {...iconProps} />;
      case 'pending':
        return <UserPlus {...iconProps} />;
      case 'messages':
        return <MessageCircle {...iconProps} />;
      
      // Activity stats
      case 'views':
        return <TrendingUp {...iconProps} />;
      case 'requests':
        return <Target {...iconProps} />;
      case 'response':
        return <CheckCircle {...iconProps} />;
      
      // Location stats
      case 'nearby':
        return <MapPin {...iconProps} />;
      case 'employers':
        return <Building2 {...iconProps} />;
      case 'referrals':
        return <Handshake {...iconProps} />;
      
      // Status stats
      case 'applied':
        return <Clock {...iconProps} />;
      case 'accepted':
        return <CheckCircle {...iconProps} />;
      case 'rejected':
        return <XCircle {...iconProps} />;
      
      default:
        return <Briefcase {...iconProps} />;
    }
  };

  if (loading) {
    return (
      <div className="stat-card stat-card--loading">
        <div className="stat-card-loading">
          <div className="stat-card-loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`stat-card ${onClick ? 'stat-card--clickable' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : 'article'}
      tabIndex={onClick ? 0 : -1}
      style={onClick ? { cursor: 'pointer' } : {}}
    >
      <div 
        className="stat-card-icon"
        style={{ backgroundColor: iconBgColor }}
      >
        {getIcon()}
      </div>
      
      <div className="stat-card-content">
        <span className="stat-card-number">{number}</span>
        <span className="stat-card-label">{label}</span>
      </div>
    </div>
  );
};

// Application Stats Component (for your current ApplicationStats component)
export const ApplicationStats = ({ 
  applicationsSent = 0, 
  interviewsScheduled = 0, 
  jobOffers = 0,
  loading = false 
}) => (
  <div className="application-stats">
    <StatCard
      number={applicationsSent}
      label="Applications Sent"
      icon="applications"
      iconBgColor="#e6f0ff"
      iconColor="#0066cc"
      loading={loading}
    />
    <StatCard
      number={interviewsScheduled}
      label="Interviews"
      icon="interviews"
      iconBgColor="#f0e6ff"
      iconColor="#8b5cf6"
      loading={loading}
    />
    <StatCard
      number={jobOffers}
      label="Job Offers"
      icon="offers"
      iconBgColor="#e6f9ed"
      iconColor="#10b981"
      loading={loading}
    />
  </div>
);

// Connection Stats Component
export const ConnectionStats = ({ 
  totalConnections = 0, 
  pendingRequests = 0, 
  unreadMessages = 0,
  loading = false 
}) => (
  <div className="application-stats">
    <StatCard
      number={totalConnections}
      label="Connections"
      icon="connections"
      iconBgColor="#e6f0ff"
      iconColor="#0066cc"
      loading={loading}
    />
    <StatCard
      number={pendingRequests}
      label="Pending"
      icon="pending"
      iconBgColor="#fff0e6"
      iconColor="#f97316"
      loading={loading}
    />
    <StatCard
      number={unreadMessages}
      label="Messages"
      icon="messages"
      iconBgColor="#e6f9ed"
      iconColor="#10b981"
      loading={loading}
    />
  </div>
);

// Employer Stats Component
export const EmployerStats = ({ 
  nearbyEmployers = 0, 
  upcomingEvents = 0, 
  referrals = 0,
  loading = false 
}) => (
  <div className="application-stats">
    <StatCard
      number={nearbyEmployers}
      label="Nearby Employers"
      icon="nearby"
      iconBgColor="#f0e6ff"
      iconColor="#8b5cf6"
      loading={loading}
    />
    <StatCard
      number={upcomingEvents}
      label="Upcoming Events"
      icon="calendar"
      iconBgColor="#fef9e6"
      iconColor="#f59e0b"
      loading={loading}
    />
    <StatCard
      number={referrals}
      label="Referrals"
      icon="referrals"
      iconBgColor="#fee6e6"
      iconColor="#ef4444"
      loading={loading}
    />
  </div>
);

// Activity Stats Component
export const ActivityStats = ({ 
  profileViews = 0, 
  connectionRequests = 0, 
  responseRate = '0%',
  loading = false 
}) => (
  <div className="application-stats">
    <StatCard
      number={profileViews}
      label="Profile Views"
      icon="views"
      iconBgColor="#e6f0ff"
      iconColor="#0066cc"
      loading={loading}
    />
    <StatCard
      number={connectionRequests}
      label="Requests"
      icon="requests"
      iconBgColor="#fff0e6"
      iconColor="#f97316"
      loading={loading}
    />
    <StatCard
      number={responseRate}
      label="Response Rate"
      icon="response"
      iconBgColor="#e6f9ed"
      iconColor="#10b981"
      loading={loading}
    />
  </div>
);

// Job Status Stats Component
export const JobStatusStats = ({ 
  applied = 0, 
  accepted = 0, 
  rejected = 0,
  loading = false 
}) => (
  <div className="application-stats">
    <StatCard
      number={applied}
      label="Applied"
      icon="applied"
      iconBgColor="#e6f0ff"
      iconColor="#0066cc"
      loading={loading}
    />
    <StatCard
      number={accepted}
      label="Accepted"
      icon="accepted"
      iconBgColor="#e6f9ed"
      iconColor="#10b981"
      loading={loading}
    />
    <StatCard
      number={rejected}
      label="Rejected"
      icon="rejected"
      iconBgColor="#fee6e6"
      iconColor="#ef4444"
      loading={loading}
    />
  </div>
);

// Add loading spinner styles (add this to your networking.css file)
const loadingStyles = `
.stat-card--loading {
  position: relative;
  overflow: hidden;
  min-height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-card-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.stat-card-loading-spinner {
  width: 30px;
  height: 30px;
  border: 3px solid #e5e7eb;
  border-top-color: #0066cc;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.stat-card--clickable {
  cursor: pointer;
}
`;

export default StatCard;