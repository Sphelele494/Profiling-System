import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useVolunteer({ setNotifications }) {
  const [volunteerOpportunities, setVolunteerOpportunities] = useLocalStorage('relink_volunteer', [
    {
      id: 1,
      title: "Community Cleanup - Soweto",
      organization: "Soweto Green",
      date: "2024-02-24",
      time: "8:00 AM - 12:00 PM",
      location: "Orlando West, Soweto",
      description: "Help clean and beautify community spaces",
      skills: ["Physical work", "Teamwork"],
      slots: 30,
      filled: 18,
      points: 10,
      certificate: true
    },
    {
      id: 2,
      title: "Youth Mentor - Weekend Program",
      organization: "RE-Link Youth",
      date: "Every Saturday",
      time: "9:00 AM - 1:00 PM",
      location: "Johannesburg",
      description: "Mentor at-risk youth in life skills",
      skills: ["Mentoring", "Patience", "Communication"],
      slots: 15,
      filled: 8,
      points: 25,
      certificate: true
    },
    {
      id: 3,
      title: "Food Bank Distribution",
      organization: "Soweto Food Bank",
      date: "2024-02-28",
      time: "10:00 AM - 3:00 PM",
      location: "Pimville, Soweto",
      description: "Help sort and distribute food parcels",
      skills: ["Organization", "Customer service"],
      slots: 20,
      filled: 12,
      points: 15,
      certificate: true
    }
  ]);

  const handleVolunteerSignup = (opportunity) => {
    setVolunteerOpportunities(prev => prev.map(opp => {
      if (opp.id === opportunity.id) {
        return { ...opp, filled: opp.filled + 1 };
      }
      return opp;
    }));
    
    setNotifications(prev => [...prev, { 
      id: Date.now(), 
      message: `Signed up for ${opportunity.title}`, 
      type: 'success' 
    }]);
  };

  return {
    volunteerOpportunities,
    handleVolunteerSignup
  };
}