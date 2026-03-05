import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useEvents({ setCredibilityScore, setNotifications }) {
  const [communityEvents, setCommunityEvents] = useLocalStorage('relink_events', [
    {
      id: 1,
      title: "Job Fair 2024 - Soweto",
      date: "2024-02-15",
      time: "9:00 AM - 4:00 PM",
      location: "Soweto Expo Centre",
      address: "123 Chris Hani Road, Soweto",
      description: "Connect with 50+ employers hiring in construction, retail, and logistics",
      organizer: "RE-Link SA",
      capacity: 500,
      registered: 342,
      type: "job-fair",
      speakers: ["Thabo Mbeki", "Cyril Ramaphosa"],
      requirements: ["ID", "CV"],
      points: 15,
      rsvpStatus: "attending",
      image: "job-fair.jpg"
    },
    {
      id: 2,
      title: "Skills Workshop - Johannesburg",
      date: "2024-02-22",
      time: "2:00 PM - 5:00 PM",
      location: "Johannesburg Career Centre",
      address: "45 Main Street, Johannesburg CBD",
      description: "Interview skills, CV writing, and professional networking",
      organizer: "Career Development SA",
      capacity: 100,
      registered: 67,
      type: "workshop",
      speakers: ["Mary Ndlovu", "Peter Smith"],
      requirements: ["None"],
      points: 10,
      rsvpStatus: "pending",
      image: "workshop.jpg"
    },
    {
      id: 3,
      title: "Mentorship Meetup - Pretoria",
      date: "2024-03-05",
      time: "10:00 AM - 1:00 PM",
      location: "Pretoria Community Hall",
      address: "78 Church Street, Pretoria",
      description: "Connect with mentors in various industries",
      organizer: "RE-Link Mentorship Program",
      capacity: 50,
      registered: 23,
      type: "networking",
      speakers: ["Dr. Khumalo", "Sipho Dlamini"],
      requirements: ["None"],
      points: 20,
      rsvpStatus: "not-attending",
      image: "mentorship.jpg"
    }
  ]);

  const handleRSVP = (eventId) => {
    setCommunityEvents(prev => prev.map(event => {
      if (event.id === eventId) {
        const newStatus = event.rsvpStatus === 'attending' ? 'not-attending' : 'attending';
        
        if (newStatus === 'attending' && setCredibilityScore) {
          setCredibilityScore(prev => Math.min(100, prev + event.points));
          setNotifications(prev => [...prev, { 
            id: Date.now(), 
            message: `RSVP confirmed! +${event.points} points`, 
            type: 'success' 
          }]);
        }
        
        return { ...event, rsvpStatus: newStatus };
      }
      return event;
    }));
  };

  return {
    communityEvents,
    handleRSVP
  };
}