import React from 'react';
import { BadgeCheck, Shield, Target, Globe, Clock, TrendingUp } from 'lucide-react';

const supportItems = [
  {
    icon: BadgeCheck,
    title: 'DCS Verified',
    description: 'All profiles verified by Department of Correctional Services'
  },
  {
    icon: Shield,
    title: 'Secure & Confidential',
    description: 'Your information is protected with enterprise-grade encryption'
  },
  {
    icon: Target,
    title: 'Smart Matching',
    description: 'AI-powered algorithm for perfect matches'
  },
  {
    icon: Globe,
    title: 'Nationwide Coverage',
    description: 'Active in all 9 South African provinces'
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock assistance for all users'
  },
  {
    icon: TrendingUp,
    title: 'Career Growth',
    description: 'Continuous development and advancement opportunities'
  }
];

export const SupportSection = () => {
  return (
    <div className="support-section">
      <h3 className="support-title">Why Choose RE-Link?</h3>
      <div className="support-grid">
        {supportItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="support-item">
              <div className="support-icon">
                <Icon size={24} />
              </div>
              <div className="support-content">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};