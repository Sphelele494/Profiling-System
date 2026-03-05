import { useState } from 'react';

export function useCredibility(externalScore, externalSetScore, setSuccessMessage, setIsLoading) {
  const [credibilityScore, setCredibilityScore] = useState(externalScore || 78);

  const credibilityMetrics = [
    { 
      label: "Community Participation", 
      score: 85, 
      color: "#10b981", 
      points: 25, 
      icon: "👥",
      description: "Active in community events and forums",
      improvement: "Attend 2 more events this month",
      tasks: [
        "Join community forum discussion",
        "Attend Soweto Job Fair (Feb 20)",
        "Volunteer at local event"
      ]
    },
    { 
      label: "Professional Development", 
      score: 72, 
      color: "#059669", 
      points: 18, 
      icon: "📚",
      description: "Completed courses and certifications",
      improvement: "Complete the upcoming leadership workshop",
      tasks: [
        "Finish online safety course",
        "Attend leadership workshop",
        "Update skills section"
      ]
    },
    { 
      label: "Employment Stability", 
      score: 90, 
      color: "#047857", 
      points: 30, 
      icon: "💼",
      description: "Consistent employment history",
      improvement: "Maintain current position for 6+ months",
      tasks: [
        "Update employment history",
        "Add reference contacts",
        "Request employer verification"
      ]
    },
    { 
      label: "Mentorship Engagement", 
      score: 65, 
      color: "#065f46", 
      points: 15, 
      icon: "👨‍🏫",
      description: "Active mentor/mentee relationships",
      improvement: "Schedule monthly mentor meetings",
      tasks: [
        "Find a mentor in construction",
        "Schedule monthly check-in",
        "Attend mentorship workshop"
      ]
    },
    { 
      label: "Rehabilitation Completion", 
      score: 100, 
      color: "#064e3b", 
      points: 20, 
      icon: "✅",
      description: "Completed all required programs",
      improvement: "Perfect score - maintain this level",
      tasks: [
        "Maintain attendance record",
        "Complete follow-up sessions",
        "Share success story"
      ]
    },
    { 
      label: "Document Verification", 
      score: 80, 
      color: "#022c22", 
      points: 25, 
      icon: "📄",
      description: "Verified documents on file",
      improvement: "Upload outstanding certificates",
      tasks: [
        "Upload ID document",
        "Upload training certificate",
        "Verify police clearance"
      ]
    }
  ];

  const refreshCredibilityScore = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newScore = Math.min(100, credibilityScore + 2);
      setCredibilityScore(newScore);
      if (externalSetScore) externalSetScore(newScore);
      setIsLoading(false);
      setSuccessMessage({ text: 'Credibility score updated!', type: 'success' });
    }, 1500);
  };

  const calculatePotentialScore = () => {
    const maxPossible = credibilityMetrics.reduce((acc, metric) => {
      return acc + (metric.points * (metric.score < 100 ? 1 : 0));
    }, credibilityScore);
    return Math.min(100, maxPossible);
  };

  return {
    credibilityScore,
    credibilityMetrics,
    refreshCredibilityScore,
    calculatePotentialScore
  };
}