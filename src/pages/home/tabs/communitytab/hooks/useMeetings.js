import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useMeetings({ setNotifications }) {
  const [communityMeetings, setCommunityMeetings] = useLocalStorage('relink_meetings', [
    {
      id: 1,
      title: "Soweto Ex-Offender Support Group",
      date: "2024-02-20",
      time: "5:00 PM - 7:00 PM",
      location: "Soweto Community Centre",
      facilitator: "Thabo M.",
      topic: "Overcoming Employment Barriers",
      attendees: 45,
      type: "support-group"
    },
    {
      id: 2,
      title: "Community Leaders Forum",
      date: "2024-02-27",
      time: "6:00 PM - 8:00 PM",
      location: "Johannesburg City Hall",
      facilitator: "Councillor Dlamini",
      topic: "Reintegration Policy Discussion",
      attendees: 120,
      type: "forum"
    }
  ]);

  const handleMeetingRSVP = (meeting) => {
    setNotifications(prev => [...prev, { 
      id: Date.now(), 
      message: `RSVP confirmed for ${meeting.title}`, 
      type: 'success' 
    }]);
  };

  return {
    communityMeetings,
    handleMeetingRSVP
  };
}