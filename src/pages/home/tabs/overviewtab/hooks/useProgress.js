import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useProgress(setSuccessMessage) {
  const [quickStats, setQuickStats] = useLocalStorage('relink_quickStats', {
    dailyViews: 24,
    weeklyConnections: 8,
    monthlyApplications: 12,
    totalReferrals: 5,
    eventsAttended: 3,
    certificatesEarned: 2,
    profileStreak: 7,
    interviewsScheduled: 3,
    savedJobs: 8
  });

  const [userProgress, setUserProgress] = useLocalStorage('relink_userProgress', {
    profileCompletion: 85,
    jobSearchActivity: 90,
    networkingScore: 75,
    skillDevelopment: 60,
    communityEngagement: 95,
    documentSubmission: 80,
    interviewReadiness: 70,
    applicationQuality: 85
  });

  const [weeklyActivity, setWeeklyActivity] = useLocalStorage('relink_weeklyActivity', {
    views: [12, 19, 15, 22, 24, 18, 20],
    applications: [2, 3, 1, 4, 2, 3, 2],
    interviews: [0, 1, 0, 1, 0, 0, 1],
    messages: [5, 8, 6, 10, 7, 4, 3]
  });

  const [achievements, setAchievements] = useState([
    { id: 1, title: "Profile Master", description: "Complete profile 100%", progress: 85, completed: false, icon: "📋", points: 50 },
    { id: 2, title: "Network Builder", description: "Connect with 10 employers", progress: 8, completed: false, icon: "🤝", points: 75 },
    { id: 3, title: "Job Seeker", description: "Apply to 20 jobs", progress: 12, completed: false, icon: "💼", points: 100 },
    { id: 4, title: "Document Ready", description: "Upload 5 verified documents", progress: 3, completed: false, icon: "📄", points: 60 }
  ]);

  const [goals, setGoals] = useState([
    { id: 1, title: "Reach 85 credibility score", progress: 78, target: 85, deadline: "2024-03-01", category: "credibility" },
    { id: 2, title: "Apply to 20 jobs", progress: 12, target: 20, deadline: "2024-02-28", category: "jobs" },
    { id: 3, title: "Attend 5 networking events", progress: 2, target: 5, deadline: "2024-03-15", category: "networking" },
    { id: 4, title: "Complete 3 certifications", progress: 1, target: 3, deadline: "2024-03-30", category: "learning" }
  ]);

  const [improvementSuggestions, setImprovementSuggestions] = useState([
    {
      id: 1,
      title: "Complete Your Profile",
      description: "Add your skills and experience to increase visibility",
      impact: "+15 points",
      difficulty: "Easy",
      category: "profile",
      icon: "📋",
      completed: false,
      steps: ["Add work experience", "List skills", "Upload profile picture"]
    },
    {
      id: 2,
      title: "Attend Networking Event",
      description: "Join the upcoming Job Fair in Soweto",
      impact: "+10 points",
      difficulty: "Medium",
      category: "networking",
      icon: "🤝",
      completed: false,
      steps: ["Register for event", "Prepare introduction", "Bring copies of CV"]
    },
    {
      id: 3,
      title: "Upload Certificate",
      description: "Add your latest training certificate",
      impact: "+20 points",
      difficulty: "Easy",
      category: "documents",
      icon: "📜",
      completed: false,
      steps: ["Scan certificate", "Upload document", "Submit for verification"]
    },
    {
      id: 4,
      title: "Connect with Mentor",
      description: "Find a mentor in your industry",
      impact: "+25 points",
      difficulty: "Medium",
      category: "mentorship",
      icon: "👨‍🏫",
      completed: false,
      steps: ["Browse mentor directory", "Send connection request", "Schedule first meeting"]
    },
    {
      id: 5,
      title: "Apply for 5 Jobs",
      description: "Increase your chances with more applications",
      impact: "+30 points",
      difficulty: "Hard",
      category: "jobs",
      icon: "💼",
      completed: false,
      steps: ["Find suitable jobs", "Customize applications", "Track applications"]
    }
  ]);

  const updateProgress = (key, value) => {
    setUserProgress(prev => ({
      ...prev,
      [key]: value
    }));
    setSuccessMessage({ text: `${key} updated to ${value}%`, type: 'success' });
  };

  const completeTask = (taskId) => {
    setImprovementSuggestions(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
    
    setAchievements(prev => 
      prev.map(ach => 
        ach.title.includes('Task') ? { ...ach, progress: ach.progress + 20 } : ach
      )
    );
    
    setSuccessMessage({ text: 'Task completed! +5 credibility points', type: 'success' });
    return 5; // Return points added
  };

  const updateGoalProgress = (id, progress) => {
    setGoals(prev =>
      prev.map(goal =>
        goal.id === id ? { ...goal, progress } : goal
      )
    );
    setSuccessMessage({ text: 'Goal progress updated', type: 'success' });
  };

  return {
    quickStats,
    userProgress,
    weeklyActivity,
    achievements,
    goals,
    improvementSuggestions,
    updateProgress,
    completeTask,
    updateGoalProgress
  };
}