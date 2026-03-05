import React from 'react';
import { Users, FileText, Award, DollarSign, Calendar, Heart, GraduationCap } from 'lucide-react';
import './CommunityHeader.css';

export const CommunityHeader = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'score', label: 'Score', icon: Award },
    { id: 'grants', label: 'Grants', icon: DollarSign },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'volunteer', label: 'Volunteer', icon: Heart },
  ];

  return (
    <div className="community-header">
      <h3 className="section-title">
        <Users size={28} />
        <span>Build Your Credibility in South Africa</span>
      </h3>
      <p className="section-subtitle">
        Track your journey, submit referrals, and access reintegration resources
      </p>

      <div className="quick-actions">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`quick-action-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};