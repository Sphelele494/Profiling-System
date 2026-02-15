import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import UserRecruiterRegistration from './pages/UserRecruiterRegistration';
import RecruiterRegister from './pages/RecruiterRegister';
import Register from './pages/Register';
import Home from './pages/Home';
import './styles/main.css';


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Landing Page - Starting Point */}
        <Route path="/" element={<LandingPage/>}/>
        
        {/* Login Page */}
        <Route path="/login" element={<Login/>}/>
        
        {/* Registration Choice Page - Where users choose Job Seeker or Recruiter */}
        <Route path="/register-choice" element={<UserRecruiterRegistration/>}/>
        
        {/* Job Seeker Registration */}
        <Route path="/register" element={<Register/>}/>
        
        {/* Recruiter Registration */}
        <Route path="/recruiter-register" element={<RecruiterRegister/>}/>
        
        {/* Home Page - After successful registration/login */}
        <Route path="/home" element={<Home/>}/>
        
        {/* Redirect any unknown routes to landing page */}
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
    </Router>
  );
}

export default App;