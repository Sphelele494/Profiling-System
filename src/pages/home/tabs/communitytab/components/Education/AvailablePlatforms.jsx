import React from 'react';
import {
  Award, Briefcase, Users, Building, Monitor, Globe,
  GraduationCap, Settings, ShoppingBag, BookOpen, Clock,
  DollarSign, MapPin, Star, ExternalLink
} from 'lucide-react';
import './Education.css';

const iconMap = {
  Award, Briefcase, Users, Building, Monitor, Globe,
  GraduationCap, Settings, ShoppingBag, BookOpen
};

export const AvailablePlatforms = ({
  platforms,
  searchTerm,
  category,
  enrolledCourses,
  bookmarkedCourses,
  onEnroll,
  onBookmark
}) => {
  const filteredPlatforms = platforms.filter(p => {
    if (category !== 'all' && p.type !== category) return false;
    if (searchTerm && !p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !p.provider.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="available-platforms">
      <h5>Available Learning Platforms</h5>
      <div className="platforms-grid">
        {filteredPlatforms.map(platform => {
          const Icon = iconMap[platform.icon] || Award;
          const isEnrolled = enrolledCourses.includes(platform.id);
          const isBookmarked = bookmarkedCourses.includes(platform.id);

          return (
            <div key={platform.id} className="platform-card">
              <div className="platform-header">
                <Icon size={24} />
                <h6>{platform.name}</h6>
                <div className="platform-actions">
                  <button
                    className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
                    onClick={() => onBookmark(platform.id)}
                  >
                    <Star size={16} fill={isBookmarked ? '#fbbf24' : 'none'} />
                  </button>
                </div>
              </div>

              <p className="provider">{platform.provider}</p>
              <p className="description">{platform.description}</p>

              <div className="platform-stats">
                <div className="stat">
                  <span className="stat-label">Courses</span>
                  <span className="stat-value">{platform.courses || 'N/A'}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Rating</span>
                  <span className="stat-value">⭐ {platform.rating}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Students</span>
                  <span className="stat-value">{platform.studentsEnrolled.toLocaleString()}</span>
                </div>
              </div>

              <div className="platform-details">
                <div className="detail-item">
                  <Clock size={14} />
                  <span>{platform.duration}</span>
                </div>
                <div className="detail-item">
                  <DollarSign size={14} />
                  <span>{platform.cost}</span>
                </div>
                <div className="detail-item">
                  <Award size={14} />
                  <span>{platform.certification}</span>
                </div>
              </div>

              <div className="platform-features">
                {platform.features.slice(0, 3).map((feature, idx) => (
                  <span key={idx} className="feature-tag">{feature}</span>
                ))}
              </div>

              <div className="platform-requirements">
                <h6>Requirements:</h6>
                <ul>
                  {platform.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="platform-locations">
                <MapPin size={14} />
                <span>{platform.locations.join(' • ')}</span>
              </div>

              <div className="platform-footer">
                <span className="points">+{platform.points} points</span>
                <button
                  className="enroll-btn"
                  onClick={() => onEnroll(platform)}
                  disabled={isEnrolled}
                >
                  <ExternalLink size={16} />
                  {isEnrolled ? 'Enrolled' : 'Apply'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};