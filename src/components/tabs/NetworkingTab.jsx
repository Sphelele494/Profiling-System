import React, { useState } from 'react';
import {
  BriefcaseBusiness, Filter, MapPin, Calendar, X, Bookmark,
  SendHorizontal, Eye, Clock, Zap, Building2, CheckCircle2,
  Megaphone, RefreshCw, Send, Briefcase, GraduationCap,
  HandHeart, BookOpen
} from "lucide-react";

// Mock images
import BuildRightLogo from "../../assets/buildright_thumb.jpg";
import LogisticsSALogo from "../../assets/logistics_thumb.jpg";
import CallComLogo from "../../assets/callcom_thumb.jpg";
import ConstructionCoLogo from "../../assets/constructionco_thumb.jpg";
import WareHouseProLogo from "../../assets/warehousepro_thumb.jpg";


function NetworkingTab({ user, jobsApplied, setJobsApplied }) {
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [salaryRange, setSalaryRange] = useState("All Ranges");
  const [availability, setAvailability] = useState("All");
  const [jobType, setJobType] = useState("All Types");
  const [showJobCategory, setShowJobCategory] = useState("All");
  const [notifications, setNotifications] = useState(5);

  // Featured jobs
  const featuredJobs = [
    {
      id: 1,
      title: "Construction Supervisor",
      company: "BuildRight Construction",
      logo: BuildRightLogo,
      location: "Soweto, Johannesburg",
      salary: "R25,000 - R35,000",
      type: "Full-time",
      matches: "95% match",
      urgent: true,
      posted: "2 hours ago",
      skills: ["Leadership", "Construction", "Safety", "Team Management"],
      industry: "Construction",
      description: "Leading construction projects in Soweto, managing teams, ensuring safety compliance.",
      requirements: "5+ years construction experience, leadership skills, safety certification",
      category: "job",
      benefits: ["Medical Aid", "Provident Fund", "Training", "Growth Opportunities"]
    },
    {
      id: 2,
      title: "Warehouse Manager",
      company: "Unitrans Logistics",
      logo: LogisticsSALogo,
      location: "Johannesburg",
      salary: "R22,000 - R32,000",
      type: "Full-time",
      matches: "88% match",
      urgent: false,
      posted: "1 day ago",
      skills: ["Management", "Logistics", "Inventory", "Operations"],
      industry: "Logistics",
      description: "Oversee warehouse operations, manage inventory, lead warehouse staff in Gauteng.",
      requirements: "Warehouse experience, management skills, inventory knowledge",
      category: "job",
      benefits: ["Performance Bonus", "Transport Allowance", "Medical Insurance"]
    },
    {
      id: 3,
      title: "Construction Learnership",
      company: "WBHO Construction",
      logo: ConstructionCoLogo,
      location: "Pretoria",
      salary: "R8,000 - R12,000",
      type: "Learnership",
      matches: "92% match",
      urgent: true,
      posted: "1 day ago",
      skills: ["Willing to Learn", "Teamwork", "Basic Construction"],
      industry: "Construction",
      description: "12-month learnership program with on-the-job training and classroom learning.",
      requirements: "Matric certificate, no experience required",
      category: "learnership",
      benefits: ["NQF Certification", "Stipend", "Mentorship", "Job Placement"]
    },
    {
      id: 4,
      title: "Logistics Learnership",
      company: "Imperial Logistics",
      logo: WareHouseProLogo,
      location: "Durban",
      salary: "R9,000 - R13,000",
      type: "Learnership",
      matches: "85% match",
      urgent: false,
      posted: "3 days ago",
      skills: ["Organization", "Basic Computer", "Communication"],
      industry: "Logistics",
      description: "18-month learnership in warehouse operations and logistics management.",
      requirements: "Grade 12, good communication skills",
      category: "learnership",
      benefits: ["Certificate", "Monthly Stipend", "Career Guidance"]
    },
    {
      id: 5,
      title: "Community Volunteer",
      company: "Soweto Hope Centre",
      logo: BuildRightLogo,
      location: "Soweto",
      salary: "Volunteer",
      type: "Volunteer",
      matches: "98% match",
      urgent: true,
      posted: "5 hours ago",
      skills: ["Empathy", "Communication", "Community Service"],
      industry: "Community",
      description: "Support community outreach programs and assist with daily operations in Soweto.",
      requirements: "Passion for community work, good interpersonal skills",
      category: "volunteer",
      benefits: ["Certificate", "Experience", "Networking", "Meals Provided"]
    },
    {
      id: 6,
      title: "Environmental Volunteer",
      company: "Greenpeace South Africa",
      logo: LogisticsSALogo,
      location: "Cape Town",
      salary: "Volunteer",
      type: "Volunteer",
      matches: "90% match",
      urgent: false,
      posted: "2 days ago",
      skills: ["Environmental Awareness", "Teamwork", "Physical Fitness"],
      industry: "Environment",
      description: "Participate in environmental conservation projects and community education.",
      requirements: "Interest in environmental issues, team player",
      category: "volunteer",
      benefits: ["Training", "Certificate", "Community Recognition"]
    },
    {
      id: 7,
      title: "Business Intern",
      company: "Vodacom South Africa",
      logo: CallComLogo,
      location: "Johannesburg",
      salary: "R10,000 - R15,000",
      type: "Internship",
      matches: "87% match",
      urgent: true,
      posted: "1 day ago",
      skills: ["Communication", "Office Skills", "Customer Service"],
      industry: "Business",
      description: "6-month internship in business operations and customer service.",
      requirements: "Recent graduate, good communication skills",
      category: "internship",
      benefits: ["Stipend", "Mentorship", "Potential Employment"]
    },
    {
      id: 8,
      title: "IT Support Intern",
      company: "Dimension Data",
      logo: ConstructionCoLogo,
      location: "Sandton",
      salary: "R12,000 - R18,000",
      type: "Internship",
      matches: "82% match",
      urgent: false,
      posted: "4 days ago",
      skills: ["Basic IT", "Problem Solving", "Communication"],
      industry: "Technology",
      description: "12-month internship providing IT support and learning technical skills.",
      requirements: "Basic computer knowledge, willingness to learn",
      category: "internship",
      benefits: ["Training", "Certificate", "Tech Equipment", "Mentorship"]
    }
  ];

  // Industries list
  const industries = [
    "All Industries",
    "Construction",
    "Logistics",
    "Customer Service",
    "Manufacturing",
    "Retail",
    "Hospitality",
    "Cleaning Services",
    "Security",
    "Driving/Delivery",
    "Agriculture",
    "Technology",
    "Healthcare",
    "Education",
    "Other"
  ];

  // Locations
  const locations = [
    "All Locations",
    "Johannesburg",
    "Soweto",
    "Cape Town",
    "Durban",
    "Pretoria",
    "Port Elizabeth",
    "Bloemfontein",
    "East London",
    "Nelspruit",
    "Polokwane",
    "Kimberley",
    "Remote",
    "Gauteng",
    "Western Cape",
    "KwaZulu-Natal",
    "Eastern Cape"
  ];

  // Salary ranges
  const salaryRanges = [
    "All Ranges",
    "R8,000 - R12,000",
    "R12,000 - R18,000",
    "R18,000 - R25,000",
    "R25,000 - R35,000",
    "R35,000+"
  ];

  // Availability options
  const availabilityOptions = [
    "All",
    "Immediate",
    "1-2 Weeks",
    "1 Month",
    "Flexible",
    "Part-time",
    "Weekends Only"
  ];

  // Job types
  const jobTypes = [
    "All Types",
    "Full-time",
    "Part-time",
    "Contract",
    "Temporary",
    "Freelance",
    "Remote",
    "Hybrid"
  ];

  // Job categories
  const jobCategories = [
    { id: "All", label: "All Opportunities", icon: Briefcase },
    { id: "job", label: "Available Jobs", icon: BriefcaseBusiness },
    { id: "learnership", label: "Learnerships", icon: GraduationCap },
    { id: "volunteer", label: "Volunteer Work", icon: HandHeart },
    { id: "internship", label: "Internships", icon: BookOpen }
  ];

  // Networking tips
  const networkingTips = [
    "Complete your profile with all skills and experiences to attract more South African employers",
    "Attend community events to boost your credibility score and network with local professionals",
    "Connect with verified South African recruiters directly through the Messages tab",
    "Share your journey and achievements to inspire others and build your reputation",
    "Regularly update your availability status in the Networking tab",
    "Apply to jobs that match at least 80% of your skills for better chances",
    "Follow up with employers 3-5 days after applying",
    "Join industry-specific groups to expand your professional network in South Africa",
    "Ask for recommendations from supervisors to strengthen your profile",
    "Stay active on the platform - South African employers notice engaged candidates",
    "Customize your application for each job - generic applications get overlooked",
    "Attend virtual career fairs and networking events regularly",
    "Update your skills regularly as you complete new training",
    "Be responsive to messages - quick replies show professionalism",
    "Build a portfolio of your work and achievements"
  ];

  // Filter jobs
  const filteredJobs = featuredJobs.filter(job => {
    if (selectedIndustry !== "All Industries" && job.industry !== selectedIndustry) return false;
    if (selectedLocation !== "All Locations" && job.location !== selectedLocation) return false;
    if (jobType !== "All Types" && job.type !== jobType) return false;
    if (showJobCategory !== "All" && job.category !== showJobCategory) return false;
    return true;
  });

  // Jobs by category
  const jobsByCategory = {
    job: filteredJobs.filter(job => job.category === "job"),
    learnership: filteredJobs.filter(job => job.category === "learnership"),
    volunteer: filteredJobs.filter(job => job.category === "volunteer"),
    internship: filteredJobs.filter(job => job.category === "internship")
  };

  const handleApplyForJob = (jobId) => {
    const job = featuredJobs.find(j => j.id === jobId);
    if (!job) return;
    
    if (jobsApplied.some(app => app.title === job.title)) {
      alert(`You've already applied for ${job.title} at ${job.company}.`);
      return;
    }
    
    const newApplication = {
      id: jobsApplied.length + 1,
      title: job.title,
      company: job.company,
      date: new Date().toLocaleDateString(),
      status: "applied"
    };
    
    setJobsApplied([newApplication, ...jobsApplied]);
    localStorage.setItem('relink_jobs_applied', JSON.stringify([newApplication, ...jobsApplied]));
    
    alert(`✅ Application submitted for ${job.title} at ${job.company}\nYou will be contacted by the employer within 48 hours.\nCheck your Applications in the Overview tab.`);
  };

  return (
    <div className="networking-tab">
      <div className="networking-header">
        <h3 className="section-title">
          <BriefcaseBusiness size={28} />
          <span>Find Your Next Opportunity</span>
        </h3>
        <p className="section-subtitle">Jobs tailored to your skills and experience in South Africa</p>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="filters-grid">
          <div className="filter-group">
            <label className="filter-label">
              <Filter size={16} />
              Industry
            </label>
            <select 
              className="filter-select"
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
            >
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label className="filter-label">
              <MapPin size={16} />
              Location
            </label>
            <select 
              className="filter-select"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label className="filter-label">
              <span className="salary-icon">R</span>
              Salary Range
            </label>
            <select 
              className="filter-select"
              value={salaryRange}
              onChange={(e) => setSalaryRange(e.target.value)}
            >
              {salaryRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label className="filter-label">
              <Calendar size={16} />
              Availability
            </label>
            <select 
              className="filter-select"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            >
              {availabilityOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label className="filter-label">
              <Briefcase size={16} />
              Job Type
            </label>
            <select 
              className="filter-select"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              {jobTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label className="filter-label">&nbsp;</label>
            <button 
              className="reset-filters-btn"
              onClick={() => {
                setSelectedIndustry("All Industries");
                setSelectedLocation("All Locations");
                setSalaryRange("All Ranges");
                setAvailability("All");
                setJobType("All Types");
                setShowJobCategory("All");
              }}
            >
              <X size={16} />
              <span>Reset All</span>
            </button>
          </div>
        </div>
      </div>

      {/* Job Categories Tabs */}
      <div className="category-tabs">
        {jobCategories.map(category => (
          <button
            key={category.id}
            className={`category-tab ${showJobCategory === category.id ? 'active' : ''}`}
            onClick={() => setShowJobCategory(category.id)}
          >
            <category.icon size={18} />
            <span>{category.label}</span>
            <span className="category-count">
              {category.id === 'All' ? filteredJobs.length : jobsByCategory[category.id]?.length || 0}
            </span>
          </button>
        ))}
      </div>

      {/* Jobs Grid */}
      <div className="jobs-section">
        <div className="jobs-header">
          <h4 className="jobs-title">
            {showJobCategory === 'All' ? 'All Opportunities' : jobCategories.find(c => c.id === showJobCategory)?.label}
            <span className="match-badge">{filteredJobs.length} matches</span>
          </h4>
          <div className="sort-options">
            <select className="sort-select">
              <option>Sort by: Best Match</option>
              <option>Sort by: Most Recent</option>
              <option>Sort by: Salary (High to Low)</option>
              <option>Sort by: Application Deadline</option>
            </select>
          </div>
        </div>
        
        {filteredJobs.length === 0 ? (
          <div className="no-jobs-found">
            <Briefcase size={48} />
            <h4>No opportunities found</h4>
            <p>Try adjusting your filters or check back later for new opportunities</p>
          </div>
        ) : (
          <div className="jobs-grid">
            {filteredJobs.map(job => (
              <div key={job.id} className="job-card">
                {job.urgent && (
                  <div className="urgent-badge">
                    <Zap size={12} />
                    <span>URGENT HIRING</span>
                  </div>
                )}
                
                <div className="job-header">
                  <div className="company-logo">
                    <img src={job.logo} alt={job.company} className="logo-img" />
                    {job.urgent && <div className="logo-glow"></div>}
                  </div>
                  <div className="job-main-info">
                    <div className="job-title-row">
                      <h4 className="job-title">{job.title}</h4>
                      <span className="job-category">{job.category}</span>
                    </div>
                    <p className="job-company">
                      <Building2 size={14} />
                      <span>{job.company}</span>
                    </p>
                    <div className="job-match">
                      <span className="match-score">{job.matches}</span>
                      <span className="job-type">{job.type}</span>
                    </div>
                  </div>
                </div>
                
                <div className="job-details">
                  <div className="detail-row">
                    <div className="detail-item">
                      <MapPin size={14} />
                      <span>{job.location}</span>
                    </div>
                    <div className="detail-item">
                      <span className="salary-icon">R</span>
                      <span>{job.salary}</span>
                    </div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-item">
                      <Clock size={14} />
                      <span>{job.type}</span>
                    </div>
                    <div className="detail-item">
                      <Calendar size={14} />
                      <span>{job.posted}</span>
                    </div>
                  </div>
                  
                  <div className="job-description">
                    <p>{job.description}</p>
                  </div>
                  
                  <div className="job-skills">
                    {job.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                  
                  {job.benefits && (
                    <div className="job-benefits">
                      <span className="benefits-label">Benefits:</span>
                      <div className="benefits-list">
                        {job.benefits.map((benefit, index) => (
                          <span key={index} className="benefit-tag">{benefit}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="job-footer">
                  <div className="job-requirements">
                    <span className="requirements-label">Requirements:</span>
                    <span className="requirements-text">{job.requirements}</span>
                  </div>
                  <div className="job-actions">
                    <button className="job-action-btn view">
                      <Eye size={16} />
                      <span>View Details</span>
                    </button>
                    <button 
                      className="job-action-btn apply"
                      onClick={() => handleApplyForJob(job.id)}
                    >
                      <SendHorizontal size={16} />
                      <span>Apply Now</span>
                    </button>
                    <button className="job-action-btn save">
                      <Bookmark size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Networking Tips */}
      <div className="networking-tips">
        <div className="tips-header">
          <h4 className="tips-title">
            <Megaphone size={20} />
            Professional Networking Tips for South Africa
          </h4>
          <button className="refresh-tips-btn" onClick={() => setNotifications(prev => prev + 1)}>
            <RefreshCw size={16} />
          </button>
        </div>
        <div className="tips-list">
          {networkingTips.map((tip, index) => (
            <div key={index} className="tip-item">
              <CheckCircle2 size={16} />
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Job Application Stats */}
      <div className="application-stats">
        <div className="stat-card">
          <div className="stat-card-icon">
            <Send size={24} />
          </div>
          <div className="stat-card-content">
            <span className="stat-card-number">{jobsApplied.length}</span>
            <span className="stat-card-label">Applications Sent</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">
            <Clock size={24} />
          </div>
          <div className="stat-card-content">
            <span className="stat-card-number">3</span>
            <span className="stat-card-label">Interviews Scheduled</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">
            <CheckCircle2 size={24} />
          </div>
          <div className="stat-card-content">
            <span className="stat-card-number">1</span>
            <span className="stat-card-label">Job Offers</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NetworkingTab;