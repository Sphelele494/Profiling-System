import { useState } from 'react';

export function useGrants({ setNotifications }) {
  const [governmentGrants, setGovernmentGrants] = useState([
    {
      id: 1,
      name: "DCS Reintegration Grant",
      amount: "R5,000",
      eligibility: "Released within last 12 months",
      deadline: "2024-12-31",
      documents: ["Release Certificate", "ID", "Bank Statement"],
      status: "available",
      probability: "high",
      description: "Monthly reintegration support for ex-offenders"
    },
    {
      id: 2,
      name: "SASSA Skills Development",
      amount: "R3,500",
      eligibility: "Registered for approved training",
      deadline: "2024-06-30",
      documents: ["Training Enrollment", "ID", "Proof of Residence"],
      status: "available",
      probability: "medium",
      description: "Training allowance for skill development"
    },
    {
      id: 3,
      name: "NYDA Youth Employment",
      amount: "R2,800",
      eligibility: "Aged 18-35, unemployed",
      deadline: "2024-09-15",
      documents: ["ID", "CV", "Bank Account"],
      status: "available",
      probability: "high",
      description: "Youth employment incentive program"
    },
    {
      id: 4,
      name: "Housing Subsidy",
      amount: "R15,000",
      eligibility: "First-time home buyer, employed",
      deadline: "2024-11-30",
      documents: ["Employment Letter", "ID", "Credit Check"],
      status: "limited",
      probability: "medium",
      description: "Assistance with housing deposit"
    }
  ]);

  const checkGrantEligibility = (grant) => {
    const userProfile = {
      age: 32,
      employed: true,
      released: true,
      releaseDate: "2023-01-15"
    };
    
    switch(grant.id) {
      case 1:
        return userProfile.released;
      case 2:
        return userProfile.age >= 18;
      case 3:
        return userProfile.age >= 18 && userProfile.age <= 35;
      case 4:
        return userProfile.employed;
      default:
        return false;
    }
  };

  const applyForGrant = (grant) => {
    if (checkGrantEligibility(grant)) {
      setNotifications(prev => [...prev, { 
        id: Date.now(), 
        message: `Application started for ${grant.name}`, 
        type: 'success' 
      }]);
    } else {
      setNotifications(prev => [...prev, { 
        id: Date.now(), 
        message: 'You may not be eligible for this grant', 
        type: 'warning' 
      }]);
    }
  };

  return {
    governmentGrants,
    checkGrantEligibility,
    applyForGrant
  };
}