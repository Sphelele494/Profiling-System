import { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { verificationAPI } from '../services/verificationAPI';
import DocumentList from '../components/verification/DocumentList';
import DocumentUploadForm from '../components/verification/DocumentUploadForm';
import AdminDocumentCard from '../components/verification/AdminDocumentCard';

const VerificationDashboard = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId] = useState(1);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const data = await verificationAPI.getUserDocuments(userId);
      setDocuments(data);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const fetchAllDocuments = async () => {
    setLoading(true);
    try {
      const data = await verificationAPI.getAllDocuments();
      setDocuments(data);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (activeTab === 'user') fetchDocuments();
    else if (activeTab === 'admin') fetchAllDocuments();
  }, [activeTab]);

  const handleDelete = async (docId) => {
    if (!confirm('Delete?')) return;
    try {
      await verificationAPI.deleteDocument(docId);
      alert('Deleted!');
      fetchDocuments();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F0FDF4' }}>
      {/* Full-Width Green Header - NO LOGO HERE */}
      <div style={{
        backgroundColor: '#16A34A',
        color: '#FFFFFF',
        padding: '24px 0',
        width: '100%'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <FileText style={{ width: '32px', height: '32px' }} />
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
            Document Verification System
          </h1>
        </div>
      </div>

      {/* Tabs - On light green background */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 16px',
        marginTop: '24px'
      }}>
        <div style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '1px solid #BBF7D0'
        }}>
          {['user', 'upload', 'admin'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '12px 24px',
                fontWeight: '500',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab ? '3px solid #16A34A' : '3px solid transparent',
                color: activeTab === tab ? '#16A34A' : '#6B7280',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'all 0.3s'
              }}
            >
              {tab === 'user' ? 'My Documents' : tab === 'upload' ? 'Upload New' : 'Admin Panel'}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '32px 16px'
      }}>
        {activeTab === 'upload' && <DocumentUploadForm userId={userId} onSuccess={() => setActiveTab('user')} />}
        {activeTab === 'user' && <DocumentList documents={documents} loading={loading} onDelete={handleDelete} />}
        {activeTab === 'admin' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  border: '4px solid #16A34A',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  margin: '0 auto',
                  animation: 'spin 1s linear infinite'
                }}></div>
              </div>
            ) : (
              documents.map(doc => <AdminDocumentCard key={doc.docId} document={doc} onUpdate={fetchAllDocuments} />)
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationDashboard;