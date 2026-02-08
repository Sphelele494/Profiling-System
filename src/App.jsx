import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RecruiterDashboard />} />
        <Route path="/find-candidates" element={<RecruiterDashboard />} />
        <Route path="/job-postings" element={<RecruiterDashboard />} />
        <Route path="/applications" element={<RecruiterDashboard />} />
        <Route path="/company-profile" element={<RecruiterDashboard />} />
        <Route path="/messages" element={<RecruiterDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;