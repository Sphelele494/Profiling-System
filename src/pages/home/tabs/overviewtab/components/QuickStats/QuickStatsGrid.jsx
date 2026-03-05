import React from 'react';
import { Eye, Network, Send, FileText, Users, GraduationCap, TrendingUp } from 'lucide-react';
import './QuickStatsGrid.css';

const statIcons = {
  dailyViews: Eye,
  weeklyConnections: Network,
  monthlyApplications: Send,
  totalReferrals: FileText,
  eventsAttended: Users,
  certificatesEarned: GraduationCap
};

const statColors = {
  dailyViews: 'gradient-green',
  weeklyConnections: 'gradient-blue',
  monthlyApplications: 'gradient-purple',
  totalReferrals: 'gradient-orange',
  eventsAttended: 'gradient-red',
  certificatesEarned: 'gradient-teal'
};

const statTrends = {
  dailyViews: '+12%',
  weeklyConnections: '+8%',
  monthlyApplications: '+15%',
  totalReferrals: '+5%',
  eventsAttended: '+25%',
  certificatesEarned: '+50%'
};

export const QuickStatsGrid = ({ quickStats, showTemporaryMessage }) => {
  return (
    <div className="quick-stats-grid">
      {Object.entries(quickStats).map(([key, value]) => {
        const Icon = statIcons[key] || Eye;
        const colorClass = statColors[key] || 'gradient-green';
        const trend = statTrends[key] || '+10%';
        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        
        return (
          <div 
            key={key} 
            className="quick-stat-card glass-effect"
            onClick={() => showTemporaryMessage(`${label}: ${value}`)}
          >
            <div className={`quick-stat-icon ${colorClass}`}>
              <Icon size={24} />
            </div>
            <div className="quick-stat-content">
              <span className="quick-stat-number">{value}</span>
              <span className="quick-stat-label">{label}</span>
            </div>
            <div className="quick-stat-trend positive">
              <TrendingUp size={16} />
              <span>{trend}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};