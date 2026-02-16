import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  Clock, 
  Users, 
  Briefcase, 
  GraduationCap, 
  BookOpen, 
  MessageSquare,
  Search,
  FileText,
  ClipboardList,
  Building2,
  Link as LinkIcon
} from 'lucide-react';

const Sidebar = ({ userType, userName, userEmail }) => {
  const location = useLocation();
  
  const userNavItems = [
    { name: 'Dashboard', path: '/user/dashboard', icon: LayoutDashboard },
    { name: 'My Profile', path: '/user/profile', icon: User },
    { name: 'Timeline', path: '/user/timeline', icon: Clock },
    { name: 'Referrals', path: '/user/referrals', icon: Users },
    { name: 'Job Opportunities', path: '/user/jobs', icon: Briefcase },
    { name: 'Mentors', path: '/user/mentors', icon: GraduationCap },
    { name: 'Learning', path: '/user/learning', icon: BookOpen },
    { name: 'Messages', path: '/user/messages', icon: MessageSquare }
  ];
  
  const recruiterNavItems = [
    { name: 'Dashboard', path: '/recruiter/dashboard', icon: LayoutDashboard },
    { name: 'Find Candidates', path: '/recruiter/candidates', icon: Search },
    { name: 'Job Postings', path: '/recruiter/jobs', icon: Briefcase },
    { name: 'Applications', path: '/recruiter/applications', icon: ClipboardList },
    { name: 'Company Profile', path: '/recruiter/profile', icon: Building2 },
    { name: 'Messages', path: '/recruiter/messages', icon: MessageSquare }
  ];
  
  const navItems = userType === 'user' ? userNavItems : recruiterNavItems;
  
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link to={userType === 'user' ? '/user/dashboard' : '/recruiter/dashboard'} className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <LinkIcon className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">ReLink</span>
        </Link>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              data-testid={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-emerald-50 text-emerald-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
            <p className="text-xs text-gray-500 truncate">{userEmail}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
