import React from 'react';
import { 
  Award, Calendar, X, Download, Mail, Printer, 
  CheckCircle, Lightbulb, Sparkles, Target, Rocket, 
  BarChart3, ArrowUpRight 
} from 'lucide-react';
import './Modals.css';

export const ReportModal = ({ 
  reportData, 
  onClose, 
  showTemporaryMessage, 
  completeTask, 
  updateGoalProgress 
}) => {
  const downloadReport = () => {
    const reportText = `
      RE-LINK MONTHLY PROGRESS REPORT
      ================================
      Month: ${reportData.month}
      
      OVERVIEW
      --------
      Credibility Score Change: ${reportData.overview.scoreChange}
      Applications: ${reportData.overview.applicationsChange}
      Profile Views: ${reportData.overview.viewsChange}
      Connections: ${reportData.overview.connectionsChange}
      Interviews: ${reportData.overview.interviewsChange}
      
      STATISTICS
      ----------
      Applications Sent: ${reportData.statistics.applicationsSent}
      Interviews Attended: ${reportData.statistics.interviewsAttended}
      Messages Exchanged: ${reportData.statistics.messagesExchanged}
      Profile Views: ${reportData.statistics.profileViews}
      Connections Made: ${reportData.statistics.connections}
      
      ACHIEVEMENTS
      ------------
      ${reportData.achievements.map(a => `✓ ${a}`).join('\n')}
      
      RECOMMENDATIONS
      ---------------
      ${reportData.recommendations.map(r => `• ${r}`).join('\n')}
      
      NEXT MONTH GOALS
      ----------------
      ${reportData.nextMonthGoals.map(g => `→ ${g}`).join('\n')}
      
      Generated on: ${new Date().toLocaleDateString()}
    `;
    
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RE-Link_Report_${reportData.month.replace(' ', '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showTemporaryMessage('Report downloaded successfully');
  };

  const emailReport = () => {
    window.location.href = `mailto:?subject=RE-Link Monthly Report ${reportData.month}&body=Please find attached my monthly progress report from RE-Link.`;
    showTemporaryMessage('Email client opened');
  };

  const printReport = () => {
    window.print();
  };

  return (
    <div className="report-modal-overlay" onClick={onClose}>
      <div className="report-modal" onClick={e => e.stopPropagation()}>
        <div className="report-modal-header">
          <div className="report-title">
            <Award size={24} color="#10b981" />
            <h3>Monthly Progress Report</h3>
          </div>
          <button className="close-modal-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="report-content">
          <div className="report-period">
            <Calendar size={16} />
            <span>{reportData.month}</span>
          </div>

          <div className="report-stats-grid">
            <div 
              className="report-stat-card" 
              onClick={() => showTemporaryMessage('Score trend: +5% this month')}
            >
              <span className="report-stat-label">Score Change</span>
              <div className="report-stat-value positive">
                <ArrowUpRight size={20} />
                <span>{reportData.overview.scoreChange}</span>
              </div>
            </div>
            <div 
              className="report-stat-card" 
              onClick={() => showTemporaryMessage('Applications: 12 total')}
            >
              <span className="report-stat-label">Applications</span>
              <div className="report-stat-value positive">
                <ArrowUpRight size={20} />
                <span>{reportData.overview.applicationsChange}</span>
              </div>
            </div>
            <div 
              className="report-stat-card" 
              onClick={() => showTemporaryMessage('Views: 124 total')}
            >
              <span className="report-stat-label">Profile Views</span>
              <div className="report-stat-value positive">
                <ArrowUpRight size={20} />
                <span>{reportData.overview.viewsChange}</span>
              </div>
            </div>
            <div 
              className="report-stat-card" 
              onClick={() => showTemporaryMessage('Connections: 18 total')}
            >
              <span className="report-stat-label">Connections</span>
              <div className="report-stat-value positive">
                <ArrowUpRight size={20} />
                <span>{reportData.overview.connectionsChange}</span>
              </div>
            </div>
          </div>

          <div className="report-section">
            <h4 onClick={() => showTemporaryMessage('Your key achievements this month')}>
              <span role="img" aria-label="star">⭐</span>
              Key Achievements
            </h4>
            <div className="achievements-list">
              {reportData.achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className="achievement-item" 
                  onClick={() => showTemporaryMessage('Achievement unlocked!')}
                >
                  <CheckCircle size={16} color="#10b981" />
                  <span>{achievement}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="report-section">
            <h4 onClick={() => showTemporaryMessage('Personalized recommendations')}>
              <Lightbulb size={18} color="#3b82f6" />
              Recommendations
            </h4>
            <div className="recommendations-list">
              {reportData.recommendations.map((rec, index) => (
                <div 
                  key={index} 
                  className="recommendation-item" 
                  onClick={() => completeTask(index + 1)}
                >
                  <Sparkles size={16} color="#3b82f6" />
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="report-section">
            <h4 onClick={() => showTemporaryMessage('Set your goals for next month')}>
              <Target size={18} color="#8b5cf6" />
              Next Month Goals
            </h4>
            <div className="goals-list">
              {reportData.nextMonthGoals.map((goal, index) => (
                <div 
                  key={index} 
                  className="goal-item" 
                  onClick={() => updateGoalProgress(index + 1, 50)}
                >
                  <Rocket size={16} color="#8b5cf6" />
                  <span>{goal}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="report-section">
            <h4 onClick={() => showTemporaryMessage('Your activity statistics')}>
              <BarChart3 size={18} color="#10b981" />
              Statistics
            </h4>
            <div className="statistics-grid">
              <div 
                className="stat-item" 
                onClick={() => showTemporaryMessage('Applications sent')}
              >
                <span className="stat-label">Applications Sent</span>
                <span className="stat-value">{reportData.statistics.applicationsSent}</span>
              </div>
              <div 
                className="stat-item" 
                onClick={() => showTemporaryMessage('Interviews attended')}
              >
                <span className="stat-label">Interviews</span>
                <span className="stat-value">{reportData.statistics.interviewsAttended}</span>
              </div>
              <div 
                className="stat-item" 
                onClick={() => showTemporaryMessage('Messages exchanged')}
              >
                <span className="stat-label">Messages</span>
                <span className="stat-value">{reportData.statistics.messagesExchanged}</span>
              </div>
              <div 
                className="stat-item" 
                onClick={() => showTemporaryMessage('Profile views')}
              >
                <span className="stat-label">Profile Views</span>
                <span className="stat-value">{reportData.statistics.profileViews}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="report-modal-footer">
          <button className="download-report-btn" onClick={downloadReport}>
            <Download size={18} />
            <span>Download</span>
          </button>
          <button className="email-report-btn" onClick={emailReport}>
            <Mail size={18} />
            <span>Email</span>
          </button>
          <button className="print-report-btn" onClick={printReport}>
            <Printer size={18} />
            <span>Print</span>
          </button>
        </div>
      </div>
    </div>
  );
};