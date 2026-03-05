// hooks/useAppointments.js
import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useAppointments(setSuccessMessage) {
  const [appointments, setAppointments] = useLocalStorage('relink_appointments', [
    { id: 1, type: "rehab", title: "Rehabilitation Session", date: "2024-02-15", time: "10:00 AM", location: "Soweto Hope Center", status: "upcoming", notes: "Bring ID document", reminder: true },
    // ... other appointments
  ]);

  const handleAddAppointment = useCallback((newAppointment) => {
    const appointment = {
      id: appointments.length + 1,
      ...newAppointment,
      status: 'upcoming'
    };
    setAppointments(prev => [...prev, appointment]);
    setSuccessMessage({ text: 'Appointment added successfully', type: 'success' });
  }, [appointments.length, setAppointments, setSuccessMessage]);

  const handleUpdateAppointment = useCallback((id, updates) => {
    setAppointments(prev => 
      prev.map(apt => apt.id === id ? { ...apt, ...updates } : apt)
    );
    setSuccessMessage({ text: 'Appointment updated successfully', type: 'success' });
  }, [setAppointments, setSuccessMessage]);

  // Memoize other handlers similarly...

  return {
    appointments,
    handleAddAppointment,
    handleUpdateAppointment,
    handleDeleteAppointment: useCallback((id) => {
      if (window.confirm('Are you sure you want to delete this appointment?')) {
        setAppointments(prev => prev.filter(apt => apt.id !== id));
        setSuccessMessage({ text: 'Appointment deleted', type: 'success' });
      }
    }, [setAppointments, setSuccessMessage]),
    handleAppointmentStatus: useCallback((id, status) => {
      setAppointments(prev => 
        prev.map(apt => apt.id === id ? { ...apt, status } : apt)
      );
      setSuccessMessage({ text: `Appointment marked as ${status}`, type: 'success' });
    }, [setAppointments, setSuccessMessage]),
    handleSetReminder: useCallback((id) => {
      setAppointments(prev => 
        prev.map(apt => apt.id === id ? { ...apt, reminder: !apt.reminder } : apt)
      );
      setSuccessMessage({ text: 'Reminder updated', type: 'success' });
    }, [setAppointments, setSuccessMessage])
  };
}