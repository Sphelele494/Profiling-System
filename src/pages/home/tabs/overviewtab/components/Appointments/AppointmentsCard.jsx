import React, { useState } from 'react';
import { Calendar, Plus, Clock, MapPin, FileText, Bell, CheckCircle, Edit, Trash2 } from 'lucide-react';
import { AppointmentModal } from './AppointmentModal';
import { FilterTabs } from '../common/FilterTabs';
import { TYPE_COLORS } from '../../utils/constants';
import './AppointmentsCard.css';

export const AppointmentsCard = ({
  appointments,
  activeFilter,
  setActiveFilter,
  getFilteredAppointments,
  onAddAppointment,
  onUpdateAppointment,
  onDeleteAppointment,
  onStatusChange,
  onSetReminder,
  showTemporaryMessage
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingAppointment(null);
    setShowModal(true);
  };

  const handleSave = (appointmentData) => {
    if (editingAppointment) {
      onUpdateAppointment(editingAppointment.id, appointmentData);
    } else {
      onAddAppointment(appointmentData);
    }
    setShowModal(false);
    setEditingAppointment(null);
  };

  return (
    <div className="dashboard-card glass-effect">
      <div className="card-header">
        <h4 className="card-title">
          <Calendar size={20} />
          <span>Appointments</span>
        </h4>
        <button className="card-action" onClick={handleAdd}>
          <Plus size={16} />
        </button>
      </div>

      <FilterTabs
        options={['all', 'upcoming', 'completed']}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <div className="appointments-list">
        {getFilteredAppointments().length === 0 ? (
          <p className="no-items">No appointments found</p>
        ) : (
          getFilteredAppointments().map(appointment => (
            <div key={appointment.id} className="appointment-item">
              <div 
                className="appointment-time-indicator" 
                onClick={() => showTemporaryMessage(`Time: ${appointment.time}`)}
              >
                <Clock size={12} />
                <span>{appointment.time}</span>
              </div>
              
              <div className="appointment-type">
                <div 
                  className="type-indicator"
                  style={{ backgroundColor: TYPE_COLORS[appointment.type] }}
                  onClick={() => showTemporaryMessage(`Type: ${appointment.type}`)}
                ></div>
                <span className="appointment-title">{appointment.title}</span>
              </div>
              
              <div className="appointment-details">
                <span 
                  className="appointment-date" 
                  onClick={() => showTemporaryMessage(`Date: ${appointment.date}`)}
                >
                  {appointment.date}
                </span>
                <span 
                  className="appointment-location" 
                  onClick={() => showTemporaryMessage(`Location: ${appointment.location}`)}
                >
                  <MapPin size={10} />
                  {appointment.location}
                </span>
              </div>
              
              <div className="appointment-actions">
                <button 
                  className={`reminder-btn ${appointment.reminder ? 'active' : ''}`}
                  onClick={() => onSetReminder(appointment.id)}
                  title={appointment.reminder ? 'Reminder set' : 'Set reminder'}
                >
                  <Bell size={14} />
                </button>
                <button 
                  className="status-btn"
                  onClick={() => onStatusChange(appointment.id, 'completed')}
                  title="Mark as completed"
                >
                  <CheckCircle size={14} />
                </button>
                <button 
                  className="edit-btn"
                  onClick={() => handleEdit(appointment)}
                  title="Edit"
                >
                  <Edit size={14} />
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => onDeleteAppointment(appointment.id)}
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              {appointment.notes && (
                <div 
                  className="appointment-notes" 
                  onClick={() => showTemporaryMessage(appointment.notes)}
                >
                  <FileText size={12} />
                  <span>{appointment.notes}</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {showModal && (
        <AppointmentModal
          appointment={editingAppointment}
          onClose={() => {
            setShowModal(false);
            setEditingAppointment(null);
          }}
          onSave={handleSave}
          showTemporaryMessage={showTemporaryMessage}
        />
      )}
    </div>
  );
};