import React from 'react';
import { Heart, Calendar, MapPin, Users, Award, Clock, ExternalLink } from 'lucide-react';
import './Volunteer.css';

export const VolunteerCard = ({ opportunities, onSignup, onClose }) => {
  return (
    <div className="volunteer-card">
      <div className="card-header">
        <h4>
          <Heart size={20} />
          Volunteer Opportunities
        </h4>
        <button onClick={onClose}>
          <ExternalLink size={16} />
        </button>
      </div>

      <div className="volunteer-list">
        {opportunities.map(opp => (
          <div key={opp.id} className="volunteer-item">
            <h5>{opp.title}</h5>
            <p className="organization">{opp.organization}</p>
            <p className="description">{opp.description}</p>
            
            <div className="volunteer-details">
              <div className="detail">
                <Calendar size={12} />
                <span>{opp.date}</span>
              </div>
              <div className="detail">
                <Clock size={12} />
                <span>{opp.time}</span>
              </div>
              <div className="detail">
                <MapPin size={12} />
                <span>{opp.location}</span>
              </div>
            </div>

            <div className="volunteer-meta">
              <div className="skills">
                {opp.skills.map((skill, idx) => (
                  <span key={idx} className="skill-tag">{skill}</span>
                ))}
              </div>
              <div className="slots">
                <Users size={12} />
                <span>{opp.slots - opp.filled} spots left</span>
              </div>
              <span className="points">+{opp.points} pts</span>
            </div>

            {opp.certificate && (
              <div className="certificate-badge">
                <Award size={12} />
                <span>Certificate provided</span>
              </div>
            )}

            <button
              className="signup-btn"
              onClick={() => onSignup(opp)}
              disabled={opp.filled >= opp.slots}
            >
              {opp.filled >= opp.slots ? 'Full' : 'Sign Up'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};