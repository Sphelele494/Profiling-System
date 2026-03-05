export const REFERRAL_TYPES = [
  { id: 'employer', label: 'Employer', icon: 'Briefcase', points: 15 },
  { id: 'rehab', label: 'Rehabilitation', icon: 'HandHeart', points: 20 },
  { id: 'police', label: 'Police Clearance', icon: 'Shield', points: 25 },
  { id: 'community', label: 'Community Leader', icon: 'Users', points: 10 },
  { id: 'volunteer', label: 'Volunteer', icon: 'Heart', points: 12 },
  { id: 'education', label: 'Education', icon: 'GraduationCap', points: 18 },
  { id: 'clearance', label: 'Security Clearance', icon: 'ShieldCheck', points: 30 }
];

export const DOCUMENT_STATUS = {
  VERIFIED: 'verified',
  PENDING: 'pending',
  EXPIRED: 'expired'
};

export const CREDIBILITY_METRICS = [
  { label: "Community Participation", color: "#10b981", icon: "👥" },
  { label: "Professional Development", color: "#059669", icon: "📚" },
  { label: "Employment Stability", color: "#047857", icon: "💼" },
  { label: "Mentorship Engagement", color: "#065f46", icon: "👨‍🏫" },
  { label: "Rehabilitation Completion", color: "#064e3b", icon: "✅" },
  { label: "Document Verification", color: "#022c22", icon: "📄" }
];

export const EDUCATION_CATEGORIES = [
  { id: "all", name: "All Courses", icon: "Layers" },
  { id: "accredited", name: "Accredited", icon: "Award" },
  { id: "vocational", name: "Vocational", icon: "Settings" },
  { id: "online", name: "Online Learning", icon: "Monitor" },
  { id: "university", name: "University", icon: "GraduationCap" },
  { id: "learnership", name: "Learnerships", icon: "Briefcase" },
  { id: "internship", name: "Internships", icon: "Users" }
];

export const SA_PROVINCES = [
  "Gauteng", "Western Cape", "KwaZulu-Natal", "Eastern Cape",
  "Free State", "Mpumalanga", "Limpopo", "North West", "Northern Cape"
];