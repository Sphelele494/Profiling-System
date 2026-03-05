import { 
  Target, GraduationCap, ShieldCheck, UsersRound, FileText, Building2,
  Users, Briefcase, Building, TrendingUp, UsersRound as UsersIcon,
  Clock, Handshake, MapPin, Flag
} from 'lucide-react';

// Gallery Images
import shakehands1 from '../../../assets/shakehands.webp';
import shakehands2 from '../../../assets/shakehandsblack.jpg';
import shakehands3 from '../../../assets/shakeshandscontract.webp';
import shakehands4 from '../../../assets/shakehandscontractorwebp.jpg';
import shakehands5 from '../../../assets/shakehndsweb.webp';
import quoteImage1 from '../../../assets/quote_image1.jpg';
import quoteImage2 from '../../../assets/quote_image2.jpg';

export const galleryImages = [
  { src: shakehands1, alt: "Professional Handshake", caption: "Building Trust", category: "Partnership" },
  { src: shakehands2, alt: "Black and White Handshake", caption: "Meaningful Connections", category: "Human" },
  { src: shakehands3, alt: "Handshake with Contract", caption: "Securing Futures", category: "Business" },
  { src: shakehands4, alt: "Handshake with Contractors", caption: "Community Impact", category: "Community" },
  { src: shakehands5, alt: "Digital Handshake", caption: "Digital Integration", category: "Technology" }
];

export const heroTitles = [
  "Second Chances",
  "New Beginnings",
  "Real Connections",
  "Meaningful Work",
  "Dignified Futures",
  "Sustainable Growth",
  "Community Impact",
  "Professional Success",
  "Personal Renewal",
  "Bright Tomorrows"
];

export const heroSubtitles = [
  "Empowering rehabilitated individuals across South Africa",
  "Bridging the gap to meaningful employment",
  "Building stronger communities through second chances",
  "Creating pathways to professional success",
  "Transforming lives with dignity and purpose",
  "Connecting talent with opportunity nationwide",
  "Supporting reintegration across all 9 provinces",
  "Developing skills for sustainable careers",
  "Fostering inclusive economic growth",
  "Partnering for positive social change"
];

export const slogans = [
  "Second Chances, Real Connections",
  "Rebuilding Lives, Restoring Hope",
  "Your Future Starts Here",
  "Empowerment Through Employment",
  "Together We Rise",
  "New Beginnings Await",
  "Transforming Lives Daily",
  "Building Bridges to Success",
  "Hope Meets Opportunity",
  "Creating Lasting Change"
];

export const features = [
  {
    icon: "target-icon",
    title: 'Smart Job Matching',
    description: 'AI-powered algorithm matches skills with verified employment opportunities across South Africa with 98% accuracy.',
    stats: '98% Accuracy',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    benefits: [
      'Real-time job alerts',
      'Skills gap analysis',
      'Career path recommendations',
      'Salary insights'
    ]
  },
  {
    icon: <GraduationCap size={48} />,
    title: 'Skills Development',
    description: 'Access to certified training programs accredited by QCTO and SETAs for professional growth.',
    stats: '2,850+ Hours',
    color: '#059669',
    gradient: 'linear-gradient(135deg, #059669, #047857)',
    benefits: [
      'Industry certifications',
      'Flexible learning',
      'Expert instructors',
      'Practical workshops'
    ]
  },
  {
    icon: <ShieldCheck size={48} />,
    title: 'Secure Verification',
    description: 'POPIA-compliant verification ensuring privacy and security for all members.',
    stats: '100% Secure',
    color: '#047857',
    gradient: 'linear-gradient(135deg, #047857, #065f46)',
    benefits: [
      'Biometric authentication',
      'Secure storage',
      'Privacy-first design',
      'Regular audits'
    ]
  },
  {
    icon: <UsersRound size={48} />,
    title: 'Mentorship Network',
    description: 'Connect with experienced mentors across all 9 provinces.',
    stats: '53 Communities',
    color: '#065f46',
    gradient: 'linear-gradient(135deg, #065f46, #064e3b)',
    benefits: [
      'Expert mentors',
      'Peer support',
      'Networking events',
      'Career guidance'
    ]
  },
  {
    icon: <FileText size={48} />,
    title: 'Career Coaching',
    description: 'Professional CV building and interview preparation with certified career coaches.',
    stats: '89% Success',
    color: '#064e3b',
    gradient: 'linear-gradient(135deg, #064e3b, #10b981)',
    benefits: [
      'CV optimization',
      'Mock interviews',
      'Salary negotiation',
      'Career planning'
    ]
  },
  {
    icon: <Building2 size={48} />,
    title: 'Employer Partnerships',
    description: 'Direct connections with 247+ verified South African employers committed to second chances.',
    stats: '247+ Partners',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    benefits: [
      'Priority listings',
      'Direct contact',
      'Company insights',
      'B-BBEE compliant'
    ]
  }
];

export const successStories = [
  {
    name: 'Thabo M.',
    role: 'Senior Welder',
    company: 'Industrial Solutions SA',
    story: 'From rehabilitation to team leader in 3 years. RE-Link gave me the skills and confidence to rebuild my career.',
    duration: '3 years',
    avatar: 'TM',
    verified: true,
    achievement: 'Team Lead',
    location: 'Johannesburg',
    image: quoteImage1
  },
  {
    name: 'Sarah K.',
    role: 'HR Manager',
    company: 'Retail Group Africa',
    story: 'Hired 12 RE-Link candidates with 85% retention. These are among our most dedicated employees.',
    duration: '2 years',
    avatar: 'SK',
    verified: true,
    achievement: '12 Hires',
    location: 'Cape Town',
    image: quoteImage2
  },
  {
    name: 'Nomsa D.',
    role: 'Office Manager',
    company: 'Financial Services Ltd',
    story: 'Fastest promotion in company history. The mentorship program was invaluable for my growth.',
    duration: '18 months',
    avatar: 'ND',
    verified: true,
    achievement: 'Fast Track',
    location: 'Durban',
    image: quoteImage1
  },
  {
    name: 'Peter N.',
    role: 'IT Specialist',
    company: 'Tech Solutions Inc.',
    story: 'From trainee to IT manager. The skills development program prepared me for the modern workplace.',
    duration: '2 years',
    avatar: 'PN',
    verified: true,
    achievement: '5 Certifications',
    location: 'Pretoria',
    image: quoteImage2
  },
  {
    name: 'Linda M.',
    role: 'Team Lead',
    company: 'Call Centre Solutions',
    story: 'From agent to team leader. RE-Link believed in me when others wouldn\'t.',
    duration: '2.5 years',
    avatar: 'LM',
    verified: true,
    achievement: 'Employee of Year',
    location: 'Port Elizabeth',
    image: quoteImage1
  }
];

export const quickReplies = [
  "How to register?",
  "Find jobs",
  "Training programs",
  "Contact support",
  "Success stories",
  "Office locations"
];

export const targetStats = {
  members: 3426,
  jobs: 1845,
  companies: 247,
  successRate: 94,
  communities: 65,
  trainingHours: 2850,
  mentors: 234,
  partners: 156,
  cities: 45,
  provinces: 9
};