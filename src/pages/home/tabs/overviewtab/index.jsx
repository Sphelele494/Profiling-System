import React, { useState, useEffect } from 'react';
import { BarChart3 } from "lucide-react";

// Import hooks
import { useAppointments } from './hooks/useAppointments';
import { useJobs } from './hooks/useJobs';
import { useProgress } from './hooks/useProgress';
import { useCredibility } from './hooks/useCredibility';
import { useNotifications } from './hooks/useNotifications';

// Import components
import { OverviewHeader } from './components/Header/OverviewHeader';
import { QuickStatsGrid } from './components/QuickStats/QuickStatsGrid';
import { CredibilityScore } from './components/Credibility/CredibilityScore';
import { AppointmentsCard } from './components/Appointments/AppointmentsCard';
import { JobsAppliedCard } from './components/Jobs/JobsAppliedCard';
import { ProgressTracker } from './components/Progress/ProgressTracker';
import { AchievementsGrid } from './components/Achievements/AchievementsGrid';
import { SuggestionsCard } from './components/Suggestions/SuggestionsCard';
import { RecentActivity } from './components/Activity/RecentActivity';
import { WeeklySummary } from './components/Activity/WeeklySummary';
import { ReportModal } from './components/Modals/ReportModal';
import { LoadingSpinner } from './components/Common/LoadingSpinner';
import { SuccessToast } from './components/Common/SuccessToast';

// Import styles
import './styles/overview.css';

function OverviewTab({ user, credibilityScore: externalScore, setCredibilityScore: externalSetScore }) {
  // ==================== STATE ====================
  const [selectedTimeRange, setSelectedTimeRange] = useState('month');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // ==================== CUSTOM HOOKS ====================
  const { appointments, handleAddAppointment, handleUpdateAppointment, handleDeleteAppointment, handleAppointmentStatus, handleSetReminder } = useAppointments(setSuccessMessage);
  const { jobsApplied, handleWithdrawApplication, handleSaveJob, handleShareJob } = useJobs(setSuccessMessage);
  const { quickStats, userProgress, weeklyActivity, achievements, goals, improvementSuggestions, updateProgress, completeTask, updateGoalProgress } = useProgress(setSuccessMessage);
  const { credibilityScore, credibilityMetrics, refreshCredibilityScore, calculatePotentialScore } = useCredibility(externalScore, externalSetScore, setSuccessMessage, setIsLoading);
  const { notifications, markNotificationAsRead, markAllNotificationsRead, clearNotifications } = useNotifications();

  // ==================== HANDLERS ====================
  const showTemporaryMessage = (message, type = 'success') => {
    setSuccessMessage({ text: message, type });
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const generateMonthlyReport = () => {
    setIsLoading(true);
    setTimeout(() => {
      const report = {
        month: new Date().toLocaleString('default', { month: 'long', year: 'numeric' }),
        overview: {
          scoreChange: "+5",
          applicationsChange: "+12",
          viewsChange: "+18",
          connectionsChange: "+8",
          interviewsChange: "+25"
        },
        achievements: [
          "Reached 85% profile completion",
          "Successfully completed rehabilitation program",
          "Got interview with Unitrans Logistics",
          "Attended 3 community events",
          "Uploaded 2 verified documents"
        ],
        recommendations: [
          "Focus on skill development (currently at 60%)",
          "Apply to more construction positions",
          "Complete digital literacy course",
          "Connect with 5 more employers"
        ],
        nextMonthGoals: [
          "Increase credibility score to 85",
          "Secure job placement",
          "Attend 5 networking events",
          "Upload 2 more certificates",
          "Complete mentorship program"
        ],
        statistics: {
          applicationsSent: 12,
          interviewsAttended: 3,
          messagesExchanged: 48,
          profileViews: 124,
          connections: 18
        }
      };
      setReportData(report);
      setShowReportModal(true);
      setIsLoading(false);
    }, 1000);
  };

  const getFilteredJobs = () => {
    let filtered = jobsApplied;
    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (activeFilter !== 'all') {
      filtered = filtered.filter(job => job.status === activeFilter);
    }
    return filtered;
  };

  const getFilteredAppointments = () => {
    let filtered = appointments;
    if (searchTerm) {
      filtered = filtered.filter(apt => 
        apt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (activeFilter !== 'all') {
      filtered = filtered.filter(apt => apt.status === activeFilter);
    }
    return filtered;
  };

  return (
    <div className="overview-tab">
      {/* Success Message Toast */}
      <SuccessToast message={successMessage} />

      {/* Loading Overlay */}
      {isLoading && <LoadingSpinner />}

      {/* Header */}
      <OverviewHeader
        user={user}
        selectedTimeRange={selectedTimeRange}
        setSelectedTimeRange={setSelectedTimeRange}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        notifications={notifications}
        markAllNotificationsRead={markAllNotificationsRead}
        clearNotifications={clearNotifications}
        generateMonthlyReport={generateMonthlyReport}
        isLoading={isLoading}
        showTemporaryMessage={showTemporaryMessage}
      />

      {/* Report Modal */}
      {showReportModal && reportData && (
        <ReportModal
          reportData={reportData}
          onClose={() => setShowReportModal(false)}
          showTemporaryMessage={showTemporaryMessage}
          completeTask={completeTask}
          updateGoalProgress={updateGoalProgress}
        />
      )}

      {/* Quick Stats Grid */}
      <QuickStatsGrid quickStats={quickStats} showTemporaryMessage={showTemporaryMessage} />

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Credibility Score */}
        <CredibilityScore
          credibilityScore={credibilityScore}
          credibilityMetrics={credibilityMetrics}
          refreshCredibilityScore={refreshCredibilityScore}
          calculatePotentialScore={calculatePotentialScore}
          isLoading={isLoading}
          showTemporaryMessage={showTemporaryMessage}
        />

        {/* Appointments Card */}
        <AppointmentsCard
          appointments={appointments}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          getFilteredAppointments={getFilteredAppointments}
          onAddAppointment={handleAddAppointment}
          onUpdateAppointment={handleUpdateAppointment}
          onDeleteAppointment={handleDeleteAppointment}
          onStatusChange={handleAppointmentStatus}
          onSetReminder={handleSetReminder}
          showTemporaryMessage={showTemporaryMessage}
        />

        {/* Jobs Applied Card */}
        <JobsAppliedCard
          jobsApplied={jobsApplied}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          getFilteredJobs={getFilteredJobs}
          onWithdraw={handleWithdrawApplication}
          onSave={handleSaveJob}
          onShare={handleShareJob}
          showTemporaryMessage={showTemporaryMessage}
        />

        {/* Progress Tracker */}
        <ProgressTracker
          userProgress={userProgress}
          goals={goals}
          onUpdateProgress={updateProgress}
          onUpdateGoal={updateGoalProgress}
          showTemporaryMessage={showTemporaryMessage}
        />

        {/* Achievements Grid */}
        <AchievementsGrid achievements={achievements} showTemporaryMessage={showTemporaryMessage} />

        {/* Suggestions Card */}
        <SuggestionsCard
          suggestions={improvementSuggestions}
          onCompleteTask={completeTask}
          showTemporaryMessage={showTemporaryMessage}
        />
      </div>

      {/* Recent Activity */}
      <RecentActivity showTemporaryMessage={showTemporaryMessage} />

      {/* Weekly Summary */}
      <WeeklySummary weeklyActivity={weeklyActivity} showTemporaryMessage={showTemporaryMessage} />
    </div>
  );
}

export default OverviewTab;