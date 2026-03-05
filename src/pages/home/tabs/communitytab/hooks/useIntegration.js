import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useIntegration({ setNotifications, setIsLoading }) {
  // Safely initialize with error handling
  const [sapsStatus, setSapsStatus] = useLocalStorage('relink_saps_status', {
    connected: true,
    lastCheck: "2024-02-15 09:30",
    clearanceValid: true,
    clearanceNumber: "SAPS-CLR-2024-01234",
    nextRenewal: "2025-02-10"
  });

  const [dcsStatus, setDcsStatus] = useLocalStorage('relink_dcs_status', {
    connected: true,
    offenderNumber: "DCS-2019-87654",
    status: "parole",
    paroleOfficer: "Mr. Johannes Ndlovu",
    nextMeeting: "2024-03-01",
    compliance: 95
  });

  const [bankStatus, setBankStatus] = useLocalStorage('relink_bank_status', {
    verified: true,
    bank: "FNB",
    accountType: "Savings",
    verifiedDate: "2024-01-15",
    salaryPayments: true
  });

  // Safe notification helper
  const safeSetNotifications = useCallback((updater) => {
    if (setNotifications && typeof setNotifications === 'function') {
      setNotifications(updater);
    }
  }, [setNotifications]);

  // Safe loading helper
  const safeSetIsLoading = useCallback((value) => {
    if (setIsLoading && typeof setIsLoading === 'function') {
      setIsLoading(value);
    }
  }, [setIsLoading]);

  const checkSAPSClearance = async () => {
    safeSetIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Safely update state
      if (setSapsStatus && sapsStatus) {
        setSapsStatus({
          ...sapsStatus,
          lastCheck: new Date().toLocaleString(),
          clearanceValid: true,
          lastUpdated: new Date().toISOString()
        });
      }
      
      safeSetNotifications(prev => {
        const notifications = Array.isArray(prev) ? prev : [];
        return [...notifications, { 
          id: Date.now(), 
          message: 'SAPS clearance verified successfully', 
          type: 'success',
          timestamp: new Date().toISOString()
        }];
      });
    } catch (error) {
      console.error('SAPS verification error:', error);
      safeSetNotifications(prev => {
        const notifications = Array.isArray(prev) ? prev : [];
        return [...notifications, { 
          id: Date.now(), 
          message: 'SAPS verification failed: ' + error.message, 
          type: 'error',
          timestamp: new Date().toISOString()
        }];
      });
    } finally {
      safeSetIsLoading(false);
    }
  };

  const checkDCSStatus = async () => {
    safeSetIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (setDcsStatus && dcsStatus) {
        setDcsStatus({
          ...dcsStatus,
          lastCheck: new Date().toLocaleString(),
          status: "parole",
          compliance: 95,
          lastUpdated: new Date().toISOString()
        });
      }
      
      safeSetNotifications(prev => {
        const notifications = Array.isArray(prev) ? prev : [];
        return [...notifications, { 
          id: Date.now(), 
          message: 'DCS status updated successfully', 
          type: 'success',
          timestamp: new Date().toISOString()
        }];
      });
    } catch (error) {
      console.error('DCS check error:', error);
      safeSetNotifications(prev => {
        const notifications = Array.isArray(prev) ? prev : [];
        return [...notifications, { 
          id: Date.now(), 
          message: 'DCS check failed: ' + error.message, 
          type: 'error',
          timestamp: new Date().toISOString()
        }];
      });
    } finally {
      safeSetIsLoading(false);
    }
  };

  const verifyBankAccount = async () => {
    safeSetIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (setBankStatus && bankStatus) {
        setBankStatus({
          ...bankStatus,
          verified: true,
          verifiedDate: new Date().toLocaleDateString(),
          lastVerified: new Date().toISOString()
        });
      }
      
      safeSetNotifications(prev => {
        const notifications = Array.isArray(prev) ? prev : [];
        return [...notifications, { 
          id: Date.now(), 
          message: 'Bank account verified successfully', 
          type: 'success',
          timestamp: new Date().toISOString()
        }];
      });
    } catch (error) {
      console.error('Bank verification error:', error);
      safeSetNotifications(prev => {
        const notifications = Array.isArray(prev) ? prev : [];
        return [...notifications, { 
          id: Date.now(), 
          message: 'Bank verification failed: ' + error.message, 
          type: 'error',
          timestamp: new Date().toISOString()
        }];
      });
    } finally {
      safeSetIsLoading(false);
    }
  };

  // Return statuses with safe defaults
  return {
    sapsStatus: sapsStatus || {
      connected: false,
      lastCheck: null,
      clearanceValid: false,
      clearanceNumber: null,
      nextRenewal: null
    },
    dcsStatus: dcsStatus || {
      connected: false,
      offenderNumber: null,
      status: "unknown",
      paroleOfficer: null,
      nextMeeting: null,
      compliance: 0
    },
    bankStatus: bankStatus || {
      verified: false,
      bank: null,
      accountType: null,
      verifiedDate: null,
      salaryPayments: false
    },
    checkSAPSClearance,
    checkDCSStatus,
    verifyBankAccount
  };
}