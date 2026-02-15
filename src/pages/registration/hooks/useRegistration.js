import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// South African data constants
export const saProvinces = [
  "Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal",
  "Limpopo", "Mpumalanga", "North West", "Northern Cape", "Western Cape"
];

export const saSkills = [
  { skill: "Construction (Bricklaying, Plumbing, Electrical)", icon: "🏗️" },
  { skill: "Agriculture & Farming", icon: "🌾" },
  { skill: "Automotive Repair", icon: "🔧" },
  { skill: "Welding & Metalwork", icon: "🔥" },
  { skill: "Carpentry & Woodwork", icon: "🪵" },
  { skill: "Hospitality & Tourism", icon: "🏨" },
  { skill: "Retail & Customer Service", icon: "🛒" },
  { skill: "Warehouse & Logistics", icon: "📦" },
  { skill: "Cleaning & Maintenance", icon: "✨" },
  { skill: "Security Services", icon: "🛡️" },
  { skill: "Food Preparation & Cooking", icon: "👨‍🍳" },
  { skill: "Driving (Code 8/10/14)", icon: "🚗" },
  { skill: "Computer Literacy", icon: "💻" },
  { skill: "Hairdressing & Beauty", icon: "💇" },
  { skill: "Tailoring & Textiles", icon: "🧵" },
  { skill: "Gardening & Landscaping", icon: "🌿" },
  { skill: "Painting & Decorating", icon: "🎨" },
  { skill: "Childcare Assistance", icon: "👶" },
  { skill: "Elderly Care", icon: "👵" },
  { skill: "Basic First Aid", icon: "🏥" }
];

export const saFacilities = [
  "Pollsmoor Prison (Western Cape)",
  "Leeuwkop Prison (Gauteng)",
  "Kgosi Mampuru II (Gauteng)",
  "St Albans Prison (Eastern Cape)",
  "Durban Westville (KZN)",
  "Barberton Prison (Mpumalanga)",
  "Johannesburg Prison (Gauteng)",
  "Baviaanspoort (Gauteng)",
  "Goedemoed Prison (Free State)",
  "Other Correctional Facility"
];

export const educationLevels = [
  "No formal education",
  "Primary School (Grade 1-7)",
  "Some High School (Grade 8-11)",
  "Matric/NSC (Grade 12)",
  "TVET College Certificate",
  "TVET College Diploma",
  "University Diploma",
  "Bachelor's Degree",
  "Postgraduate Degree"
];

export const saLanguages = [
  { code: "en", name: "English", native: "English" },
  { code: "af", name: "Afrikaans", native: "Afrikaans" },
  { code: "zu", name: "isiZulu", native: "isiZulu" },
  { code: "xh", name: "isiXhosa", native: "isiXhosa" },
  { code: "st", name: "Sesotho", native: "Sesotho" },
  { code: "tn", name: "Setswana", native: "Setswana" },
  { code: "ss", name: "siSwati", native: "siSwati" },
  { code: "ve", name: "Tshivenda", native: "Tshivenda" },
  { code: "ts", name: "Xitsonga", native: "Xitsonga" },
  { code: "nr", name: "isiNdebele", native: "isiNdebele" }
];

export const stepTitles = [
  "Personal Information",
  "Rehabilitation Journey",
  "Skills & Qualifications",
  "Review & Final Submission"
];

export const titleColors = [
  '#10b981', '#047857', '#065f46', '#059669', '#34d399'
];

export const steps = [
  { number: 1, title: "Personal Info", icon: "Fingerprint", color: "#10b981" },
  { number: 2, title: "Rehabilitation", icon: "ShieldCheck", color: "#047857" },
  { number: 3, title: "Skills", icon: "BadgeCheck", color: "#065f46" },
  { number: 4, title: "Review", icon: "Award", color: "#059669" }
];

export const useRegistration = () => {
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [skillSearch, setSkillSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [logoHover, setLogoHover] = useState(false);
  const [titleGlow, setTitleGlow] = useState(false);
  const [floatingDots, setFloatingDots] = useState([]);
  const [cardGlow, setCardGlow] = useState(false);
  const [validFields, setValidFields] = useState({});
  const [fieldFocus, setFieldFocus] = useState({});
  const [stepTransition, setStepTransition] = useState(false);
  const [titlePulse, setTitlePulse] = useState(true);

  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    idNumber: "",
    email: "",
    phone: "",
    province: "",
    address: "",
    password: "",
    confirmPassword: "",
    
    // Prison Details
    facility: "",
    releaseDate: "",
    sentenceDuration: "",
    behaviorLevel: "Excellent",
    caseNumber: "",
    paroleOfficer: "",
    paroleEndDate: "",
    rehabilitationPrograms: "",
    
    // Skills & Education
    skills: [],
    certifications: "",
    educationLevel: "",
    languages: ["English"],
    workExperience: "",
    willingToRelocate: false,
    expectedSalary: "",
    careerGoals: "",
    
    // Review & Agreements
    agreeToTerms: false,
    agreeToVerification: false,
    agreeToContact: false,
    agreeToBackgroundCheck: false,
    agreeToCommunitySupport: false
  });

  // Generate floating animation dots
  useEffect(() => {
    const dots = [];
    for (let i = 0; i < 20; i++) {
      dots.push({
        id: i,
        size: Math.random() * 5 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 25 + 15,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.3 + 0.1
      });
    }
    setFloatingDots(dots);
  }, []);

  // Title glow animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleGlow(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Title pulse animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTitlePulse(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Card glow animation on step completion
  useEffect(() => {
    if (currentStep > 1) {
      setCardGlow(true);
      const timer = setTimeout(() => setCardGlow(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  // Step transition animation
  useEffect(() => {
    setStepTransition(true);
    const timer = setTimeout(() => setStepTransition(false), 500);
    return () => clearTimeout(timer);
  }, [currentStep]);

  // Calculate password strength
  useEffect(() => {
    if (!formData.password) {
      setPasswordStrength(0);
      return;
    }
    
    let strength = 0;
    const checks = {
      length: formData.password.length >= 8,
      uppercase: /[A-Z]/.test(formData.password),
      lowercase: /[a-z]/.test(formData.password),
      number: /[0-9]/.test(formData.password),
      special: /[^A-Za-z0-9]/.test(formData.password)
    };
    
    Object.values(checks).forEach(check => {
      if (check) strength += 20;
    });
    
    setPasswordStrength(strength);
  }, [formData.password]);

  // Field validation
  const validateField = useCallback((name, value) => {
    switch (name) {
      case 'idNumber':
        const idRegex = /^[0-9]{13}$/;
        return idRegex.test(value);
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      case 'phone':
        const phoneRegex = /^(\+27|0)[6-8][0-9]{8}$/;
        return phoneRegex.test(value.replace(/\s/g, ''));
      case 'password':
        return value.length >= 8;
      case 'firstName':
      case 'lastName':
        return value.trim().length >= 2;
      case 'province':
      case 'facility':
      case 'releaseDate':
        return value.trim().length > 0;
      default:
        return true;
    }
  }, []);

  // Update field validation status
  const updateFieldValidation = useCallback((name, value) => {
    const isValid = validateField(name, value);
    setValidFields(prev => ({
      ...prev,
      [name]: value ? isValid : null
    }));
  }, [validateField]);

  // Handle field change
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (type !== 'checkbox') {
      updateFieldValidation(name, value);
    }
    
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  }, [formErrors, updateFieldValidation]);

  // Handle skill toggle
  const handleSkillToggle = useCallback((skillObj) => {
    const skill = skillObj.skill;
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
    
    if (formErrors.skills) {
      setFormErrors(prev => ({ ...prev, skills: "" }));
    }
  }, [formErrors.skills]);

  // Handle language toggle
  const handleLanguageToggle = useCallback((language) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  }, []);

  // Validate step
  const validateStep = useCallback((step) => {
    const errors = {};
    
    if (step === 1) {
      if (!formData.firstName.trim()) errors.firstName = "First name is required";
      else if (!validateField('firstName', formData.firstName)) errors.firstName = "Minimum 2 characters";
      
      if (!formData.lastName.trim()) errors.lastName = "Last name is required";
      else if (!validateField('lastName', formData.lastName)) errors.lastName = "Minimum 2 characters";
      
      if (!formData.idNumber.trim()) errors.idNumber = "ID number is required";
      else if (!validateField('idNumber', formData.idNumber)) errors.idNumber = "Invalid SA ID number (13 digits)";
      
      if (!formData.email.trim()) errors.email = "Email is required";
      else if (!validateField('email', formData.email)) errors.email = "Invalid email address";
      
      if (!formData.phone.trim()) errors.phone = "Phone number is required";
      else if (!validateField('phone', formData.phone)) errors.phone = "Invalid SA phone number";
      
      if (!formData.province) errors.province = "Province is required";
      if (!formData.password) errors.password = "Password is required";
      else if (!validateField('password', formData.password)) errors.password = "Password must be at least 8 characters";
      
      if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Passwords don't match";
    }
    
    if (step === 2) {
      if (!formData.facility) errors.facility = "Correctional facility is required";
      if (!formData.releaseDate) errors.releaseDate = "Release date is required";
    }
    
    if (step === 3) {
      if (formData.skills.length === 0) errors.skills = "Please select at least one skill";
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors: errors
    };
  }, [formData, validateField]);

  // Navigation functions
  const nextStep = useCallback(() => {
    const validationResult = validateStep(currentStep);
    
    if (validationResult.isValid) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      setFormErrors(validationResult.errors);
    }
  }, [currentStep, validateStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  }, [currentStep]);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Validate all steps
    let isValid = true;
    let allErrors = {};
    
    for (let i = 1; i <= 4; i++) {
      const result = validateStep(i);
      if (!result.isValid) {
        isValid = false;
        allErrors = { ...allErrors, ...result.errors };
      }
    }
    
    if (!isValid) {
      setFormErrors(allErrors);
      setLoading(false);
      return;
    }
    
    if (!formData.agreeToTerms || !formData.agreeToVerification) {
      setFormErrors(prev => ({ ...prev, agreements: "Please agree to terms and verification" }));
      setLoading(false);
      return;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Prepare registration data
      const userData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        profile: {
          idNumber: formData.idNumber,
          phone: formData.phone,
          province: formData.province,
          address: formData.address,
          facility: formData.facility,
          releaseDate: formData.releaseDate,
          sentenceDuration: formData.sentenceDuration,
          behaviorLevel: formData.behaviorLevel,
          caseNumber: formData.caseNumber,
          paroleOfficer: formData.paroleOfficer,
          paroleEndDate: formData.paroleEndDate,
          rehabilitationPrograms: formData.rehabilitationPrograms,
          skills: formData.skills,
          certifications: formData.certifications,
          educationLevel: formData.educationLevel,
          languages: formData.languages,
          workExperience: formData.workExperience,
          willingToRelocate: formData.willingToRelocate,
          expectedSalary: formData.expectedSalary,
          careerGoals: formData.careerGoals
        }
      };
      
      console.log('Registration data:', userData);
      
      // Simulate successful registration
      setTimeout(() => {
        setLoading(false);
        navigate("/login", { 
          state: { 
            message: "Registration successful! Please sign in.",
            email: formData.email,
            name: formData.firstName
          }
        });
      }, 500);
      
    } catch (error) {
      setFormErrors(prev => ({ ...prev, submit: error.message || "An error occurred" }));
      setLoading(false);
    }
  };

  // Get icon glow class
  const getIconGlowClass = useCallback((fieldName) => {
    if (!fieldFocus[fieldName] && !formData[fieldName]) return "";
    if (validFields[fieldName] === true) return "icon-glow-valid";
    if (validFields[fieldName] === false) return "icon-glow-invalid";
    return "";
  }, [fieldFocus, formData, validFields]);

  // Check if current step is valid
  const isCurrentStepValid = useCallback(() => {
    const result = validateStep(currentStep);
    return result.isValid;
  }, [currentStep, validateStep]);

  // Filter skills based on search
  const filteredSkills = saSkills.filter(item => 
    item.skill.toLowerCase().includes(skillSearch.toLowerCase())
  );

  return {
    // State
    currentStep,
    showPassword,
    formErrors,
    passwordStrength,
    skillSearch,
    loading,
    logoHover,
    titleGlow,
    floatingDots,
    cardGlow,
    validFields,
    fieldFocus,
    stepTransition,
    titlePulse,
    formData,
    
    // Data constants
    saProvinces,
    saSkills,
    saFacilities,
    educationLevels,
    saLanguages,
    stepTitles,
    titleColors,
    steps,
    
    // Setters
    setShowPassword,
    setSkillSearch,
    setLogoHover,
    setFieldFocus,
    
    // Handlers
    handleChange,
    handleSkillToggle,
    handleLanguageToggle,
    nextStep,
    prevStep,
    handleSubmit,
    getIconGlowClass,
    isCurrentStepValid,
    filteredSkills
  };
};