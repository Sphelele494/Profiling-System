import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// User Pages
import UserDashboard from "./components/user/UserDashboard";
import MyProfile from "./components/user/MyProfile";
import Timeline from "./components/user/Timeline";
import Referrals from "./components/user/Referrals";
import JobOpportunities from "./components/user/JobOpportunites";
import Mentors from "./components/user/Mentors";
import Learning from "./components/user/Learning";
import UserMessages from "./components/user/Messages";

// Recruiter Pages
import RecruiterDashboard from "./components/user/RecruiterDashboard";
import FindCandidates from "./components/recruiter/FindCandidates";
import JobPostings from "./components/recruiter/JobPostings";
import Applications from "./components/recruiter/Applications";
import CompanyProfile from "./components/recruiter/CompanyProfile";
import RecruiterMessages from "./components/recruiter/Messages";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Root redirect to user dashboard */}
          <Route path="/" element={<Navigate to="/user/dashboard" replace />} />
          
          {/* User Routes */}
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/profile" element={<MyProfile />} />
          <Route path="/user/timeline" element={<Timeline />} />
          <Route path="/user/referrals" element={<Referrals />} />
          <Route path="/user/jobs" element={<JobOpportunities />} />
          <Route path="/user/mentors" element={<Mentors />} />
          <Route path="/user/learning" element={<Learning />} />
          <Route path="/user/messages" element={<UserMessages />} />
          
          {/* Recruiter Routes */}
          <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
          <Route path="/recruiter/candidates" element={<FindCandidates />} />
          <Route path="/recruiter/jobs" element={<JobPostings />} />
          <Route path="/recruiter/applications" element={<Applications />} />
          <Route path="/recruiter/profile" element={<CompanyProfile />} />
          <Route path="/recruiter/messages" element={<RecruiterMessages />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
