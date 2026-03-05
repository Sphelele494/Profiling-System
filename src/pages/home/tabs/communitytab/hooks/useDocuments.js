import { useState, useRef } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useDocuments({ user, setCredibilityScore, setNotifications, setIsLoading }) {
  const [referralType, setReferralType] = useState('employer');
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  
  const fileInputRef = useRef(null);

  const [referralDocuments, setReferralDocuments] = useLocalStorage('relink_documents', [
    { 
      id: 1, 
      name: "Police Clearance Certificate.pdf", 
      type: "clearance", 
      date: "2024-02-10", 
      status: "verified", 
      points: 30, 
      size: "2.5 MB",
      verifiedBy: "SAPS Verification System",
      verifiedDate: "2024-02-11",
      expiryDate: "2025-02-10",
      version: 1,
      hash: "0x7d3a...f2b1",
      ocrText: "Police Clearance Certificate...",
      tags: ["clearance", "saps", "verified"],
      comments: []
    },
    { 
      id: 2, 
      name: "Rehabilitation Certificate.jpg", 
      type: "rehab", 
      date: "2024-02-05", 
      status: "verified", 
      points: 20, 
      size: "1.8 MB",
      verifiedBy: "DCS Verification",
      verifiedDate: "2024-02-06",
      expiryDate: "2025-02-05",
      version: 1,
      hash: "0x9f4c...e3d2",
      ocrText: "Rehabilitation Completion Certificate...",
      tags: ["rehab", "dcs", "verified"],
      comments: []
    },
    { 
      id: 3, 
      name: "Previous Employer Reference.pdf", 
      type: "employer", 
      date: "2024-02-01", 
      status: "pending", 
      points: 15, 
      size: "3.2 MB",
      version: 1,
      hash: "0x2b5a...c7d8",
      tags: ["employer", "pending"],
      comments: []
    }
  ]);

  const [documentHistory, setDocumentHistory] = useLocalStorage('relink_document_history', [
    { docId: 1, version: 1, date: "2024-02-10", action: "upload", user: "Thabo M." },
    { docId: 1, version: 2, date: "2024-02-11", action: "verify", user: "SAPS System" },
    { docId: 2, version: 1, date: "2024-02-05", action: "upload", user: "Thabo M." },
    { docId: 2, version: 2, date: "2024-02-06", action: "verify", user: "DCS System" }
  ]);

  const referralTypes = [
    { id: 'employer', label: 'Employer', icon: 'Briefcase', points: 15 },
    { id: 'rehab', label: 'Rehabilitation', icon: 'HandHeart', points: 20 },
    { id: 'police', label: 'Police Clearance', icon: 'Shield', points: 25 },
    { id: 'community', label: 'Community Leader', icon: 'Users', points: 10 },
    { id: 'volunteer', label: 'Volunteer', icon: 'Heart', points: 12 },
    { id: 'education', label: 'Education', icon: 'GraduationCap', points: 18 },
    { id: 'clearance', label: 'Security Clearance', icon: 'ShieldCheck', points: 30 }
  ];

  const handleDocumentUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setNotifications(prev => [...prev, { 
        id: Date.now(), 
        message: 'Please upload PDF, JPG, or PNG files only.', 
        type: 'error' 
      }]);
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      setNotifications(prev => [...prev, { 
        id: Date.now(), 
        message: 'File size too large. Maximum 10MB.', 
        type: 'error' 
      }]);
      return;
    }
    
    setUploadingFile(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    
    try {
      const ocrText = await simulateOCR(file);
      
      setTimeout(() => {
        clearInterval(interval);
        setUploadProgress(100);
        
        const newDocument = {
          id: referralDocuments.length + 1,
          name: file.name,
          type: referralType,
          date: new Date().toLocaleDateString('en-ZA'),
          status: "pending",
          points: getReferralPoints(referralType),
          size: (file.size / 1024 / 1024).toFixed(2) + " MB",
          version: 1,
          hash: generateHash(file.name + Date.now()),
          ocrText: ocrText,
          tags: [referralType, "pending"],
          comments: []
        };
        
        setReferralDocuments([newDocument, ...referralDocuments]);
        
        setDocumentHistory(prev => [{
          docId: newDocument.id,
          version: 1,
          date: new Date().toLocaleDateString('en-ZA'),
          action: "upload",
          user: user?.name || "User"
        }, ...prev]);
        
        if (setCredibilityScore) {
          setCredibilityScore(prev => Math.min(100, prev + newDocument.points));
        }
        
        setUploadingFile(false);
        setNotifications(prev => [...prev, { 
          id: Date.now(), 
          message: `Document uploaded successfully! +${newDocument.points} points`, 
          type: 'success' 
        }]);
        
        checkDocumentVerification(newDocument);
      }, 2000);
    } catch (error) {
      clearInterval(interval);
      setUploadingFile(false);
      setNotifications(prev => [...prev, { 
        id: Date.now(), 
        message: 'Upload failed. Please try again.', 
        type: 'error' 
      }]);
    }
  };

  const simulateOCR = (file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockOCR = `Extracted text from ${file.name}\nDocument Type: ${referralType}\nDate: ${new Date().toLocaleDateString()}\nReference: REF-${Math.floor(Math.random() * 10000)}`;
        resolve(mockOCR);
      }, 1500);
    });
  };

  const generateHash = (input) => {
    return '0x' + Math.random().toString(36).substring(2, 10) + '...' + 
           Math.random().toString(36).substring(2, 6);
  };

  const checkDocumentVerification = (document) => {
    if (document.type === 'clearance' || document.type === 'rehab') {
      setTimeout(() => {
        verifyDocument(document.id, 'system');
      }, 5000);
    }
  };

  const verifyDocument = (docId, verifier) => {
    setReferralDocuments(prev => prev.map(doc => 
      doc.id === docId 
        ? { 
            ...doc, 
            status: "verified", 
            verifiedBy: verifier === 'system' ? 'Automated System' : verifier,
            verifiedDate: new Date().toLocaleDateString('en-ZA'),
            expiryDate: calculateExpiryDate(doc.type)
          }
        : doc
    ));
    
    setDocumentHistory(prev => [{
      docId: docId,
      version: prev.filter(h => h.docId === docId).length + 1,
      date: new Date().toLocaleDateString('en-ZA'),
      action: "verify",
      user: verifier === 'system' ? 'System' : 'Verification Officer'
    }, ...prev]);
    
    setNotifications(prev => [...prev, { 
      id: Date.now(), 
      message: 'Document verified successfully!', 
      type: 'success' 
    }]);
  };

  const calculateExpiryDate = (type) => {
    const date = new Date();
    switch(type) {
      case 'clearance':
        date.setFullYear(date.getFullYear() + 1);
        break;
      case 'rehab':
        date.setFullYear(date.getFullYear() + 2);
        break;
      default:
        date.setFullYear(date.getFullYear() + 5);
    }
    return date.toLocaleDateString('en-ZA');
  };

  const checkExpiredDocuments = () => {
    const today = new Date();
    return referralDocuments.filter(doc => {
      if (!doc.expiryDate) return false;
      const expiry = new Date(doc.expiryDate);
      return expiry < today;
    });
  };

  const getReferralPoints = (type) => {
    const pointsMap = {
      employer: 15,
      rehab: 20,
      police: 25,
      community: 10,
      volunteer: 12,
      education: 18,
      clearance: 30
    };
    return pointsMap[type] || 10;
  };

  const handleDeleteDocument = (docId) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setReferralDocuments(prev => prev.filter(doc => doc.id !== docId));
      setDocumentHistory(prev => prev.filter(h => h.docId !== docId));
      setNotifications(prev => [...prev, { 
        id: Date.now(), 
        message: 'Document deleted', 
        type: 'info' 
      }]);
    }
  };

  const handleRestoreVersion = (docId, version) => {
    setNotifications(prev => [...prev, { 
      id: Date.now(), 
      message: `Restored version ${version}`, 
      type: 'success' 
    }]);
  };

  return {
    referralType,
    setReferralType,
    referralDocuments,
    uploadingFile,
    uploadProgress,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    sortBy,
    setSortBy,
    selectedDocument,
    setSelectedDocument,
    showDocumentModal,
    setShowDocumentModal,
    showVerificationModal,
    setShowVerificationModal,
    verificationCode,
    setVerificationCode,
    referralTypes,
    documentHistory,
    handleDocumentUpload,
    handleDeleteDocument,
    verifyDocument,
    checkExpiredDocuments,
    getReferralPoints,
    handleRestoreVersion,
    fileInputRef
  };
}