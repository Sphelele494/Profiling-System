import React from 'react';
import Layout from '../shared/Layout';
import StatCard from '../shared/StatCard';
import ProfileCompletion from '../user/ProfileCompletion';
import CredibilityScore from '../user/CredibilityScore';
import RecentActivity from '../user/RecentActivity';
import RecommendedJobs from '../user/RecommendedJobs';
import { Star, Eye, Award, Briefcase } from 'lucide-react';
import { 
  userStats, 
  userProfileCompletion, 
  credibilityBreakdown, 
  recentActivity, 
  recommendedJobs 
} from '../data/mockData';

// TODO: Replace with actual API calls
// import { API_ENDPOINTS } from './data/mockData';
// const fetchUserData = async () => {
//   const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}${API_ENDPOINTS.getUserStats}`);
//   return response.json();
// };

const UserDashboard = () => {
  return (
    <Layout userType="user" userName="Marcus Johnson" userEmail="marcus.email.com">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="dashboard-title">Dashboard</h1>
          <p className="text-gray-600">Welcome back, Marcus!</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Credibility Score"
            value={userStats.credibilityScore}
            change={userStats.credibilityChange}
            icon={Star}
            iconBgColor="bg-blue-50"
            iconColor="text-blue-600"
          />
          <StatCard
            title="Profile Views"
            value={userStats.profileViews}
            change={userStats.profileViewsChange}
            icon={Eye}
            iconBgColor="bg-cyan-50"
            iconColor="text-cyan-600"
          />
          <StatCard
            title="Verified Referrals"
            value={userStats.verifiedReferrals}
            change={userStats.verifiedReferralsPending}
            icon={Award}
            iconBgColor="bg-purple-50"
            iconColor="text-purple-600"
          />
          <StatCard
            title="Job Applications"
            value={userStats.jobApplications}
            change={userStats.jobApplicationsInReview}
            icon={Briefcase}
            iconBgColor="bg-emerald-50"
            iconColor="text-emerald-600"
          />
        </div>
        
        {/* Profile Completion and Credibility Score */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProfileCompletion data={userProfileCompletion} />
          <CredibilityScore score={userStats.credibilityScore} breakdown={credibilityBreakdown} />
        </div>
        
        {/* Recent Activity and Recommended Jobs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivity activities={recentActivity} />
          <RecommendedJobs jobs={recommendedJobs} />
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
