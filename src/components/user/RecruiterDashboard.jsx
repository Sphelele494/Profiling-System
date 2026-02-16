import React from 'react';
import Layout from '../shared/Layout';
import StatCard from '../shared/StatCard';
import ActionCards from '../recruiter/ActionCards';
import RecentApplications from '../recruiter/RecentApplications';
import TopCandidates from '../recruiter/TopCandidates';
import { Briefcase, ClipboardList, Eye, UserCheck } from 'lucide-react';
import { 
  recruiterStats, 
  recentApplications, 
  topCandidates 
} from '../data/mockData';

// TODO: Replace with actual API calls
// import { API_ENDPOINTS } from './data/mockData';
// const fetchRecruiterData = async () => {
//   const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}${API_ENDPOINTS.getRecruiterStats}`);
//   return response.json();
// };

const RecruiterDashboard = () => {
  return (
    <Layout userType="recruiter" userName="Sarah Chen" userEmail="sarah.techcoop.com">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="dashboard-title">Recruiter Dashboard</h1>
          <p className="text-gray-600">Welcome back, Sarah!</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Active Job Postings"
            value={recruiterStats.activeJobPostings}
            change={recruiterStats.activeJobPostingsChange}
            icon={Briefcase}
            iconBgColor="bg-blue-50"
            iconColor="text-blue-600"
          />
          <StatCard
            title="Total Applications"
            value={recruiterStats.totalApplications}
            change={recruiterStats.totalApplicationsChange}
            icon={ClipboardList}
            iconBgColor="bg-cyan-50"
            iconColor="text-cyan-600"
          />
          <StatCard
            title="Candidates Viewed"
            value={recruiterStats.candidatesViewed}
            change={recruiterStats.candidatesViewedChange}
            icon={Eye}
            iconBgColor="bg-purple-50"
            iconColor="text-purple-600"
          />
          <StatCard
            title="Successful Hires"
            value={recruiterStats.successfulHires}
            change={recruiterStats.successfulHiresChange}
            icon={UserCheck}
            iconBgColor="bg-emerald-50"
            iconColor="text-emerald-600"
          />
        </div>
        
        {/* Action Cards */}
        <ActionCards />
        
        {/* Recent Applications and Top Candidates */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentApplications applications={recentApplications} />
          <TopCandidates candidates={topCandidates} />
        </div>
      </div>
    </Layout>
  );
};

export default RecruiterDashboard;
