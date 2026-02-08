// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import VerificationDashboard from './pages/VerificationDashboard.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Login />} /> {/* Login/Sign in page */}
        <Route path="/register" element={<Register />} /> {/* Registration page */}
        <Route path="/documents" element={<VerificationDashboard />} /> {/* YOUR PART */}
      </Routes>
    </Router>
  );
}

export default App;