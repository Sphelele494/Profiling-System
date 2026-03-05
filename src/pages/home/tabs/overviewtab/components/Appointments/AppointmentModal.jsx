import React, { useState } from 'react';
import { X, Save, Bell } from 'lucide-react';
import './AppointmentsCard.css';

export const AppointmentModal = ({ appointment, onClose, onSave, showTemporaryMessage }) => {
  const [formData, setFormData] = useState({
    title: appointment?.title || '',
    type: appointment?.type || 'rehab',
    date: appointment?.date || '',
    time: appointment?.time || '',
    location: appointment?.location || '',
    notes: appointment?.notes || '',
    reminder: appointment?.reminder || false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.time || !formData.location) {
      showTemporaryMessage('Please fill in all required fields', 'error');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{appointment ? 'Edit Appointment' : 'Add Appointment'}</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>Title <span className="required">*</span></label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter appointment title"
                required
              />
            </div>

            <div className="form-group">
              <label>Type</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="rehab">Rehabilitation</option>
                <option value="medical">Medical</option>
                <option value="community">Community</option>
                <option value="volunteer">Volunteer</option>
                <option value="counseling">Counseling</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date <span className="required">*</span></label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Time <span className="required">*</span></label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Location <span className="required">*</span></label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter location"
                required
              />
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea
                name="notes"
                rows="3"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any additional notes..."
              ></textarea>
            </div>

            <div className="form-checkbox">
              <label>
                <input
                  type="checkbox"
                  name="reminder"
                  checked={formData.reminder}
                  onChange={handleChange}
                />
                <Bell size={14} />
                <span>Set reminder for this appointment</span>
              </label>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              <Save size={16} />
              {appointment ? 'Update' : 'Save'} Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};