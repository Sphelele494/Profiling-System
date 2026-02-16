// Mock data for the dashboards
// TODO: Replace with actual API calls when backend is ready

export const userStats = {
  credibilityScore: 78,
  credibilityChange: '+5 this month',
  profileViews: 142,
  profileViewsChange: '+23 this week',
  verifiedReferrals: 4,
  verifiedReferralsPending: '2 pending',
  jobApplications: 8,
  jobApplicationsInReview: '3 in review'
};

export const userProfileCompletion = {
  percentage: 75,
  completedSteps: [
    { id: 1, text: 'Basic information added', completed: true },
    { id: 2, text: 'Skills & certifications added', completed: true }
  ],
  pendingSteps: [
    { id: 3, text: 'Add video introduction', completed: false },
    { id: 4, text: 'Complete work history', completed: false }
  ]
};

export const credibilityBreakdown = [
  { label: 'Verified Referrals', points: '+40 points' },
  { label: 'Completed Programs', points: '+25 points' },
  { label: 'Profile Completeness', points: '+13 points' }
];

export const recentActivity = [
  {
    id: 1,
    type: 'verified',
    icon: 'check-circle',
    title: 'Referral verified',
    description: 'Your referral from John Smith (Mentor) has been verified',
    time: '2 hours ago',
    color: 'emerald'
  },
  {
    id: 2,
    type: 'viewed',
    icon: 'eye',
    title: 'Application viewed',
    description: 'TechStart Inc. viewed your application for IT Technician',
    time: '5 hours ago',
    color: 'blue'
  },
  {
    id: 3,
    type: 'badge',
    icon: 'award',
    title: 'Badge earned',
    description: "You earned the 'IT Certified' badge",
    time: '1 day ago',
    color: 'yellow'
  },
  {
    id: 4,
    type: 'pending',
    icon: 'clock',
    title: 'Referral pending',
    description: 'Waiting for verification from Sarah Johnson (NGO Director)',
    time: '2 days ago',
    color: 'orange'
  }
];

export const recommendedJobs = [
  {
    id: 1,
    title: 'IT Support Specialist',
    company: 'TechStart Inc.',
    location: 'New York, NY',
    salary: '$45,000 - $55,000',
    match: '92%'
  },
  {
    id: 2,
    title: 'Data Entry Clerk',
    company: 'DataCore Solutions',
    location: 'Remote',
    salary: '$35,000 - $42,000',
    match: '85%'
  },
  {
    id: 3,
    title: 'Warehouse Associate',
    company: 'LogiShip Co.',
    location: 'Newark, NJ',
    salary: '$38,000 - $45,000',
    match: '78%'
  }
];

export const recruiterStats = {
  activeJobPostings: 5,
  activeJobPostingsChange: '+2 this month',
  totalApplications: 47,
  totalApplicationsChange: '+12 this week',
  candidatesViewed: 89,
  candidatesViewedChange: '+28 this month',
  successfulHires: 3,
  successfulHiresChange: 'This quarter'
};

export const recentApplications = [
  {
    id: 1,
    name: 'Marcus Johnson',
    avatar: null,
    position: 'IT Support Specialist',
    credibilityScore: 78,
    referrals: 4,
    timeAgo: '2 hours ago'
  },
  {
    id: 2,
    name: 'David Williams',
    avatar: null,
    position: 'IT Support Specialist',
    credibilityScore: 72,
    referrals: 3,
    timeAgo: '5 hours ago'
  },
  {
    id: 3,
    name: 'James Mitchell',
    avatar: null,
    position: 'Data Entry Clerk',
    credibilityScore: 85,
    referrals: 5,
    timeAgo: '1 day ago'
  }
];

export const topCandidates = [
  {
    id: 1,
    name: 'Robert Garcia',
    initials: 'RG',
    score: 92,
    skills: ['IT Support', 'Networking'],
    additionalSkills: 1
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    initials: 'MJ',
    score: 78,
    skills: ['IT Support', 'Hardware Repair'],
    additionalSkills: 1
  },
  {
    id: 3,
    name: 'Anthony Brown',
    initials: 'AB',
    score: 81,
    skills: ['Warehouse', 'Logistics'],
    additionalSkills: 1
  }
];

// API endpoint placeholders
export const API_ENDPOINTS = {
  // User endpoints
  getUserStats: '/api/user/stats',
  getUserProfile: '/api/user/profile',
  getUserActivity: '/api/user/activity',
  getRecommendedJobs: '/api/user/jobs/recommended',
  getCredibilityScore: '/api/user/credibility',
  
  // Recruiter endpoints
  getRecruiterStats: '/api/recruiter/stats',
  getRecentApplications: '/api/recruiter/applications/recent',
  getTopCandidates: '/api/recruiter/candidates/top',
  postJob: '/api/recruiter/jobs',
  getCandidates: '/api/recruiter/candidates'
};
