import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useEducation({ setCredibilityScore, setNotifications, setIsLoading }) {
  const [educationSearchTerm, setEducationSearchTerm] = useState('');
  const [educationCategory, setEducationCategory] = useState('all');
  const [showLearningPath, setShowLearningPath] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(0);
  const [learningPath, setLearningPath] = useState(null);

  const [enrolledCourses, setEnrolledCourses] = useLocalStorage('relink_enrolled_courses', []);
  const [courseProgress, setCourseProgress] = useLocalStorage('relink_course_progress', {});
  const [bookmarkedCourses, setBookmarkedCourses] = useLocalStorage('relink_bookmarked_courses', []);
  const [certificateEarned, setCertificateEarned] = useLocalStorage('relink_certificates', []);
  const [lessonProgress, setLessonProgress] = useLocalStorage('relink_lesson_progress', {});

  const educationalPlatforms = [
    {
      id: 1,
      name: "SETA Accredited Courses",
      provider: "Services SETA",
      description: "Nationally recognized qualifications in various sectors including construction, IT, and business management.",
      courses: 45,
      type: "accredited",
      cost: "Subsidized (R500-R2000)",
      duration: "3-12 months",
      certification: "National Certificate",
      url: "https://www.serviceseta.org.za",
      applicationDeadline: "Rolling admissions",
      requirements: ["Grade 10-12", "ID document", "Proof of residence"],
      points: 25,
      icon: "Award",
      rating: 4.5,
      studentsEnrolled: 1250,
      completionRate: 78,
      features: ["QCTO accredited", "Workplace experience", "Job placement assistance"],
      locations: ["Gauteng", "Western Cape", "KZN", "Eastern Cape", "Free State", "Mpumalanga", "Limpopo", "North West", "Northern Cape"]
    },
    {
      id: 2,
      name: "YES4Youth Programme",
      provider: "Youth Employment Service",
      description: "Work experience programme for youth with matric, offering 12-month paid placements with top SA companies.",
      courses: 0,
      type: "internship",
      cost: "Free (Paid internship)",
      duration: "12 months",
      certification: "Work experience certificate",
      url: "https://www.yes4youth.co.za",
      applicationDeadline: "Monthly intake",
      requirements: ["Matric", "Age 18-34", "Unemployed", "South African"],
      points: 30,
      icon: "Briefcase",
      rating: 4.7,
      studentsEnrolled: 25000,
      completionRate: 85,
      features: ["Monthly stipend", "Mentorship", "Job readiness training", "Post-programme support"],
      locations: ["All provinces"]
    },
    {
      id: 3,
      name: "Harambee Youth Employment Accelerator",
      provider: "Harambee",
      description: "Free online learning and job matching platform connecting young South Africans with entry-level jobs.",
      courses: 25,
      type: "online",
      cost: "Free",
      duration: "Self-paced",
      certification: "Course certificates",
      url: "https://www.harambee.co.za",
      applicationDeadline: "Open year-round",
      requirements: ["Age 18-35", "Smartphone access", "South African"],
      points: 15,
      icon: "Users",
      rating: 4.6,
      studentsEnrolled: 50000,
      completionRate: 82,
      features: ["Mobile-friendly", "Work-readiness training", "Employer connections", "CV builder"],
      locations: ["National (online)"]
    },
    {
      id: 4,
      name: "Construction Education & Training Authority (CETA)",
      provider: "CETA",
      description: "Specialized training in construction, plumbing, electrical, and civil engineering skills.",
      courses: 35,
      type: "vocational",
      cost: "Subsidized (R300-R1500)",
      duration: "3-18 months",
      certification: "Trade Test Certificate",
      url: "https://www.ceta.org.za",
      applicationDeadline: "Bi-annual intake",
      requirements: ["Grade 9-12", "ID", "Medical fitness"],
      points: 28,
      icon: "Building",
      rating: 4.4,
      studentsEnrolled: 8500,
      completionRate: 75,
      features: ["Practical training", "Toolkit provided", "Learnerships available", "Artiisan development"],
      locations: ["Gauteng", "KZN", "Western Cape", "Eastern Cape", "Free State"]
    },
    {
      id: 5,
      name: "Microsoft Learn SA",
      provider: "Microsoft South Africa",
      description: "Free technical training in Microsoft technologies, cloud computing, and digital skills.",
      courses: 50,
      type: "online",
      cost: "Free",
      duration: "Self-paced",
      certification: "Microsoft Certified",
      url: "https://learn.microsoft.com/en-us/training/",
      applicationDeadline: "Always open",
      requirements: ["Basic computer literacy", "Internet access"],
      points: 20,
      icon: "Monitor",
      rating: 4.8,
      studentsEnrolled: 15000,
      completionRate: 70,
      features: ["Industry-recognized", "Hands-on labs", "Learning paths", "Free certification exams"],
      locations: ["Online"]
    },
    {
      id: 6,
      name: "Google Digital Skills for Africa",
      provider: "Google",
      description: "Free online courses in digital marketing, e-commerce, and data analytics.",
      courses: 26,
      type: "online",
      cost: "Free",
      duration: "2-40 hours per course",
      certification: "Google Certificate",
      url: "https://grow.google/intl/africa/",
      applicationDeadline: "Always open",
      requirements: ["Internet access", "Basic English"],
      points: 15,
      icon: "Globe",
      rating: 4.9,
      studentsEnrolled: 35000,
      completionRate: 73,
      features: ["Self-paced", "Industry-recognized", "Career resources", "Job board access"],
      locations: ["Online"]
    },
    {
      id: 7,
      name: "UJ Online Short Courses",
      provider: "University of Johannesburg",
      description: "University-accredited short courses in business, management, and professional development.",
      courses: 60,
      type: "university",
      cost: "R1,500 - R8,000",
      duration: "6-12 weeks",
      certification: "UJ Certificate",
      url: "https://www.uj.ac.za/short-courses",
      applicationDeadline: "Quarterly intake",
      requirements: ["Matric", "English proficiency"],
      points: 22,
      icon: "GraduationCap",
      rating: 4.5,
      studentsEnrolled: 5200,
      completionRate: 88,
      features: ["University credit", "Expert lecturers", "Flexible learning", "Network access"],
      locations: ["Johannesburg", "Online"]
    },
    {
      id: 8,
      name: "Coursera for Government SA",
      provider: "Coursera",
      description: "Free access to thousands of courses from top universities for unemployed South Africans.",
      courses: 300,
      type: "online",
      cost: "Free for eligible",
      duration: "1-6 months",
      certification: "Professional Certificate",
      url: "https://www.coursera.org/government/south-africa",
      applicationDeadline: "Through partner organizations",
      requirements: ["Unemployed", "South African ID"],
      points: 25,
      icon: "BookOpen",
      rating: 4.7,
      studentsEnrolled: 18000,
      completionRate: 65,
      features: ["Top university courses", "Guided projects", "Career paths", "Shareable certificates"],
      locations: ["Online"]
    },
    {
      id: 9,
      name: "MERSETA Skills Programmes",
      provider: "Manufacturing, Engineering and Related Services SETA",
      description: "Technical training in manufacturing, engineering, and related fields.",
      courses: 40,
      type: "vocational",
      cost: "Subsidized",
      duration: "3-12 months",
      certification: "MERSETA Certificate",
      url: "https://www.merseta.org.za",
      applicationDeadline: "Rolling",
      requirements: ["Grade 10-12", "Technical aptitude"],
      points: 28,
      icon: "Settings",
      rating: 4.3,
      studentsEnrolled: 6200,
      completionRate: 76,
      features: ["Workshop training", "Industry placement", "Tool allowance", "Trade test preparation"],
      locations: ["Gauteng", "KZN", "Western Cape", "Eastern Cape", "Mpumalanga"]
    },
    {
      id: 10,
      name: "Wholesale & Retail SETA Learnerships",
      provider: "W&R SETA",
      description: "Learnerships in retail operations, sales, and supply chain management.",
      courses: 20,
      type: "learnership",
      cost: "Free (Stipend paid)",
      duration: "12 months",
      certification: "NQF Level 2-4",
      url: "https://www.wrseta.org.za",
      applicationDeadline: "Bi-annual",
      requirements: ["Grade 10-12", "South African"],
      points: 30,
      icon: "ShoppingBag",
      rating: 4.2,
      studentsEnrolled: 4500,
      completionRate: 81,
      features: ["Monthly stipend", "Work experience", "Retail skills", "Employment pathway"],
      locations: ["All provinces"]
    }
  ];

  const educationCategories = [
    { id: "all", name: "All Courses", icon: "Layers" },
    { id: "accredited", name: "Accredited", icon: "Award" },
    { id: "vocational", name: "Vocational", icon: "Settings" },
    { id: "online", name: "Online Learning", icon: "Monitor" },
    { id: "university", name: "University", icon: "GraduationCap" },
    { id: "learnership", name: "Learnerships", icon: "Briefcase" },
    { id: "internship", name: "Internships", icon: "Users" }
  ];

  const courseLessons = {
    1: [
      { id: 1, title: "Introduction to Construction", duration: "45 min", video: true, completed: false },
      { id: 2, title: "Health & Safety Basics", duration: "60 min", video: true, completed: false },
      { id: 3, title: "Tool Identification", duration: "30 min", video: true, completed: false },
      { id: 4, title: "Workplace Communication", duration: "45 min", video: true, completed: false },
      { id: 5, title: "Practical Assessment", duration: "90 min", video: false, completed: false }
    ],
    2: [
      { id: 1, title: "CV Writing Workshop", duration: "60 min", video: true, completed: true },
      { id: 2, title: "Interview Skills", duration: "45 min", video: true, completed: false },
      { id: 3, title: "Workplace Etiquette", duration: "30 min", video: true, completed: false },
      { id: 4, title: "Employer Expectations", duration: "45 min", video: true, completed: false }
    ]
  };

  const courseQuizzes = {
    1: [
      { question: "What is the most important safety gear on a construction site?", options: ["Hard hat", "Steel-toe boots", "Safety glasses", "All of the above"], correct: 3 },
      { question: "Which of these is NOT a basic hand tool?", options: ["Hammer", "Screwdriver", "Circular saw", "Measuring tape"], correct: 2 },
      { question: "What does PPE stand for?", options: ["Personal Protective Equipment", "Professional Performance Evaluation", "Public Property Expense", "Personal Property Estimate"], correct: 0 }
    ]
  };

  const learningPaths = [
    {
      id: 1,
      title: "Construction Career Path",
      description: "From entry-level to qualified artisan",
      steps: [
        { name: "Health & Safety Course", provider: "CETA", duration: "1 week", completed: false },
        { name: "Basic Construction Skills", provider: "MERSETA", duration: "3 months", completed: false },
        { name: "Trade Test Preparation", provider: "CETA", duration: "6 months", completed: false },
        { name: "Apprenticeship", provider: "Employer", duration: "12 months", completed: false },
        { name: "Qualified Artisan", provider: "NAMB", duration: "N/A", completed: false }
      ],
      points: 150,
      icon: "Building"
    },
    {
      id: 2,
      title: "Digital Skills Path",
      description: "From beginner to tech professional",
      steps: [
        { name: "Computer Literacy", provider: "Harambee", duration: "1 month", completed: false },
        { name: "Microsoft Office", provider: "Microsoft Learn", duration: "2 months", completed: false },
        { name: "Digital Marketing", provider: "Google", duration: "3 months", completed: false },
        { name: "Data Analytics", provider: "Coursera", duration: "4 months", completed: false },
        { name: "Tech Certification", provider: "Various", duration: "N/A", completed: false }
      ],
      points: 200,
      icon: "Monitor"
    }
  ];

  const handleEnrollCourse = (platform) => {
    if (!enrolledCourses.includes(platform.id)) {
      setEnrolledCourses([...enrolledCourses, platform.id]);
      
      setCourseProgress({
        ...courseProgress,
        [platform.id]: 0
      });
      
      if (setCredibilityScore) {
        setCredibilityScore(prev => Math.min(100, prev + platform.points));
      }
      
      setNotifications(prev => [...prev, { 
        id: Date.now(), 
        message: `Enrolled in ${platform.name}! +${platform.points} points`, 
        type: 'success' 
      }]);
      
      window.open(platform.url, '_blank');
    } else {
      window.open(platform.url, '_blank');
      setNotifications(prev => [...prev, { 
        id: Date.now(), 
        message: `Opening ${platform.name}...`, 
        type: 'info' 
      }]);
    }
  };

  const handleBookmarkCourse = (platformId) => {
    if (bookmarkedCourses.includes(platformId)) {
      setBookmarkedCourses(bookmarkedCourses.filter(id => id !== platformId));
      setNotifications(prev => [...prev, { 
        id: Date.now(), 
        message: 'Course removed from bookmarks', 
        type: 'info' 
      }]);
    } else {
      setBookmarkedCourses([...bookmarkedCourses, platformId]);
      setNotifications(prev => [...prev, { 
        id: Date.now(), 
        message: 'Course bookmarked!', 
        type: 'success' 
      }]);
    }
  };

  const handleStartLesson = (platformId, lesson) => {
    setCurrentLesson({ platformId, lesson });
    
    setLessonProgress({
      ...lessonProgress,
      [`${platformId}-${lesson.id}`]: 'started'
    });
  };

  const handleCompleteLesson = (platformId, lessonId) => {
    setLessonProgress({
      ...lessonProgress,
      [`${platformId}-${lessonId}`]: 'completed'
    });
    
    const courseLessonsList = courseLessons[platformId] || [];
    const completedCount = Object.keys(lessonProgress).filter(key => 
      key.startsWith(`${platformId}-`) && lessonProgress[key] === 'completed'
    ).length + 1;
    
    const progress = Math.round((completedCount / courseLessonsList.length) * 100);
    
    setCourseProgress({
      ...courseProgress,
      [platformId]: progress
    });
    
    if (progress === 100) {
      setCertificateEarned([...certificateEarned, platformId]);
      
      if (setCredibilityScore) {
        setCredibilityScore(prev => Math.min(100, prev + 50));
      }
      
      setNotifications(prev => [...prev, { 
        id: Date.now(), 
        message: '🎉 Course completed! Certificate earned! +50 bonus points', 
        type: 'success' 
      }]);
    } else {
      setNotifications(prev => [...prev, { 
        id: Date.now(), 
        message: `Lesson completed! Progress: ${progress}%`, 
        type: 'success' 
      }]);
    }
  };

  const handleTakeQuiz = (platformId) => {
    setShowQuiz(true);
    setQuizAnswers({});
    setQuizScore(0);
    setSelectedCourse(platformId);
  };

  const handleQuizAnswer = (questionIndex, answerIndex) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionIndex]: answerIndex
    });
  };

  const handleSubmitQuiz = (platformId) => {
    const quiz = courseQuizzes[platformId];
    if (!quiz) return;
    
    let correct = 0;
    quiz.forEach((q, index) => {
      if (quizAnswers[index] === q.correct) correct++;
    });
    
    const score = Math.round((correct / quiz.length) * 100);
    setQuizScore(score);
    
    if (score >= 70) {
      if (setCredibilityScore) {
        setCredibilityScore(prev => Math.min(100, prev + 20));
      }
      setNotifications(prev => [...prev, { 
        id: Date.now(), 
        message: `Quiz passed! Score: ${score}% +20 points`, 
        type: 'success' 
      }]);
    } else {
      setNotifications(prev => [...prev, { 
        id: Date.now(), 
        message: `Quiz score: ${score}%. Try again!`, 
        type: 'warning' 
      }]);
    }
    
    setTimeout(() => setShowQuiz(false), 3000);
  };

  const handleFollowLearningPath = (pathId) => {
    setShowLearningPath(true);
    setLearningPath(pathId);
    setNotifications(prev => [...prev, { 
      id: Date.now(), 
      message: 'Learning path started! Follow the steps to complete.', 
      type: 'success' 
    }]);
  };

  return {
    educationSearchTerm,
    setEducationSearchTerm,
    educationCategory,
    setEducationCategory,
    enrolledCourses,
    courseProgress,
    bookmarkedCourses,
    certificateEarned,
    learningPath,
    showLearningPath,
    currentLesson,
    lessonProgress,
    showQuiz,
    quizAnswers,
    quizScore,
    selectedCourse,
    showCourseModal,
    educationalPlatforms,
    educationCategories,
    courseLessons,
    courseQuizzes,
    learningPaths,
    handleEnrollCourse,
    handleBookmarkCourse,
    handleStartLesson,
    handleCompleteLesson,
    handleTakeQuiz,
    handleQuizAnswer,
    handleSubmitQuiz,
    handleFollowLearningPath,
    setShowCourseModal,
    setShowQuiz,
    setSelectedCourse
  };
}