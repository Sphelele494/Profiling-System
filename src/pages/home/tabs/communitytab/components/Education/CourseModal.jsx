import React from 'react';
import { X, Clock, DollarSign, Award, MapPin, ExternalLink } from 'lucide-react';
import './Education.css';

export const CourseModal = ({ course, onClose, onEnroll }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{course.name}</h3>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <p className="provider">{course.provider}</p>
          <p className="description">{course.description}</p>

          <div className="course-details-grid">
            <div className="detail-item">
              <Clock size={16} />
              <div>
                <span className="label">Duration</span>
                <span className="value">{course.duration}</span>
              </div>
            </div>
            <div className="detail-item">
              <DollarSign size={16} />
              <div>
                <span className="label">Cost</span>
                <span className="value">{course.cost}</span>
              </div>
            </div>
            <div className="detail-item">
              <Award size={16} />
              <div>
                <span className="label">Certification</span>
                <span className="value">{course.certification}</span>
              </div>
            </div>
            <div className="detail-item">
              <MapPin size={16} />
              <div>
                <span className="label">Locations</span>
                <span className="value">{course.locations.length} provinces</span>
              </div>
            </div>
          </div>

          <div className="course-section">
            <h4>Features</h4>
            <ul className="features-list">
              {course.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="course-section">
            <h4>Requirements</h4>
            <ul className="requirements-list">
              {course.requirements.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>
          </div>

          <div className="course-section">
            <h4>Application Details</h4>
            <p><strong>Deadline:</strong> {course.applicationDeadline}</p>
            <p><strong>Completion Rate:</strong> {course.completionRate}%</p>
            <p><strong>Students Enrolled:</strong> {course.studentsEnrolled.toLocaleString()}</p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>
            Close
          </button>
          <button className="enroll-btn" onClick={() => onEnroll(course)}>
            <ExternalLink size={16} />
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};