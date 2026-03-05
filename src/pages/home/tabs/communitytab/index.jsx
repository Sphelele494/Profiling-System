import React, { useState, useEffect } from 'react';
import { Users } from "lucide-react";

// Import hooks
import { useDocuments } from './hooks/useDocuments';
import { useEducation } from './hooks/useEducation';
import { useCredibility } from './hooks/useCredibility';
import { useGrants } from './hooks/useGrants';
import { useIntegration } from './hooks/useIntegration';
import { useEvents } from './hooks/useEvents';
import { useVolunteer } from './hooks/useVolunteer';
import { useMeetings } from './hooks/useMeetings';
import { useNotices } from './hooks/useNotices';

// Import components
import { StatusBar } from './components/StatusBar/StatusBar';
import { NotificationToast } from './components/Notifications/NotificationToast';
import { CommunityHeader } from './components/Header/CommunityHeader';
import { CredibilityScore } from './components/Credibility/CredibilityScore';
import { ScoreBreakdown } from './components/Credibility/ScoreBreakdown';
import { ScoreComparison } from './components/Credibility/ScoreComparison';
import { ScoreSuggestions } from './components/Credibility/ScoreSuggestions';
import { DocumentUpload } from './components/Documents/DocumentUpload';
import { DocumentList } from './components/Documents/DocumentList';
import { DocumentModal } from './components/Documents/DocumentModal';
import { VerificationModal } from './components/Documents/VerificationModal';
import { EducationSection } from './components/Education/EducationSection';
import { GrantsCard } from './components/Grants/GrantsCard';
import { IntegrationStatus } from './components/Integration/IntegrationStatus';
import { EventsCard } from './components/Events/EventsCard';
import { VolunteerCard } from './components/Volunteer/VolunteerCard';
import { MeetingsCard } from './components/Meetings/MeetingsCard';
import { NoticesCard } from './components/Notices/NoticesCard';
import { LoadingSpinner } from './components/Common/LoadingSpinner';
import { ErrorBoundary } from './components/Common/ErrorBoundary';

// Import styles
import "./components/styles/community.css";

function CommunityTab({ user, credibilityScore: externalScore, setCredibilityScore: externalSetScore }) {
  // ==================== STATE ====================
  const [activeTab, setActiveTab] = useState('documents');
  const [showScoreBreakdown, setShowScoreBreakdown] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showGrants, setShowGrants] = useState(false);
  const [showEvents, setShowEvents] = useState(true);
  const [showVolunteer, setShowVolunteer] = useState(true);
  const [showMeetings, setShowMeetings] = useState(true);
  const [showNotices, setShowNotices] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastSync, setLastSync] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState('normal');
  const [notifications, setNotifications] = useState([]);
  
  // ==================== ADD MISSING STATE ====================
  const [showQuiz, setShowQuiz] = useState(false);

  // ==================== EARLY RETURN IF NO USER ====================
  if (!user) {
    return (
      <div className="community-tab">
        <div className="auth-message">
          <Users size={48} />
          <h2>Please log in to access the Community tab</h2>
          <p>You need to be signed in to view your credibility score, documents, and community features.</p>
        </div>
      </div>
    );
  }

  // ==================== CUSTOM HOOKS WITH ERROR HANDLING ====================
  
  // Documents Hook
  let documentsHook;
  try {
    documentsHook = useDocuments({ 
      user, 
      setCredibilityScore: externalSetScore, 
      setNotifications, 
      setIsLoading 
    }) || {};
  } catch (err) {
    console.error('useDocuments hook failed:', err);
    setError(err.message);
    documentsHook = {};
  }

  const {
    referralType = '',
    setReferralType = () => {},
    referralDocuments = [],
    uploadingFile = false,
    uploadProgress = 0,
    searchTerm = '',
    setSearchTerm = () => {},
    filterStatus = 'all',
    setFilterStatus = () => {},
    sortBy = 'newest',
    setSortBy = () => {},
    selectedDocument = null,
    setSelectedDocument = () => {},
    showDocumentModal = false,
    setShowDocumentModal = () => {},
    showVerificationModal = false,
    setShowVerificationModal = () => {},
    verificationCode = '',
    setVerificationCode = () => {},
    referralTypes = [],
    documentHistory = [],
    handleDocumentUpload = () => {},
    handleDeleteDocument = () => {},
    verifyDocument = () => {},
    checkExpiredDocuments = () => {},
    getReferralPoints = () => 0,
    fileInputRef = { current: null }
  } = documentsHook;

  // Education Hook
  let educationHook;
  try {
    educationHook = useEducation({ 
      setCredibilityScore: externalSetScore, 
      setNotifications, 
      setIsLoading 
    }) || {};
  } catch (err) {
    console.error('useEducation hook failed:', err);
    educationHook = {};
  }

  const {
    educationSearchTerm = '',
    setEducationSearchTerm = () => {},
    educationCategory = 'all',
    setEducationCategory = () => {},
    enrolledCourses = [],
    courseProgress = {},
    bookmarkedCourses = [],
    certificateEarned = [],
    learningPath = null,
    showLearningPath = false,
    currentLesson = null,
    lessonProgress = 0,
    quizAnswers = {},
    quizScore = 0,
    selectedCourse = null,
    showCourseModal = false,
    setShowCourseModal = () => {},
    educationalPlatforms = [],
    educationCategories = [],
    courseLessons = [],
    courseQuizzes = [],
    learningPaths = [],
    handleEnrollCourse = () => {},
    handleBookmarkCourse = () => {},
    handleStartLesson = () => {},
    handleCompleteLesson = () => {},
    handleTakeQuiz = () => {},
    handleQuizAnswer = () => {},
    handleSubmitQuiz = () => {},
    handleFollowLearningPath = () => {}
  } = educationHook;

  // Credibility Hook
  let credibilityHook;
  try {
    credibilityHook = useCredibility({ 
      externalScore, 
      setCredibilityScore: externalSetScore 
    }) || {};
  } catch (err) {
    console.error('useCredibility hook failed:', err);
    credibilityHook = {};
  }

  const {
    credibilityScore = 0,
    credibilityMetrics = {},
    scoreSuggestions = [],
    getActionableSuggestions = () => [],
    completeSuggestion = () => {},
    calculateIndustryAverage = () => 0,
    getScoreComparison = () => ({})
  } = credibilityHook;

  // Grants Hook
  let grantsHook;
  try {
    grantsHook = useGrants({ setNotifications }) || {};
  } catch (err) {
    console.error('useGrants hook failed:', err);
    grantsHook = {};
  }

  const {
    governmentGrants = [],
    checkGrantEligibility = () => {},
    applyForGrant = () => {}
  } = grantsHook;

  // Integration Hook
  let integrationHook;
  try {
    integrationHook = useIntegration({ setNotifications, setIsLoading }) || {};
  } catch (err) {
    console.error('useIntegration hook failed:', err);
    integrationHook = {};
  }

  const {
    sapsStatus = 'unknown',
    dcsStatus = 'unknown',
    bankStatus = 'unknown',
    checkSAPSClearance = () => {},
    checkDCSStatus = () => {},
    verifyBankAccount = () => {}
  } = integrationHook;

  // Events Hook
  let eventsHook;
  try {
    eventsHook = useEvents({ 
      setCredibilityScore: externalSetScore, 
      setNotifications 
    }) || {};
  } catch (err) {
    console.error('useEvents hook failed:', err);
    eventsHook = {};
  }

  const {
    communityEvents = [],
    handleRSVP = () => {}
  } = eventsHook;

  // Volunteer Hook
  let volunteerHook;
  try {
    volunteerHook = useVolunteer({ setNotifications }) || {};
  } catch (err) {
    console.error('useVolunteer hook failed:', err);
    volunteerHook = {};
  }

  const {
    volunteerOpportunities = [],
    handleVolunteerSignup = () => {}
  } = volunteerHook;

  // Meetings Hook
  let meetingsHook;
  try {
    meetingsHook = useMeetings({ setNotifications }) || {};
  } catch (err) {
    console.error('useMeetings hook failed:', err);
    meetingsHook = {};
  }

  const {
    communityMeetings = [],
    handleMeetingRSVP = () => {}
  } = meetingsHook;

  // Notices Hook
  let noticesHook;
  try {
    noticesHook = useNotices() || {};
  } catch (err) {
    console.error('useNotices hook failed:', err);
    noticesHook = {};
  }

  const {
    communityNotices = []
  } = noticesHook;

  // ==================== EFFECTS ====================
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        setBatteryLevel(battery.level * 100);
        battery.addEventListener('levelchange', () => {
          setBatteryLevel(battery.level * 100);
        });
      }).catch(() => {
        // Battery API failed, use default
      });
    }

    const syncInterval = setInterval(() => {
      if (isOnline) {
        setLastSync(new Date());
      }
    }, 300000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(syncInterval);
    };
  }, [isOnline]);

  // ==================== HANDLERS ====================
  const addNotification = (message, type = 'info') => {
    const newNotification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    };
    setNotifications(prev => [newNotification, ...prev].slice(0, 5));
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  const increaseFontSize = () => {
    setFontSize(prev => {
      const sizes = ['small', 'normal', 'large', 'x-large'];
      const currentIndex = sizes.indexOf(prev);
      const nextIndex = (currentIndex + 1) % sizes.length;
      document.documentElement.style.fontSize = {
        'small': '14px',
        'normal': '16px',
        'large': '18px',
        'x-large': '20px'
      }[sizes[nextIndex]];
      return sizes[nextIndex];
    });
  };

  const syncData = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLastSync(new Date());
      addNotification('Sync completed successfully', 'success');
    } catch (error) {
      addNotification('Sync failed: ' + error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseQuiz = () => {
    setShowQuiz(false);
  };

  if (error) {
    return (
      <div className="community-tab error-state">
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Refresh Page</button>
      </div>
    );
  }

  return (
    <div className={`community-tab ${darkMode ? 'dark-mode' : ''}`}>
      {/* Status Bar */}
      <StatusBar
        isOnline={isOnline}
        batteryLevel={batteryLevel}
        isLoading={isLoading}
        lastSync={lastSync}
        darkMode={darkMode}
        fontSize={fontSize}
        onToggleDarkMode={toggleDarkMode}
        onIncreaseFontSize={increaseFontSize}
        onSync={syncData}
      />

      {/* Notifications */}
      <NotificationToast notifications={notifications} setNotifications={setNotifications} />

      {/* Header */}
      <CommunityHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area - WITH DEBUG BORDERS TO SEE COLUMNS */}
      <div className="community-content" style={{ 
        display: 'grid', 
        gridTemplateColumns: '300px 1fr 350px', 
        gap: '20px',
        padding: '20px',
        minHeight: '500px'
      }}>
        {/* Left Column - Credibility Dashboard */}
        <div className="left-column" style={{ 
          border: '2px solid blue', 
          padding: '10px',
          minHeight: '400px',
          backgroundColor: '#f0f8ff'
        }}>
          <h3 style={{margin: '0 0 10px 0', color: 'blue'}}>LEFT COLUMN</h3>
          <ErrorBoundary>
            <CredibilityScore
              credibilityScore={credibilityScore}
              referralDocuments={referralDocuments}
              onToggleBreakdown={() => setShowScoreBreakdown(!showScoreBreakdown)}
              onToggleComparison={() => setShowComparison(!showComparison)}
            />

            {showScoreBreakdown && (
              <ScoreBreakdown
                credibilityMetrics={credibilityMetrics}
                onClose={() => setShowScoreBreakdown(false)}
              />
            )}

            {showComparison && (
              <ScoreComparison
                credibilityScore={credibilityScore}
                industryAverage={calculateIndustryAverage()}
                comparison={getScoreComparison()}
                onClose={() => setShowComparison(false)}
              />
            )}

            {showSuggestions && (
              <ScoreSuggestions
                suggestions={getActionableSuggestions()}
                onComplete={completeSuggestion}
              />
            )}

            {showGrants && (
              <GrantsCard
                grants={governmentGrants}
                onCheckEligibility={checkGrantEligibility}
                onApply={applyForGrant}
                onClose={() => setShowGrants(false)}
              />
            )}
          </ErrorBoundary>
        </div>

        {/* Middle Column - Documents & Verification OR Education */}
        <div className="middle-column" style={{ 
          border: '2px solid green', 
          padding: '10px',
          minHeight: '400px',
          backgroundColor: '#f0fff0'
        }}>
          <h3 style={{margin: '0 0 10px 0', color: 'green'}}>MIDDLE COLUMN</h3>
          <ErrorBoundary>
            {activeTab === 'documents' && (
              <>
                <DocumentUpload
                  referralTypes={referralTypes}
                  selectedType={referralType}
                  onSelectType={setReferralType}
                  onUpload={handleDocumentUpload}
                  uploadingFile={uploadingFile}
                  uploadProgress={uploadProgress}
                  fileInputRef={fileInputRef}
                />

                <DocumentList
                  documents={referralDocuments}
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  filterStatus={filterStatus}
                  onFilterChange={setFilterStatus}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  onDocumentClick={(doc) => {
                    setSelectedDocument(doc);
                    setShowDocumentModal(true);
                  }}
                  onVerifyClick={(doc) => {
                    setSelectedDocument(doc);
                    setShowVerificationModal(true);
                  }}
                  onShare={(doc) => addNotification(`Shared ${doc.name}`, 'info')}
                  checkExpiredDocuments={checkExpiredDocuments}
                />
              </>
            )}

            {activeTab === 'education' && (
              <EducationSection
                educationSearchTerm={educationSearchTerm}
                onSearchChange={setEducationSearchTerm}
                educationCategory={educationCategory}
                onCategoryChange={setEducationCategory}
                enrolledCourses={enrolledCourses}
                courseProgress={courseProgress}
                bookmarkedCourses={bookmarkedCourses}
                certificateEarned={certificateEarned}
                learningPath={learningPath}
                showLearningPath={showLearningPath}
                currentLesson={currentLesson}
                lessonProgress={lessonProgress}
                showQuiz={showQuiz}
                quizAnswers={quizAnswers}
                quizScore={quizScore}
                selectedCourse={selectedCourse}
                showCourseModal={showCourseModal}
                educationalPlatforms={educationalPlatforms}
                educationCategories={educationCategories}
                courseLessons={courseLessons}
                courseQuizzes={courseQuizzes}
                learningPaths={learningPaths}
                onEnroll={handleEnrollCourse}
                onBookmark={handleBookmarkCourse}
                onStartLesson={handleStartLesson}
                onCompleteLesson={handleCompleteLesson}
                onTakeQuiz={handleTakeQuiz}
                onQuizAnswer={handleQuizAnswer}
                onSubmitQuiz={handleSubmitQuiz}
                onFollowPath={handleFollowLearningPath}
                onCloseCourseModal={() => setShowCourseModal(false)}
                onCloseQuiz={handleCloseQuiz}
              />
            )}
          </ErrorBoundary>
        </div>

        {/* Right Column - Integration & Community */}
        <div className="right-column" style={{ 
          border: '2px solid red', 
          padding: '10px',
          minHeight: '400px',
          backgroundColor: '#fff0f0'
        }}>
          <h3 style={{margin: '0 0 10px 0', color: 'red'}}>RIGHT COLUMN</h3>
          <ErrorBoundary>
            <IntegrationStatus
              sapsStatus={sapsStatus}
              dcsStatus={dcsStatus}
              bankStatus={bankStatus}
              onCheckSAPS={checkSAPSClearance}
              onCheckDCS={checkDCSStatus}
              onVerifyBank={verifyBankAccount}
              isLoading={isLoading}
            />

            {showEvents && (
              <EventsCard
                events={communityEvents}
                onRSVP={handleRSVP}
                onClose={() => setShowEvents(false)}
              />
            )}

            {showVolunteer && (
              <VolunteerCard
                opportunities={volunteerOpportunities}
                onSignup={handleVolunteerSignup}
                onClose={() => setShowVolunteer(false)}
              />
            )}

            {showMeetings && (
              <MeetingsCard
                meetings={communityMeetings}
                onRSVP={handleMeetingRSVP}
                onClose={() => setShowMeetings(false)}
              />
            )}

            {showNotices && (
              <NoticesCard
                notices={communityNotices}
                onClose={() => setShowNotices(false)}
              />
            )}
          </ErrorBoundary>
        </div>
      </div>

      {/* Modals */}
      {showDocumentModal && selectedDocument && (
        <DocumentModal
          document={selectedDocument}
          documentHistory={documentHistory}
          onClose={() => setShowDocumentModal(false)}
          onDelete={() => {
            handleDeleteDocument(selectedDocument.id);
            setShowDocumentModal(false);
          }}
          onShare={() => addNotification(`Shared ${selectedDocument.name}`, 'info')}
          onPrint={() => window.print()}
        />
      )}

      {showVerificationModal && selectedDocument && (
        <VerificationModal
          document={selectedDocument}
          verificationCode={verificationCode}
          onCodeChange={setVerificationCode}
          onVerify={() => {
            verifyDocument(selectedDocument.id, verificationCode);
            setShowVerificationModal(false);
            setVerificationCode('');
          }}
          onClose={() => {
            setShowVerificationModal(false);
            setVerificationCode('');
          }}
        />
      )}

      {/* Loading Overlay */}
      {isLoading && <LoadingSpinner />}
    </div>
  );
}

export default CommunityTab;