import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import OverviewTab from '../components/tabs/OverviewTab';
import HomeTab from '../components/tabs/HomeTab';
import NetworkingTab from '../components/tabs/NetworkingTab';
import CommunityTab from '../components/tabs/CommunityTab';
import MessagesTab from '../components/tabs/MessagesTab';
import ProfileTab from '../components/tabs/ProfileTab';
import '../styles/hometab.css';  // CORRECT - goes up one level to src, then into styles

function Home() {
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState({
    name: "Thabo Mbeki",
    email: "thabo.mbeki@example.com",
    userType: "ex-convict",
    phone: "0821234567",
    idNumber: "9001015000089",
    dob: "1990-01-01",
    location: "Soweto, Johannesburg"
  });
  const [credibilityScore, setCredibilityScore] = useState(78);
  const [jobsApplied, setJobsApplied] = useState([]);

  useEffect(() => {
    // Load user data from localStorage
    const savedUser = localStorage.getItem('relink_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    // Load credibility score
    const savedScore = localStorage.getItem('relink_credibility_score');
    if (savedScore) {
      setCredibilityScore(parseInt(savedScore));
    }

    // Load jobs applied
    const savedJobsApplied = localStorage.getItem('relink_jobs_applied');
    if (savedJobsApplied) {
      setJobsApplied(JSON.parse(savedJobsApplied));
    } else {
      // Initialize with mock data
      const mockJobsApplied = [
        { id: 1, title: "Construction Supervisor", company: "BuildRight", date: "2024-02-10", status: "review" },
        { id: 2, title: "Warehouse Assistant", company: "Unitrans Logistics", date: "2024-02-08", status: "interview" },
        { id: 3, title: "Customer Service", company: "Vodacom", date: "2024-02-05", status: "applied" },
        { id: 4, title: "Driver", company: "Bidvest Steiner", date: "2024-02-03", status: "rejected" },
        { id: 5, title: "Retail Assistant", company: "Shoprite", date: "2024-02-01", status: "accepted" }
      ];
      setJobsApplied(mockJobsApplied);
      localStorage.setItem('relink_jobs_applied', JSON.stringify(mockJobsApplied));
    }
  }, []);

  const renderTab = () => {
    switch(activeTab) {
      case 'overview':
        return <OverviewTab 
          user={user} 
          credibilityScore={credibilityScore} 
          setCredibilityScore={setCredibilityScore} 
        />;
      case 'home':
        return <HomeTab user={user} />;
      case 'networking':
        return <NetworkingTab 
          user={user} 
          jobsApplied={jobsApplied} 
          setJobsApplied={setJobsApplied} 
        />;
      case 'community':
        return <CommunityTab 
          user={user} 
          credibilityScore={credibilityScore} 
          setCredibilityScore={setCredibilityScore} 
        />;
      case 'messages':
        return <MessagesTab user={user} />;
      case 'profile':
        return <ProfileTab 
          user={user} 
          setUser={setUser} 
          credibilityScore={credibilityScore} 
          setCredibilityScore={setCredibilityScore} 
        />;
      default:
        return <OverviewTab 
          user={user} 
          credibilityScore={credibilityScore} 
          setCredibilityScore={setCredibilityScore} 
        />;
    }
  };

  return (
    <MainLayout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
      user={user}
      setUser={setUser}
      credibilityScore={credibilityScore}
      setCredibilityScore={setCredibilityScore}
    >
      {renderTab()}
    </MainLayout>
  );
}

export default Home;