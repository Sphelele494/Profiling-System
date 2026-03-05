import React from 'react';
import { Calendar, MapPin, Users, Clock, ExternalLink } from 'lucide-react';
import './Events.css';

export const EventsCard = ({ events, onRSVP, onClose }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleString('default', { month: 'short' })
    };
  };

  return (
    <div className="events-card">
      <div className="card-header">
        <h4>
          <Calendar size={20} />
          Upcoming Events
        </h4>
        <button onClick={onClose}>
          <ExternalLink size={16} />
        </button>
      </div>

      <div className="events-list">
        {events.map(event => {
          const { day, month } = formatDate(event.date);
          return (
            <div key={event.id} className="event-item">
              <div className="event-date-badge">
                <span className="day">{day}</span>
                <span className="month">{month}</span>
              </div>
              <div className="event-details">
                <h5>{event.title}</h5>
                <p className="event-time">
                  <Clock size={12} />
                  {event.time}
                </p>
                <p className="event-location">
                  <MapPin size={12} />
                  {event.location}
                </p>
                <div className="event-meta">
                  <span className="event-capacity">
                    <Users size={12} />
                    {event.registered}/{event.capacity}
                  </span>
                  <span className="event-points">+{event.points} pts</span>
                </div>
              </div>
              <button
                className={`rsvp-btn ${event.rsvpStatus}`}
                onClick={() => onRSVP(event.id)}
              >
                {event.rsvpStatus === 'attending' ? '✓ Attending' : 'RSVP'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};