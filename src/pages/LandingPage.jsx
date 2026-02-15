import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LandingPage.css';
import jsPDF from 'jspdf';

// ========== ONLY CONFIRMED WORKING LUCIDE-REACT ICONS ==========
// ========== ONLY CONFIRMED WORKING LUCIDE-REACT ICONS ==========
import { 
  // Navigation & UI
  ChevronRight, ChevronLeft, ChevronDown, ChevronUp, Menu, X,
  
  // Social & Users
  Users, Briefcase, Building, TrendingUp, UsersRound, Building2,
  UserCheck, UserPlus, UserCircle, UserCog,
  
  // Security & Trust
  Shield, ShieldCheck, Lock, Unlock,
  Key, Fingerprint, BadgeCheck,
  
  // Achievement & Awards
  Trophy, Award, Medal, Star, Sparkles, Zap, Flame, Crown,
  Gem, Diamond, Gift, PartyPopper,
  
  // Business & Finance
  Target, Globe, Map, MapPin, Navigation, Compass, 
  BarChart3, PieChart, LineChart, Activity, DollarSign, 
  CreditCard, Wallet, Coins, Percent,
  
  // Communication
  MessageCircle, MessageSquare, Send,
  Mail, Phone, Headphones, Mic,
  
  // Media & Entertainment
  Play, PlayCircle, Pause, PauseCircle, Volume2, VolumeX,
  Film, Video, Camera,
  
  // Files & Documents
  FileText, FileDown, Download, File,
  
  // Actions & Controls
  LogOut, LogIn, Settings, Bell,
  Eye, EyeOff, Search, Filter, RefreshCw,
  
  // Time & Schedule
  Clock, Calendar, Watch,
  Timer, AlarmClock,
  
  // Status & Indicators
  Check, CheckCircle, CheckSquare, XCircle,
  AlertCircle, AlertTriangle, Info, HelpCircle,
  
  // Layout & Design
  Grid, Layout, Layers, Maximize2, Minimize2,
  
  // Arrows & Directions
  ArrowRight, ArrowLeft, ArrowUp, ArrowDown,
  ArrowUpCircle, ArrowDownCircle,
  
  // Nature & Elements
  Sun, Moon, Cloud,
  
  // Technology
  Rocket, Cpu, Monitor, Smartphone, Tablet, Laptop,
  
  // Miscellaneous
  Heart, Handshake, ThumbsUp, ThumbsDown,
  Quote, BookOpen, GraduationCap,
  
  // Social Media Icons
  Instagram, Twitter, Facebook, Linkedin, Youtube,
  
  // Essential Icons
  Flag, ExternalLink, PlayCircle as PlayIcon,
  
  // ADD THE MISSING ICON HERE
  HeartHandshake
} from 'lucide-react';


// ========== CONFIRMED WORKING REACT-ICONS ==========
import { 
  FaWhatsapp,
  FaTelegram,
  FaDiscord,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube
} from 'react-icons/fa';

// ========== ASSET IMPORTS ==========
import ReLinkLogo from '../assets/RelinkLOGO.jpeg';
import ReLinkLogo2 from '../assets/RelinkLogo2.jpeg';
import KeleidoWallpaper from '../assets/Keleido-wallpaper.jpeg';
import IntroVideo from '../assets/intro-video.mp4';

// Gallery Images from assets
import shakehands1 from '../assets/shakehands.webp';
import shakehands2 from '../assets/shakehandsblack.jpeg';
import shakehands3 from '../assets/shakehandscontract.webp';
import shakehands4 from '../assets/shakehandscontractorwebp.webp';
import shakehands5 from '../assets/shakehndsweb.webp';

// Additional images
import constructionThumb from '../assets/constructionco_thumb.jpg';
import logisticsThumb from '../assets/logistics_thumb.jpg';
import quoteImage1 from '../assets/quote_image1.jpg';
import quoteImage2 from '../assets/quote_image2.jpg';

// ========== GALLERY IMAGES ARRAY ==========
const galleryImages = [
  { src: shakehands1, alt: "Professional Handshake", caption: "Building Trust", category: "Partnership" },
  { src: shakehands2, alt: "Black and White Handshake", caption: "Meaningful Connections", category: "Human" },
  { src: shakehands3, alt: "Handshake with Contract", caption: "Securing Futures", category: "Business" },
  { src: shakehands4, alt: "Handshake with Contractors", caption: "Community Impact", category: "Community" },
  { src: shakehands5, alt: "Digital Handshake", caption: "Digital Integration", category: "Technology" }
];

// ========== PDF BROCHURE GENERATION - ENHANCED ==========
const generateBrochure = () => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: 'a4'
  });

  // Cover Page - Enhanced Design
  doc.setFillColor(16, 185, 129); // Emerald Green
  doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');
  
  // Add decorative elements
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(2);
  
  // Diagonal lines pattern
  for (let i = -100; i < doc.internal.pageSize.width + 100; i += 40) {
    doc.line(i, 0, i + 200, doc.internal.pageSize.height);
  }
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(56);
  doc.setFont('helvetica', 'bold');
  doc.text('RE-LINK', doc.internal.pageSize.width / 2, 200, { align: 'center' });
  
  doc.setFontSize(28);
  doc.setFont('helvetica', 'italic');
  doc.text('Second Chances, Real Connections', doc.internal.pageSize.width / 2, 280, { align: 'center' });
  
  doc.setFontSize(20);
  doc.setFont('helvetica', 'normal');
  doc.text('South Africa\'s Premier Reintegration Platform', doc.internal.pageSize.width / 2, 340, { align: 'center' });
  
  doc.setFontSize(16);
  doc.text('Est. 2020', doc.internal.pageSize.width / 2, 400, { align: 'center' });
  
  // Add footer line
  doc.setLineWidth(1);
  doc.line(40, 500, doc.internal.pageSize.width - 40, 500);
  
  // Page 2 - About - Enhanced
  doc.addPage();
  doc.setFillColor(245, 245, 245);
  doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');
  
  // Add header line
  doc.setDrawColor(16, 185, 129);
  doc.setLineWidth(3);
  doc.line(40, 80, 250, 80);
  
  doc.setTextColor(16, 185, 129);
  doc.setFontSize(42);
  doc.setFont('helvetica', 'bold');
  doc.text('About RE-LINK', 40, 70);
  
  doc.setTextColor(51, 51, 51);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  const aboutText = [
    'RE-LINK is a revolutionary South African platform dedicated to',
    'connecting rehabilitated individuals with meaningful employment',
    'opportunities, skills development, and community support.',
    '',
    'Our mission is to bridge the gap between rehabilitation and',
    'successful reintegration into society across all 9 provinces.',
    '',
    'We believe in second chances and the power of meaningful',
    'connections to transform lives and build a stronger South Africa.',
    '',
    'Since 2020, we have helped over 3,400 individuals find',
    'meaningful employment and rebuild their lives with dignity.'
  ];
  
  let yPos = 140;
  aboutText.forEach(line => {
    doc.text(line, 40, yPos);
    yPos += 28;
  });
  
  // Add decorative dots
  doc.setFillColor(16, 185, 129);
  for (let i = 0; i < 5; i++) {
    doc.circle(40 + (i * 15), 550, 3, 'F');
  }
  
  // Page 3 - Impact Stats - Enhanced
  doc.addPage();
  doc.setFillColor(16, 185, 129);
  doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');
  
  // Add white circles
  doc.setFillColor(255, 255, 255, 0.1);
  doc.circle(400, 100, 80, 'F');
  doc.circle(100, 500, 120, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(42);
  doc.setFont('helvetica', 'bold');
  doc.text('Our Impact', 40, 70);
  
  const stats = [
    { label: 'Members Served', value: '3,426+' },
    { label: 'Jobs Secured', value: '1,845+' },
    { label: 'Partner Companies', value: '247+' },
    { label: 'Success Rate', value: '94%' },
    { label: 'Active Mentors', value: '234' },
    { label: 'Training Hours', value: '2,850+' },
    { label: 'Cities Covered', value: '45' },
    { label: 'Provinces', value: '9' }
  ];
  
  yPos = 140;
  stats.forEach((stat, index) => {
    if (index % 2 === 0) {
      doc.setFontSize(28);
      doc.setFont('helvetica', 'bold');
      doc.text(stat.value, 40, yPos);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'normal');
      doc.text(stat.label, 40, yPos + 30);
    } else {
      doc.setFontSize(28);
      doc.setFont('helvetica', 'bold');
      doc.text(stat.value, 280, yPos - 34);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'normal');
      doc.text(stat.label, 280, yPos - 4);
      yPos += 80;
    }
  });
  
  // Page 4 - Services - Enhanced
  doc.addPage();
  doc.setFillColor(245, 245, 245);
  doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');
  
  // Add header line
  doc.setDrawColor(16, 185, 129);
  doc.setLineWidth(3);
  doc.line(40, 80, 220, 80);
  
  doc.setTextColor(16, 185, 129);
  doc.setFontSize(42);
  doc.setFont('helvetica', 'bold');
  doc.text('Our Services', 40, 70);
  
  const services = [
    { title: 'Smart Job Matching', desc: 'AI-powered algorithm with 98% accuracy' },
    { title: 'Skills Development', desc: '156+ certified training courses' },
    { title: 'Secure Verification', desc: 'End-to-end encrypted verification' },
    { title: 'Mentorship Network', desc: '234 active mentors nationwide' },
    { title: 'Career Coaching', desc: 'Professional CV building & interview prep' },
    { title: 'Employer Partnerships', desc: '247+ verified employers' }
  ];
  
  doc.setTextColor(51, 51, 51);
  yPos = 140;
  services.forEach(service => {
    // Add bullet point
    doc.setFillColor(16, 185, 129);
    doc.circle(35, yPos - 8, 4, 'F');
    
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(service.title, 50, yPos);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'normal');
    doc.text(service.desc, 50, yPos + 20);
    yPos += 60;
  });
  
  // Page 5 - Contact - Enhanced
  doc.addPage();
  doc.setFillColor(16, 185, 129);
  doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');
  
  // Add diagonal lines
  doc.setDrawColor(255, 255, 255, 0.2);
  doc.setLineWidth(1);
  for (let i = 0; i < 10; i++) {
    doc.line(0, i * 80, doc.internal.pageSize.width, i * 80 - 200);
  }
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(42);
  doc.setFont('helvetica', 'bold');
  doc.text('Contact Us', 40, 70);
  
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('📍 Head Office:', 40, 150);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text('123 Hope Street, Johannesburg, 2000', 40, 180);
  
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('📞 24/7 Helpline:', 40, 240);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text('0800 123 456', 40, 270);
  
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('📧 Email:', 40, 330);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text('support@re-link.co.za', 40, 360);
  
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('🌐 Website:', 40, 420);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text('www.re-link.co.za', 40, 450);
  
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('🕒 Office Hours:', 40, 510);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text('Mon-Fri: 8am - 5pm', 40, 540);
  
  doc.save('RE-LINK-Brochure.pdf');
};

// ========== LANDINGPAGE COMPONENT ==========
const LandingPage = () => {
  const navigate = useNavigate();
  
  // ========== STATE MANAGEMENT ==========
  
  // Animation States
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);
  const [currentSloganIndex, setCurrentSloganIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  
  // UI States
  const [botActive, setBotActive] = useState(false);
  const [botMessages, setBotMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal States
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  
  // Gallery States
  const [activeGallery, setActiveGallery] = useState(0);
  const [galleryDirection, setGalleryDirection] = useState('right');
  
  // Story States
  const [activeStory, setActiveStory] = useState(0);
  
  // Video States
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Hover States
  const [logoHover, setLogoHover] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [hoveredStat, setHoveredStat] = useState(null);
  const [hoveredGallery, setHoveredGallery] = useState(null);
  
  // Stats States
  const [statsVisible, setStatsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    members: 0,
    jobs: 0,
    companies: 0,
    successRate: 0,
    communities: 0,
    trainingHours: 0,
    mentors: 0,
    partners: 0,
    cities: 0,
    provinces: 0
  });
  
  // Form States
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  
  // Animation Frame States
  const [frame, setFrame] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [scale, setScale] = useState(1);
  
  // Logo Animation States
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [titleGlow, setTitleGlow] = useState(false);
  
  // ========== REFS ==========
  const statsRef = useRef(null);
  const heroRef = useRef(null);
  const chatbotRef = useRef(null);
  const videoRef = useRef(null);
  const mainRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastTimeRef = useRef(0);
  const loadingTimeoutRef = useRef(null);
  const titleIntervalRef = useRef(null);
  const galleryIntervalRef = useRef(null);
  const storyIntervalRef = useRef(null);

  // ========== MEMOIZED DATA ==========
  
  const heroTitles = useMemo(() => [
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
  ], []);

  const heroSubtitles = useMemo(() => [
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
  ], []);

  const slogans = useMemo(() => [
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
  ], []);

  const titleColors = useMemo(() => [
    '#10b981', '#059669', '#047857', '#065f46', '#064e3b',
    '#10b981', '#059669', '#047857', '#065f46', '#064e3b'
  ], []);

  const quickReplies = useMemo(() => [
    "How to register?",
    "Find jobs",
    "Training programs",
    "Contact support",
    "Success stories",
    "Office locations"
  ], []);

  const features = useMemo(() => [
    {
      icon: <Target size={48} />,
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
  ], []);

  const successStories = useMemo(() => [
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
  ], []);

  const statCards = useMemo(() => [
    { 
      icon: <Users size={48} />, 
      value: animatedStats.members, 
      label: 'Members', 
      target: 3426,
      suffix: '',
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981, #059669)'
    },
    { 
      icon: <Briefcase size={48} />, 
      value: animatedStats.jobs, 
      label: 'Jobs', 
      target: 1845,
      suffix: '',
      color: '#059669',
      gradient: 'linear-gradient(135deg, #059669, #047857)'
    },
    { 
      icon: <Building size={48} />, 
      value: animatedStats.companies, 
      label: 'Companies', 
      target: 247,
      suffix: '',
      color: '#047857',
      gradient: 'linear-gradient(135deg, #047857, #065f46)'
    },
    { 
      icon: <Target size={48} />, 
      value: animatedStats.successRate, 
      label: 'Success Rate', 
      target: 94,
      suffix: '%',
      color: '#065f46',
      gradient: 'linear-gradient(135deg, #065f46, #064e3b)'
    },
    { 
      icon: <UsersRound size={48} />, 
      value: animatedStats.communities, 
      label: 'Communities', 
      target: 65,
      suffix: '',
      color: '#064e3b',
      gradient: 'linear-gradient(135deg, #064e3b, #10b981)'
    },
    { 
      icon: <Clock size={48} />, 
      value: animatedStats.trainingHours, 
      label: 'Training Hours', 
      target: 2850,
      suffix: '',
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981, #059669)'
    },
    { 
      icon: <GraduationCap size={48} />, 
      value: animatedStats.mentors, 
      label: 'Mentors', 
      target: 234,
      suffix: '',
      color: '#059669',
      gradient: 'linear-gradient(135deg, #059669, #047857)'
    },
    { 
      icon: <Handshake size={48} />, 
      value: animatedStats.partners, 
      label: 'Partners', 
      target: 156,
      suffix: '',
      color: '#047857',
      gradient: 'linear-gradient(135deg, #047857, #065f46)'
    },
    { 
      icon: <MapPin size={48} />, 
      value: animatedStats.cities, 
      label: 'Cities', 
      target: 45,
      suffix: '',
      color: '#065f46',
      gradient: 'linear-gradient(135deg, #065f46, #064e3b)'
    },
    { 
      icon: <Flag size={48} />, 
      value: animatedStats.provinces, 
      label: 'Provinces', 
      target: 9,
      suffix: '',
      color: '#064e3b',
      gradient: 'linear-gradient(135deg, #064e3b, #10b981)'
    }
  ], [animatedStats]);

  // ========== EFFECTS ==========
  
  // Loading simulation
  useEffect(() => {
    loadingTimeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(loadingTimeoutRef.current);
  }, []);

  // Animation frame loop
  useEffect(() => {
    const animate = (currentTime) => {
      if (lastTimeRef.current) {
        const delta = currentTime - lastTimeRef.current;
        setFrame(prev => (prev + 1) % 360);
        setRotationAngle(prev => prev + 0.01);
        setScale(prev => 1 + Math.sin(currentTime * 0.001) * 0.02);
      }
      lastTimeRef.current = currentTime;
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Title glow animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleGlow(prev => !prev);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  // Mouse move effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      setShowScrollIndicator(scrollY < 100);
      
      const sections = ['home', 'features', 'stats', 'stories', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Title rotation
  useEffect(() => {
    titleIntervalRef.current = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % heroTitles.length);
      setCurrentSubtitleIndex((prev) => (prev + 1) % heroSubtitles.length);
      setCurrentSloganIndex((prev) => (prev + 1) % slogans.length);
    }, 4000);
    return () => clearInterval(titleIntervalRef.current);
  }, [heroTitles.length, heroSubtitles.length, slogans.length]);

  // Stats animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStatsVisible(true);
          animateStats();
        }
      },
      { threshold: 0.2 }
    );
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const animateStats = useCallback(() => {
    const targetStats = {
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

    Object.keys(targetStats).forEach((stat) => {
      const end = targetStats[stat];
      const duration = 2000;
      const startTime = Date.now();

      const animate = () => {
        const currentTime = Date.now();
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(easeOutQuart * end);

        setAnimatedStats(prev => ({
          ...prev,
          [stat]: currentValue
        }));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    });
  }, []);

  // Gallery auto-rotation
  useEffect(() => {
    galleryIntervalRef.current = setInterval(() => {
      setActiveGallery((prev) => {
        if (galleryDirection === 'right') {
          return (prev + 1) % galleryImages.length;
        } else {
          return (prev - 1 + galleryImages.length) % galleryImages.length;
        }
      });
    }, 5000);
    return () => clearInterval(galleryIntervalRef.current);
  }, [galleryDirection]);

  // Story auto-rotation
  useEffect(() => {
    storyIntervalRef.current = setInterval(() => {
      setActiveStory((prev) => (prev + 1) % successStories.length);
    }, 6000);
    return () => clearInterval(storyIntervalRef.current);
  }, [successStories.length]);

  // Video controls
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Fullscreen detection
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // ========== HANDLERS ==========
  
  const handleVideoTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setVideoProgress(progress);
    }
  }, []);

  const toggleVideoPlay = useCallback(() => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  }, [isVideoPlaying]);

  const handleVideoSeek = useCallback((e) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percent = (x / rect.width) * 100;
      const time = (percent / 100) * videoRef.current.duration;
      videoRef.current.currentTime = time;
      setVideoProgress(percent);
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (videoRef.current) {
      if (!isFullscreen) {
        videoRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  }, [isFullscreen]);

  const handleBotMessage = useCallback((message) => {
    if (!message.trim()) return;

    const newUserMessage = { 
      id: Date.now(), 
      text: message, 
      fromBot: false,
      timestamp: new Date()
    };
    setBotMessages(prev => [...prev, newUserMessage]);

    setTimeout(() => {
      let response = "";
      const lowerMessage = message.toLowerCase();

      if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        response = "👋 Welcome to RE-Link! I'm your AI assistant. I can help you with registration, jobs, training, and support. What would you like to know?";
      } 
      else if (lowerMessage.includes('register')) {
        response = "📝 To register: Click 'Register Now' and provide your SA ID, proof of rehabilitation, and contact details. The process takes about 10-15 minutes.";
      } 
      else if (lowerMessage.includes('job')) {
        response = "💼 We have 1,845+ jobs across all 9 provinces in construction, retail, manufacturing, hospitality, and IT. Which province are you in?";
      } 
      else if (lowerMessage.includes('training')) {
        response = "🎓 We offer 156+ QCTO accredited courses in technical skills, soft skills, business, IT, and trades. Most courses are subsidized starting from R500.";
      } 
      else if (lowerMessage.includes('support')) {
        response = "🤝 24/7 Helpline: 0800 123 456 | Email: support@re-link.co.za | WhatsApp: 060 123 4567 | 9 Provincial offices with 234 active mentors.";
      } 
      else if (lowerMessage.includes('location') || lowerMessage.includes('office')) {
        response = "📍 Head Office: Johannesburg. Provincial offices in Cape Town, Durban, Port Elizabeth, Bloemfontein, Nelspruit, Polokwane, Kimberley, and Mahikeng.";
      } 
      else {
        response = "🤔 I can help with:\n• Registration\n• Jobs in SA\n• Training\n• Support\n• Locations\n• Fees\n\nWhat would you like to know?";
      }

      const botResponse = { 
        id: Date.now() + 1, 
        text: response, 
        fromBot: true,
        timestamp: new Date()
      };
      setBotMessages(prev => [...prev, botResponse]);
      
      setTimeout(() => {
        if (chatbotRef.current) {
          chatbotRef.current.scrollTop = chatbotRef.current.scrollHeight;
        }
      }, 100);
    }, 800);

    setUserInput('');
  }, []);

  const handleGalleryPrev = useCallback(() => {
    setGalleryDirection('left');
    setActiveGallery((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, []);

  const handleGalleryNext = useCallback(() => {
    setGalleryDirection('right');
    setActiveGallery((prev) => (prev + 1) % galleryImages.length);
  }, []);

  const handleStoryPrev = useCallback(() => {
    setActiveStory((prev) => (prev - 1 + successStories.length) % successStories.length);
  }, [successStories.length]);

  const handleStoryNext = useCallback(() => {
    setActiveStory((prev) => (prev + 1) % successStories.length);
  }, [successStories.length]);

  const handleNewsletterSubmit = useCallback((e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubmitted(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubmitted(false), 3000);
    }
  }, [newsletterEmail]);

  const handleContactSubmit = useCallback((e) => {
    e.preventDefault();
    if (contactName && contactEmail && contactMessage) {
      setContactSubmitted(true);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      setTimeout(() => setContactSubmitted(false), 3000);
    }
  }, [contactName, contactEmail, contactMessage]);

  // UPDATED: Navigate to UserRecruiterRegistration.jsx
  // In LandingPage.jsx, update the handleRegister function:
const handleRegister = useCallback(() => {
  navigate('/register-choice'); // Changed from '/register' to '/register-choice'
}, [navigate]);

  // UPDATED: Navigate to Login.jsx
  const handleSignIn = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const handleWatchIntro = useCallback(() => {
    setIsVideoModalOpen(true);
  }, []);

  const handleBotLogoClick = useCallback(() => {
    setBotActive(!botActive);
  }, [botActive]);

  const handleSmoothScroll = useCallback((e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
  }, []);

  // ========== LOADING SCREEN ==========
  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="logo-spinner">
            <div className="spinner-ring" style={{ borderTopColor: '#10b981' }}></div>
            <div className="spinner-ring-2" style={{ borderTopColor: '#059669' }}></div>
            <div className="spinner-ring-3" style={{ borderTopColor: '#047857' }}></div>
            <div className="spinner-ring-4" style={{ borderTopColor: '#065f46' }}></div>
            <div className="spinner-ring-5" style={{ borderTopColor: '#064e3b' }}></div>
            <img 
              src={ReLinkLogo} 
              alt="RE-Link" 
              className="loading-logo"
            />
          </div>
          <div className="loading-text">
            <h2 className="loading-title" style={{ color: '#10b981' }}>RE-LINK</h2>
            <p className="loading-subtitle">Loading your pathway to second chances...</p>
            <div className="loading-progress">
              <div className="progress-bar" style={{ backgroundColor: '#e5e5e5' }}>
                <div className="progress-fill" style={{ backgroundColor: '#10b981', width: '100%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ========== MAIN RENDER ==========
  return (
    <div className="landing-page" ref={mainRef} style={{ backgroundColor: '#ffffff' }}>
      {/* Floating Dots Animation - Slowed Down */}
      <div className="floating-dots" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden'
      }}>
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              backgroundColor: '#10b981',
              borderRadius: '50%',
              opacity: Math.random() * 0.3 + 0.1,
              animation: `floatDot ${Math.random() * 20 + 25}s linear infinite`,
              transform: `translateY(0)`,
              animationDelay: `${Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Navigation - Clean and Professional */}
      <nav 
        className="navbar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: isScrolled ? '1rem 2rem' : '1.5rem 2rem',
          backgroundColor: isScrolled ? '#ffffff' : 'transparent',
          boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.05)' : 'none',
          transition: 'all 0.3s ease'
        }}
      >
        <div className="nav-container" style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo - UPDATED WITH LOGIN.JSX ANIMATION */}
          <Link to="/" className="logo-link" style={{ textDecoration: 'none' }}>
            <div 
              className="logo-container"
              onMouseEnter={() => setLogoHover(true)}
              onMouseLeave={() => setLogoHover(false)}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', position: 'relative' }}
            >
              <div className={`logo-glow ${logoHover ? 'active' : ''}`} style={{
                position: 'absolute',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(16,185,129,0.4) 0%, transparent 70%)',
                opacity: logoHover ? 1 : 0,
                transition: 'opacity 0.3s ease'
              }}></div>
              <div className="logo-pulse" style={{
                position: 'absolute',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                border: '2px solid rgba(16,185,129,0.3)',
                animation: logoHover ? 'pulse 2s infinite' : 'none'
              }}></div>
              <div className="logo-orbital" style={{
                position: 'absolute',
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                border: '1px solid rgba(16,185,129,0.2)',
                animation: 'spin 8s linear infinite'
              }}>
                <div className="orbital-ring" style={{
                  position: 'absolute',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#10b981',
                  top: '-5px',
                  left: '30px'
                }}></div>
                <div className="orbital-ring ring-2" style={{
                  position: 'absolute',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#059669',
                  bottom: '-5px',
                  right: '30px'
                }}></div>
              </div>
              <img 
                src={ReLinkLogo} 
                alt="RE-Link Logo" 
                className={`logo-image ${logoHover ? 'hover' : ''} ${logoLoaded ? 'loaded' : ''}`}
                onLoad={() => setLogoLoaded(true)}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '10px',
                  transform: logoHover ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0)',
                  transition: 'transform 0.3s ease',
                  boxShadow: logoHover ? '0 10px 20px rgba(16,185,129,0.2)' : 'none',
                  position: 'relative',
                  zIndex: 2
                }}
              />
              <div className="logo-text">
                <div className="logo-main" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h1 className="logo-title" style={{ fontSize: '1.5rem', margin: 0, color: '#10b981', fontWeight: 700 }}>RE-LINK</h1>
                  <div className="logo-badge" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.15rem 0.5rem',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '50px',
                    fontSize: '0.7rem'
                  }}>
                    <Shield size={10} color="#10b981" />
                    <span style={{ color: '#10b981' }}>POPIA Compliant</span>
                  </div>
                </div>
                <p className="logo-slogan" style={{
                  fontSize: '0.75rem',
                  color: '#666',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  margin: 0
                }}>
                  <HeartHandshake size={12} color="#10b981" />
                  <span>Second Chances, Real Connections</span>
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-menu" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}>
              {['home', 'features', 'stats', 'stories', 'contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item}`}
                    onClick={(e) => handleSmoothScroll(e, item)}
                    style={{
                      textDecoration: 'none',
                      color: activeSection === item ? '#10b981' : '#333',
                      fontWeight: 500,
                      position: 'relative',
                      paddingBottom: '0.25rem'
                    }}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                    {activeSection === item && (
                      <span style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', backgroundColor: '#10b981' }} />
                    )}
                  </a>
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={handleSignIn}
                style={{
                  padding: '0.5rem 1.5rem',
                  border: '2px solid #10b981',
                  borderRadius: '50px',
                  backgroundColor: 'transparent',
                  color: '#10b981',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#10b981';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#10b981';
                }}
              >
                Sign In
              </button>
              <button
                onClick={handleRegister}
                style={{
                  padding: '0.5rem 1.5rem',
                  border: 'none',
                  borderRadius: '50px',
                  backgroundColor: '#10b981',
                  color: '#ffffff',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 10px rgba(16,185,129,0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#059669';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 15px rgba(16,185,129,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#10b981';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 10px rgba(16,185,129,0.3)';
                }}
              >
                Register
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <div style={{ width: '30px', height: '20px', position: 'relative' }}>
              <span style={{ position: 'absolute', width: '100%', height: '2px', backgroundColor: '#333', top: 0 }} />
              <span style={{ position: 'absolute', width: '100%', height: '2px', backgroundColor: '#333', top: '9px' }} />
              <span style={{ position: 'absolute', width: '100%', height: '2px', backgroundColor: '#333', top: '18px' }} />
            </div>
          </button>
        </div>
      </nav>

      {/* Hero Section - Redesigned with Diagonal Layout */}
      <section id="home" className="hero-section" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', paddingTop: '100px' }}>
        {/* Background with Light Overlay */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <div style={{
            position: 'absolute',
            top: '-10%',
            left: '-10%',
            right: '-10%',
            bottom: '-10%',
            backgroundImage: `url(${KeleidoWallpaper})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(1.1) contrast(0.9)',
            opacity: 0.4,
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
            transition: 'transform 0.1s ease'
          }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.7)' }} />
        </div>

        {/* Diagonal Split Design */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
          <div style={{
            position: 'absolute',
            top: '-10%',
            left: '-5%',
            width: '70%',
            height: '120%',
            backgroundColor: '#10b981',
            opacity: 0.03,
            transform: 'skewX(-15deg)'
          }} />
          <div style={{
            position: 'absolute',
            top: '-10%',
            right: '-5%',
            width: '70%',
            height: '120%',
            backgroundColor: '#10b981',
            opacity: 0.03,
            transform: 'skewX(15deg)'
          }} />
        </div>

        <div style={{ position: 'relative', maxWidth: '1400px', margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', alignItems: 'center', zIndex: 2 }}>
          {/* Left Column - Text Content */}
          <div>
            {/* Logo with Animation */}
            <div style={{ marginBottom: '2rem' }}>
              <img 
                src={ReLinkLogo2} 
                alt="RE-Link" 
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '15px',
                  boxShadow: '0 10px 30px rgba(16,185,129,0.2)',
                  transform: `scale(${scale}) rotate(${rotationAngle * 5}deg)`,
                  transition: 'transform 0.3s ease',
                  marginBottom: '1rem'
                }}
              />
            </div>

            {/* SA Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#f0fdf4',
              borderRadius: '50px',
              marginBottom: '2rem'
            }}>
              <Flag size={18} color="#10b981" />
              <span style={{ color: '#10b981', fontWeight: 600 }}>Proudly South African</span>
            </div>

            {/* Animated Titles */}
            <h1 style={{
              fontSize: 'clamp(3rem, 5vw, 4.5rem)',
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: '1.5rem'
            }}>
              <span style={{ color: '#333' }}>Empowering </span>
              <span style={{ color: '#10b981', display: 'block' }}>{heroTitles[currentTitleIndex]}</span>
            </h1>

            <p style={{
              fontSize: '1.25rem',
              color: '#666',
              lineHeight: 1.8,
              marginBottom: '2rem',
              maxWidth: '600px'
            }}>
              {heroSubtitles[currentSubtitleIndex]}
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={handleRegister}
                style={{
                  padding: '1rem 2rem',
                  border: 'none',
                  borderRadius: '50px',
                  backgroundColor: '#10b981',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 10px 20px rgba(16,185,129,0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#059669';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 15px 30px rgba(16,185,129,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#10b981';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(16,185,129,0.2)';
                }}
              >
                <UserPlus size={20} />
                <span>Register Now</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={handleWatchIntro}
                style={{
                  padding: '1rem 2rem',
                  border: '2px solid #10b981',
                  borderRadius: '50px',
                  backgroundColor: 'transparent',
                  color: '#10b981',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#10b981';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#10b981';
                }}
              >
                <Play size={20} />
                <span>Watch Video</span>
              </button>

              <button
                onClick={generateBrochure}
                style={{
                  padding: '1rem 2rem',
                  border: '2px solid #e5e5e5',
                  borderRadius: '50px',
                  backgroundColor: 'transparent',
                  color: '#666',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#10b981';
                  e.currentTarget.style.color = '#10b981';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e5e5';
                  e.currentTarget.style.color = '#666';
                }}
              >
                <FileDown size={20} />
                <span>View Brochure</span>
              </button>
            </div>
          </div>

          {/* Right Column - Diagonal Gallery with Clearer Images */}
          <div className="diagonal-gallery" style={{ position: 'relative', height: '600px' }}>
            {/* Main Gallery Image */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: '500px',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(0,0,0,0.15)',
              transform: `perspective(1000px) rotateY(-5deg) rotateX(5deg)`,
              transition: 'transform 0.5s ease',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(5deg)';
            }}
            >
              <img 
                src={galleryImages[activeGallery].src} 
                alt={galleryImages[activeGallery].alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                  imageRendering: 'high-quality',
                  filter: 'brightness(1.02) contrast(1.02)'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '2rem',
                background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                color: '#ffffff'
              }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{galleryImages[activeGallery].caption}</h3>
                <p style={{ opacity: 0.95, textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>{galleryImages[activeGallery].category}</p>
              </div>
            </div>

            {/* Gallery Navigation */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', marginTop: '2rem' }}>
              <button
                onClick={handleGalleryPrev}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  border: '2px solid #e5e5e5',
                  backgroundColor: '#ffffff',
                  color: '#333',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#10b981';
                  e.currentTarget.style.color = '#10b981';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e5e5';
                  e.currentTarget.style.color = '#333';
                }}
              >
                <ChevronLeft size={24} />
              </button>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveGallery(index)}
                    style={{
                      width: index === activeGallery ? '30px' : '10px',
                      height: '10px',
                      borderRadius: '50px',
                      border: 'none',
                      backgroundColor: index === activeGallery ? '#10b981' : '#e5e5e5',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </div>

              <button
                onClick={handleGalleryNext}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  border: '2px solid #e5e5e5',
                  backgroundColor: '#ffffff',
                  color: '#333',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#10b981';
                  e.currentTarget.style.color = '#10b981';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e5e5';
                  e.currentTarget.style.color = '#333';
                }}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        {showScrollIndicator && (
          <div style={{
            position: 'absolute',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#999',
            cursor: 'pointer',
            animation: 'bounce 2s infinite',
            zIndex: 2
          }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <div style={{ fontSize: '0.875rem' }}>Scroll to explore</div>
            <ChevronDown size={20} />
          </div>
        )}
      </section>

      {/* Stats Preview Section */}
      <section style={{ padding: '4rem 2rem', backgroundColor: '#fafafa' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {statCards.slice(0, 5).map((stat, index) => (
              <div
                key={index}
                style={{
                  textAlign: 'center',
                  padding: '2rem',
                  backgroundColor: '#ffffff',
                  borderRadius: '15px',
                  boxShadow: '0 5px 20px rgba(0,0,0,0.03)',
                  transition: 'transform 0.3s ease',
                  border: '1px solid #f0f0f0'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ color: stat.color, marginBottom: '1rem' }}>{stat.icon}</div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: stat.color, marginBottom: '0.5rem' }}>
                  {statsVisible ? stat.value : '0'}{stat.suffix}
                </div>
                <div style={{ color: '#666', fontSize: '0.875rem' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="stats-section" ref={statsRef} style={{ padding: '6rem 2rem', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.5rem', backgroundColor: '#f0fdf4', borderRadius: '50px', marginBottom: '2rem' }}>
              <TrendingUp size={20} color="#10b981" />
              <span style={{ color: '#10b981', fontWeight: 600 }}>Real Impact, Measurable Results</span>
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#333', marginBottom: '1rem' }}>
              Transforming <span style={{ color: '#10b981' }}>Lives</span> Across South Africa
            </h2>
            <p style={{ maxWidth: '800px', margin: '0 auto', color: '#666', fontSize: '1.125rem' }}>
              Since 2020, we've created pathways to employment and empowerment for thousands of South Africans.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {statCards.map((stat, index) => (
              <div
                key={index}
                style={{
                  padding: '2rem',
                  backgroundColor: '#fafafa',
                  borderRadius: '15px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  border: '1px solid #f0f0f0'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#10b981';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(16,185,129,0.2)';
                  const elements = e.currentTarget.querySelectorAll('*');
                  elements.forEach(el => {
                    if (el.tagName === 'DIV' && el.style.color) el.style.color = '#ffffff';
                  });
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fafafa';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  const elements = e.currentTarget.querySelectorAll('*');
                  elements.forEach(el => {
                    if (el.tagName === 'DIV' && el.style.color) el.style.color = stat.color;
                  });
                }}
              >
                <div style={{ color: stat.color, marginBottom: '1rem' }}>{stat.icon}</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: stat.color, marginBottom: '0.5rem' }}>
                  {statsVisible ? stat.value : '0'}{stat.suffix}
                </div>
                <div style={{ color: '#666', fontWeight: 500 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section" style={{ padding: '6rem 2rem', backgroundColor: '#fafafa' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.5rem', backgroundColor: '#ffffff', borderRadius: '50px', marginBottom: '2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
              <Sparkles size={20} color="#10b981" />
              <span style={{ color: '#10b981', fontWeight: 600 }}>Comprehensive Support Ecosystem</span>
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#333', marginBottom: '1rem' }}>
              Your Pathway to <span style={{ color: '#10b981' }}>Success</span> in SA
            </h2>
            <p style={{ maxWidth: '800px', margin: '0 auto', color: '#666', fontSize: '1.125rem' }}>
              Everything you need for successful reintegration and career growth in South Africa.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
            {features.map((feature, index) => (
              <div
                key={index}
                style={{
                  padding: '2rem',
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  boxShadow: '0 5px 20px rgba(0,0,0,0.03)',
                  transition: 'all 0.3s ease',
                  border: '1px solid #f0f0f0'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 15px 30px rgba(16,185,129,0.1)';
                  e.currentTarget.style.borderColor = '#10b981';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.03)';
                  e.currentTarget.style.borderColor = '#f0f0f0';
                }}
              >
                <div style={{ display: 'inline-flex', padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '15px', marginBottom: '1.5rem', color: feature.color }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: '1.5rem', color: '#333', marginBottom: '1rem' }}>{feature.title}</h3>
                <p style={{ color: '#666', lineHeight: 1.6, marginBottom: '1.5rem' }}>{feature.description}</p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', backgroundColor: '#f0fdf4', borderRadius: '50px', marginBottom: '1.5rem' }}>
                  <Check size={16} color={feature.color} />
                  <span style={{ color: feature.color, fontWeight: 600 }}>{feature.stats}</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#666' }}>
                      <Check size={14} color={feature.color} />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="stories" className="stories-section" style={{ padding: '6rem 2rem', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.5rem', backgroundColor: '#f0fdf4', borderRadius: '50px', marginBottom: '2rem' }}>
              <Trophy size={20} color="#10b981" />
              <span style={{ color: '#10b981', fontWeight: 600 }}>Real Stories, Real Impact</span>
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#333', marginBottom: '1rem' }}>
              Transforming <span style={{ color: '#10b981' }}>Lives</span> Every Day
            </h2>
            <p style={{ maxWidth: '800px', margin: '0 auto', color: '#666', fontSize: '1.125rem' }}>
              Hear from South Africans who have successfully rebuilt their lives through RE-Link.
            </p>
          </div>

          <div style={{ position: 'relative', minHeight: '500px' }}>
            <button
              onClick={handleStoryPrev}
              style={{
                position: 'absolute',
                left: '-20px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: '2px solid #e5e5e5',
                backgroundColor: '#ffffff',
                color: '#333',
                cursor: 'pointer',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#10b981';
                e.currentTarget.style.color = '#10b981';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5e5e5';
                e.currentTarget.style.color = '#333';
              }}
            >
              <ChevronLeft size={24} />
            </button>

            <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
              {successStories.map((story, index) => (
                <div
                  key={index}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    opacity: index === activeStory ? 1 : 0,
                    transform: `translateX(${(index - activeStory) * 100}%) scale(${index === activeStory ? 1 : 0.8})`,
                    transition: 'all 0.5s ease',
                    pointerEvents: index === activeStory ? 'auto' : 'none'
                  }}
                >
                  <div style={{
                    backgroundColor: '#fafafa',
                    borderRadius: '20px',
                    padding: '3rem',
                    textAlign: 'center',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                  }}>
                    <div style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      backgroundColor: '#10b981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 2rem',
                      position: 'relative'
                    }}>
                      <span style={{ fontSize: '2rem', color: '#ffffff', fontWeight: 700 }}>{story.avatar}</span>
                      {story.verified && (
                        <div style={{
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          width: '25px',
                          height: '25px',
                          borderRadius: '50%',
                          backgroundColor: '#10b981',
                          border: '3px solid #ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Check size={12} color="#ffffff" />
                        </div>
                      )}
                    </div>

                    <h3 style={{ fontSize: '1.5rem', color: '#333', marginBottom: '0.5rem' }}>{story.name}</h3>
                    <p style={{ color: '#10b981', fontWeight: 600, marginBottom: '0.25rem' }}>{story.role}</p>
                    <p style={{ color: '#666', marginBottom: '1rem' }}>{story.company}</p>
                    <p style={{ color: '#999', fontSize: '0.875rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                      <MapPin size={14} />
                      {story.location}
                    </p>

                    <blockquote style={{
                      fontSize: '1.125rem',
                      color: '#666',
                      lineHeight: 1.8,
                      fontStyle: 'italic',
                      marginBottom: '2rem',
                      position: 'relative'
                    }}>
                      <Quote size={30} style={{ position: 'absolute', top: '-20px', left: '-20px', opacity: 0.1, color: '#10b981' }} />
                      {story.story}
                    </blockquote>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={16} color="#999" />
                        <span style={{ color: '#666', fontSize: '0.875rem' }}>{story.duration}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Trophy size={16} color="#999" />
                        <span style={{ color: '#666', fontSize: '0.875rem' }}>{story.achievement}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleStoryNext}
              style={{
                position: 'absolute',
                right: '-20px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: '2px solid #e5e5e5',
                backgroundColor: '#ffffff',
                color: '#333',
                cursor: 'pointer',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#10b981';
                e.currentTarget.style.color = '#10b981';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5e5e5';
                e.currentTarget.style.color = '#333';
              }}
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '3rem' }}>
            {successStories.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStory(index)}
                style={{
                  width: index === activeStory ? '30px' : '10px',
                  height: '10px',
                  borderRadius: '50px',
                  border: 'none',
                  backgroundColor: index === activeStory ? '#10b981' : '#e5e5e5',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section" style={{ padding: '4rem 2rem', backgroundColor: '#10b981' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{ fontSize: '2rem', color: '#ffffff', marginBottom: '1rem' }}>Stay Updated</h3>
          <p style={{ color: '#ffffff', opacity: 0.9, marginBottom: '2rem' }}>
            Subscribe for job opportunities, success stories, and community updates.
          </p>

          <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', gap: '1rem' }}>
            <input
              type="email"
              placeholder="Enter your email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
              style={{
                flex: 1,
                padding: '1rem 1.5rem',
                border: 'none',
                borderRadius: '50px',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                padding: '1rem 2rem',
                border: '2px solid #ffffff',
                borderRadius: '50px',
                backgroundColor: 'transparent',
                color: '#ffffff',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.color = '#10b981';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#ffffff';
              }}
            >
              <Send size={18} />
              <span>Subscribe</span>
            </button>
          </form>

          {newsletterSubmitted && (
            <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#ffffff', borderRadius: '10px', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <CheckCircle size={20} />
              <span>Thank you for subscribing! Ngiyabonga!</span>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section" style={{ padding: '6rem 2rem', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.5rem', backgroundColor: '#f0fdf4', borderRadius: '50px', marginBottom: '2rem' }}>
              <MessageCircle size={20} color="#10b981" />
              <span style={{ color: '#10b981', fontWeight: 600 }}>Get in Touch</span>
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#333', marginBottom: '1rem' }}>
              We're Here to <span style={{ color: '#10b981' }}>Help</span>
            </h2>
            <p style={{ maxWidth: '800px', margin: '0 auto', color: '#666', fontSize: '1.125rem' }}>
              Have questions? Reach out to us through any of these channels.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
            {/* Contact Info */}
            <div>
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', backgroundColor: '#fafafa', borderRadius: '15px', marginBottom: '1rem' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '10px', backgroundColor: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Phone size={24} color="#10b981" />
                  </div>
                  <div>
                    <h4 style={{ color: '#333', marginBottom: '0.25rem' }}>Phone</h4>
                    <p style={{ color: '#10b981', fontWeight: 600 }}>0800 123 456</p>
                    <span style={{ color: '#999', fontSize: '0.875rem' }}>24/7 Helpline</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', backgroundColor: '#fafafa', borderRadius: '15px', marginBottom: '1rem' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '10px', backgroundColor: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Mail size={24} color="#10b981" />
                  </div>
                  <div>
                    <h4 style={{ color: '#333', marginBottom: '0.25rem' }}>Email</h4>
                    <p style={{ color: '#10b981', fontWeight: 600 }}>support@re-link.co.za</p>
                    <span style={{ color: '#999', fontSize: '0.875rem' }}>Response within 24h</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', backgroundColor: '#fafafa', borderRadius: '15px' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '10px', backgroundColor: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MapPin size={24} color="#10b981" />
                  </div>
                  <div>
                    <h4 style={{ color: '#333', marginBottom: '0.25rem' }}>Head Office</h4>
                    <p style={{ color: '#666' }}>123 Hope Street</p>
                    <p style={{ color: '#666' }}>Johannesburg, 2000</p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="#" style={{ width: '45px', height: '45px', borderRadius: '10px', backgroundColor: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#10b981';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f0fdf4';
                    e.currentTarget.style.color = '#10b981';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Facebook size={20} />
                </a>
                <a href="#" style={{ width: '45px', height: '45px', borderRadius: '10px', backgroundColor: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#10b981';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f0fdf4';
                    e.currentTarget.style.color = '#10b981';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Twitter size={20} />
                </a>
                <a href="#" style={{ width: '45px', height: '45px', borderRadius: '10px', backgroundColor: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#10b981';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f0fdf4';
                    e.currentTarget.style.color = '#10b981';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Linkedin size={20} />
                </a>
                <a href="#" style={{ width: '45px', height: '45px', borderRadius: '10px', backgroundColor: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#10b981';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f0fdf4';
                    e.currentTarget.style.color = '#10b981';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Instagram size={20} />
                </a>
                <a href="#" style={{ width: '45px', height: '45px', borderRadius: '10px', backgroundColor: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#10b981';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f0fdf4';
                    e.currentTarget.style.color = '#10b981';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Youtube size={20} />
                </a>
                <a href="#" style={{ width: '45px', height: '45px', borderRadius: '10px', backgroundColor: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#10b981';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f0fdf4';
                    e.currentTarget.style.color = '#10b981';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <FaWhatsapp size={20} />
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div style={{ padding: '2rem', backgroundColor: '#fafafa', borderRadius: '20px' }}>
              <form onSubmit={handleContactSubmit}>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid #e5e5e5',
                    borderRadius: '10px',
                    marginBottom: '1rem',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#10b981'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e5e5e5'}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid #e5e5e5',
                    borderRadius: '10px',
                    marginBottom: '1rem',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#10b981'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e5e5e5'}
                />
                <textarea
                  placeholder="Your Message"
                  rows="5"
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid #e5e5e5',
                    borderRadius: '10px',
                    marginBottom: '1rem',
                    fontSize: '1rem',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#10b981'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e5e5e5'}
                />
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: 'none',
                    borderRadius: '10px',
                    backgroundColor: '#10b981',
                    color: '#ffffff',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#059669';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(16,185,129,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#10b981';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Send size={18} />
                  <span>Send Message</span>
                </button>

                {contactSubmitted && (
                  <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '10px', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <CheckCircle size={20} />
                    <span>Message sent successfully! Re tla go araba!</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" style={{ backgroundColor: '#1a1a1a', color: '#ffffff', padding: '4rem 2rem 2rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
            <div>
              <img src={ReLinkLogo} alt="RE-Link" style={{ width: '50px', height: '50px', borderRadius: '10px', marginBottom: '1rem' }} />
              <h3 style={{ color: '#10b981', marginBottom: '0.5rem' }}>RE-LINK</h3>
              <p style={{ color: '#999', fontStyle: 'italic', marginBottom: '1rem' }}>{slogans[currentSloganIndex]}</p>
              <p style={{ color: '#999', lineHeight: 1.6 }}>
                Empowering South Africans through employment, mentorship, and community reintegration since 2020.
              </p>
            </div>

            <div>
              <h4 style={{ color: '#ffffff', marginBottom: '1.5rem' }}>Quick Links</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '0.75rem' }}><a href="#home" onClick={(e) => handleSmoothScroll(e, 'home')} style={{ color: '#999', textDecoration: 'none', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = '#10b981'} onMouseLeave={(e) => e.currentTarget.style.color = '#999'}>Home</a></li>
                <li style={{ marginBottom: '0.75rem' }}><a href="#features" onClick={(e) => handleSmoothScroll(e, 'features')} style={{ color: '#999', textDecoration: 'none', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = '#10b981'} onMouseLeave={(e) => e.currentTarget.style.color = '#999'}>Features</a></li>
                <li style={{ marginBottom: '0.75rem' }}><a href="#stats" onClick={(e) => handleSmoothScroll(e, 'stats')} style={{ color: '#999', textDecoration: 'none', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = '#10b981'} onMouseLeave={(e) => e.currentTarget.style.color = '#999'}>Impact</a></li>
                <li style={{ marginBottom: '0.75rem' }}><a href="#stories" onClick={(e) => handleSmoothScroll(e, 'stories')} style={{ color: '#999', textDecoration: 'none', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = '#10b981'} onMouseLeave={(e) => e.currentTarget.style.color = '#999'}>Stories</a></li>
                <li style={{ marginBottom: '0.75rem' }}><a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} style={{ color: '#999', textDecoration: 'none', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = '#10b981'} onMouseLeave={(e) => e.currentTarget.style.color = '#999'}>Contact</a></li>
              </ul>
            </div>

            
            <div>
              <h4 style={{ color: '#ffffff', marginBottom: '1.5rem' }}>Connect</h4>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="#" style={{ color: '#999', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = '#10b981'} onMouseLeave={(e) => e.currentTarget.style.color = '#999'}><Facebook size={18} /></a>
                <a href="#" style={{ color: '#999', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = '#10b981'} onMouseLeave={(e) => e.currentTarget.style.color = '#999'}><Twitter size={18} /></a>
                <a href="#" style={{ color: '#999', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = '#10b981'} onMouseLeave={(e) => e.currentTarget.style.color = '#999'}><Linkedin size={18} /></a>
                <a href="#" style={{ color: '#999', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = '#10b981'} onMouseLeave={(e) => e.currentTarget.style.color = '#999'}><Instagram size={18} /></a>
                <a href="#" style={{ color: '#999', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = '#10b981'} onMouseLeave={(e) => e.currentTarget.style.color = '#999'}><Youtube size={18} /></a>
                <a href="#" style={{ color: '#999', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = '#10b981'} onMouseLeave={(e) => e.currentTarget.style.color = '#999'}><FaWhatsapp size={18} /></a>
              </div>
            </div>
          </div>

          <div style={{ paddingTop: '2rem', borderTop: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ color: '#999', fontSize: '0.875rem' }}>© 2024 RE-LINK. All rights reserved. Building a better South Africa through second chances.</p>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <span style={{ color: '#10b981', fontSize: '0.875rem' }}>🇿🇦 Members: {animatedStats.members}+</span>
              <span style={{ color: '#10b981', fontSize: '0.875rem' }}>💼 Jobs: {animatedStats.jobs}+</span>
              <span style={{ color: '#10b981', fontSize: '0.875rem' }}>🏢 Companies: {animatedStats.companies}+</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'fadeIn 0.3s ease'
        }} onClick={() => setIsVideoModalOpen(false)}>
          <div style={{
            width: '90%',
            maxWidth: '1000px',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            overflow: 'hidden',
            animation: 'scaleIn 0.3s ease'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ position: 'relative', paddingTop: '56.25%' }}>
              <video
                ref={videoRef}
                src={IntroVideo}
                poster={ReLinkLogo}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%'
                }}
                onTimeUpdate={handleVideoTimeUpdate}
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
              />
              <button
                onClick={() => setIsVideoModalOpen(false)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  color: '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{
              padding: '1rem',
              backgroundColor: '#fafafa',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <button onClick={toggleVideoPlay} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#10b981' }}>
                {isVideoPlaying ? <PauseCircle size={32} /> : <PlayCircle size={32} />}
              </button>

              <div style={{ flex: 1, height: '4px', backgroundColor: '#e5e5e5', borderRadius: '2px', cursor: 'pointer' }} onClick={handleVideoSeek}>
                <div style={{ width: `${videoProgress}%`, height: '100%', backgroundColor: '#10b981', borderRadius: '2px' }} />
              </div>

              <button onClick={() => setIsMuted(!isMuted)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#10b981' }}>
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>

              <button onClick={toggleFullscreen} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#10b981' }}>
                {isFullscreen ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bot Service with Login.jsx Spinning Animation */}
      <div
        onClick={handleBotLogoClick}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          backgroundColor: '#10b981',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(16,185,129,0.3)',
          zIndex: 1000,
          animation: 'spin 8s linear infinite',
          transition: 'all 0.3s ease',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 15px 40px rgba(16,185,129,0.4)';
          e.currentTarget.style.animation = 'spin 4s linear infinite';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(16,185,129,0.3)';
          e.currentTarget.style.animation = 'spin 8s linear infinite';
        }}
      >
        <img 
          src={ReLinkLogo} 
          alt="RE-Link Bot" 
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            objectFit: 'cover'
          }}
        />
        <div style={{
          position: 'absolute',
          bottom: '5px',
          right: '5px',
          width: '15px',
          height: '15px',
          borderRadius: '50%',
          backgroundColor: '#10b981',
          border: '2px solid #ffffff',
          animation: 'pulse 2s infinite'
        }} />
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: 0,
          padding: '0.5rem 1rem',
          backgroundColor: '#ffffff',
          borderRadius: '50px',
          fontSize: '0.875rem',
          color: '#333',
          whiteSpace: 'nowrap',
          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none'
        }} className="bot-tooltip">
          Chat with our AI Assistant
        </div>
      </div>

      {/* Chatbot */}
      <div className={`chatbot ${botActive ? 'active' : ''}`} style={{
        position: 'fixed',
        bottom: '120px',
        right: '30px',
        width: '350px',
        height: '500px',
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        zIndex: 999,
        transform: botActive ? 'translateY(0)' : 'translateY(20px)',
        opacity: botActive ? 1 : 0,
        visibility: botActive ? 'visible' : 'hidden',
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          padding: '1rem',
          backgroundColor: '#10b981',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          cursor: 'pointer'
        }} onClick={() => setBotActive(!botActive)}>
          <MessageCircle size={20} />
          <h4 style={{ flex: 1, margin: 0, fontSize: '1rem' }}>RE-Link Assistant</h4>
          <button style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}>
            {botActive ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </button>
        </div>

        <div ref={chatbotRef} style={{ flex: 1, padding: '1rem', overflowY: 'auto', backgroundColor: '#fafafa' }}>
          {botMessages.map((msg) => (
            <div
              key={msg.id}
              style={{
                maxWidth: '80%',
                marginBottom: '1rem',
                alignSelf: msg.fromBot ? 'flex-start' : 'flex-end',
                marginLeft: msg.fromBot ? 0 : 'auto'
              }}
            >
              <div style={{
                padding: '0.75rem',
                borderRadius: msg.fromBot ? '15px 15px 15px 0' : '15px 15px 0 15px',
                backgroundColor: msg.fromBot ? '#ffffff' : '#10b981',
                color: msg.fromBot ? '#333' : '#ffffff',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
              }}>
                {msg.text.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < msg.text.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
              <div style={{ fontSize: '0.625rem', color: '#999', marginTop: '0.25rem', textAlign: msg.fromBot ? 'left' : 'right' }}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding: '0.5rem', backgroundColor: '#ffffff', borderTop: '1px solid #e5e5e5' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleBotMessage(reply)}
                style={{
                  padding: '0.25rem 0.75rem',
                  border: '1px solid #e5e5e5',
                  borderRadius: '50px',
                  backgroundColor: '#f5f5f5',
                  fontSize: '0.75rem',
                  color: '#666',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#10b981';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.borderColor = '#10b981';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f5f5f5';
                  e.currentTarget.style.color = '#666';
                  e.currentTarget.style.borderColor = '#e5e5e5';
                }}
              >
                {reply}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              placeholder="Type your question..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleBotMessage(userInput)}
              style={{
                flex: 1,
                padding: '0.75rem',
                border: '1px solid #e5e5e5',
                borderRadius: '10px',
                fontSize: '0.875rem',
                outline: 'none'
              }}
            />
            <button
              onClick={() => handleBotMessage(userInput)}
              style={{
                padding: '0.75rem',
                border: 'none',
                borderRadius: '10px',
                backgroundColor: '#10b981',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      {isScrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed',
            bottom: '30px',
            left: '30px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: '#10b981',
            color: '#ffffff',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 5px 20px rgba(16,185,129,0.3)',
            zIndex: 999,
            animation: 'fadeIn 0.3s ease',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(16,185,129,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 5px 20px rgba(16,185,129,0.3)';
          }}
        >
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
};

export default LandingPage;