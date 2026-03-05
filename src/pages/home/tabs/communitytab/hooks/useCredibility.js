import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useCredibility({ externalScore, setCredibilityScore: externalSetScore }) {
  const [credibilityScore, setCredibilityScore] = useLocalStorage('relink_credibility_score', externalScore || 78);

  const credibilityMetrics = [
    { 
      label: "Community Participation", 
      score: 85, 
      color: "#10b981", 
      points: 25, 
      icon: "👥",
      description: "Based on event attendance and community engagement",
      improvement: "Attend 3 more community events this month",
      target: 90,
      industryAvg: 72,
      history: [65, 70, 78, 82, 85]
    },
    { 
      label: "Professional Development", 
      score: 72, 
      color: "#059669", 
      points: 18, 
      icon: "📚",
      description: "Courses completed and skills acquired",
      improvement: "Complete Construction Supervisor Course",
      target: 85,
      industryAvg: 68,
      history: [50, 55, 62, 68, 72]
    },
    { 
      label: "Employment Stability", 
      score: 90, 
      color: "#047857", 
      points: 30, 
      icon: "💼",
      description: "Consistent employment history",
      improvement: "Maintain current position for 6 months",
      target: 95,
      industryAvg: 75,
      history: [70, 80, 85, 88, 90]
    },
    { 
      label: "Mentorship Engagement", 
      score: 65, 
      color: "#065f46", 
      points: 15, 
      icon: "👨‍🏫",
      description: "Both receiving and providing mentorship",
      improvement: "Sign up as a mentor for new members",
      target: 80,
      industryAvg: 55,
      history: [40, 45, 52, 58, 65]
    },
    { 
      label: "Rehabilitation Completion", 
      score: 100, 
      color: "#064e3b", 
      points: 20, 
      icon: "✅",
      description: "All required programs completed",
      improvement: "Perfect score achieved!",
      target: 100,
      industryAvg: 82,
      history: [60, 75, 85, 95, 100]
    },
    { 
      label: "Document Verification", 
      score: 80, 
      color: "#022c22", 
      points: 25, 
      icon: "📄",
      description: "Verified documents uploaded",
      improvement: "Upload and verify 2 more documents",
      target: 90,
      industryAvg: 65,
      history: [40, 55, 65, 72, 80]
    }
  ];

  const [scoreSuggestions, setScoreSuggestions] = useState([
    { 
      id: 1,
      action: "Upload Police Clearance Certificate",
      points: 30,
      difficulty: "easy",
      timeEstimate: "10 min",
      status: "pending",
      category: "documents"
    },
    { 
      id: 2,
      action: "Complete Construction Safety Course",
      points: 25,
      difficulty: "medium",
      timeEstimate: "2 hours",
      status: "in-progress",
      category: "education"
    },
    { 
      id: 3,
      action: "Attend Soweto Job Fair",
      points: 15,
      difficulty: "easy",
      timeEstimate: "4 hours",
      status: "pending",
      category: "events"
    },
    { 
      id: 4,
      action: "Get Employer Reference Letter",
      points: 20,
      difficulty: "medium",
      timeEstimate: "1 week",
      status: "pending",
      category: "referrals"
    },
    { 
      id: 5,
      action: "Complete 3 Months Employment",
      points: 50,
      difficulty: "hard",
      timeEstimate: "3 months",
      status: "in-progress",
      category: "employment",
      progress: 65
    },
    { 
      id: 6,
      action: "Complete Free Online Course",
      points: 15,
      difficulty: "easy",
      timeEstimate: "3 hours",
      status: "pending",
      category: "education"
    }
  ]);

  const getActionableSuggestions = () => {
    return scoreSuggestions.filter(s => s.status !== 'completed').slice(0, 5);
  };

  const completeSuggestion = (suggestionId) => {
    setScoreSuggestions(prev => prev.map(s => 
      s.id === suggestionId ? { ...s, status: 'completed' } : s
    ));
    
    const suggestion = scoreSuggestions.find(s => s.id === suggestionId);
    if (suggestion && externalSetScore) {
      externalSetScore(prev => Math.min(100, prev + suggestion.points));
    }
    
    return suggestion;
  };

  const calculateIndustryAverage = () => {
    const avg = credibilityMetrics.reduce((sum, m) => sum + m.industryAvg, 0) / credibilityMetrics.length;
    return Math.round(avg);
  };

  const getScoreComparison = () => {
    const userAvg = credibilityMetrics.reduce((sum, m) => sum + m.score, 0) / credibilityMetrics.length;
    const industryAvg = calculateIndustryAverage();
    const aboveAvg = userAvg > industryAvg;
    
    return {
      userAvg: Math.round(userAvg),
      industryAvg,
      aboveAvg,
      difference: Math.abs(Math.round(userAvg - industryAvg))
    };
  };

  return {
    credibilityScore,
    credibilityMetrics,
    scoreSuggestions,
    getActionableSuggestions,
    completeSuggestion,
    calculateIndustryAverage,
    getScoreComparison,
    setCredibilityScore
  };
}