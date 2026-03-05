import React from 'react';
import { Users, Calendar, MapPin, User, MessageCircle, ExternalLink } from 'lucide-react';
import './Meetings.css';

export const MeetingsCard = ({ meetings, onRSVP, onClose }) => {
  return (
    <div className="meetings-card">
      <div className="card-header">
        <h4>
          <Users size={20} />
          Community Meetings
        </h4>
        <button onClick={onClose}>
          <ExternalLink size={16} />
        </button>
      </div>

      <div className="meetings-list">
        {meetings.map(meeting => (
          <div key={meeting.id} className="meeting-item">
            <h5>{meeting.title}</h5>
            <p className="topic">
              <MessageCircle size={12} />
              Topic: {meeting.topic}
            </p>
            <div className="meeting-meta">
              <span>
                <Calendar size={12} />
                {new Date(meeting.date).toLocaleDateString('en-ZA')} • {meeting.time}
              </span>
              <span>
                <MapPin size={12} />
                {meeting.location}
              </span>
            </div>
            <div className="meeting-footer">
              <span className="facilitator">
                <User size={12} />
                Facilitator: {meeting.facilitator}
              </span>
              <span className="attendees">
                <Users size={12} />
                {meeting.attendees} attending
              </span>
              <button onClick={() => onRSVP(meeting)} className="join-btn">
                Join
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};