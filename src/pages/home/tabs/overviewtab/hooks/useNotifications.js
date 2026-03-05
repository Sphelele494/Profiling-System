import { useState } from 'react';

export function useNotifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your document was verified", time: "2 hours ago", read: false, type: "success" },
    { id: 2, message: "New job match: Construction Foreman", time: "5 hours ago", read: false, type: "info" },
    { id: 3, message: "Interview tomorrow at 10 AM", time: "1 day ago", read: true, type: "warning" },
    { id: 4, message: "Profile viewed by 3 employers", time: "2 days ago", read: true, type: "info" }
  ]);

  const markNotificationAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const clearNotifications = () => {
    if (window.confirm('Clear all notifications?')) {
      setNotifications([]);
    }
  };

  return {
    notifications,
    markNotificationAsRead,
    markAllNotificationsRead,
    clearNotifications
  };
}