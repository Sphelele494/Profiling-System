import React from 'react';
import { Wifi, WifiOff, Battery, BatteryCharging, RefreshCw, Sun, Moon, Maximize2 } from 'lucide-react';
import "../StatusBar/StatusBar.css";

export const StatusBar = ({
  isOnline,
  batteryLevel,
  isLoading,
  lastSync,
  darkMode,
  fontSize,
  onToggleDarkMode,
  onIncreaseFontSize,
  onSync
}) => {
  return (
    <div className={`status-bar ${darkMode ? 'dark' : ''}`}>
      <div className="status-left">
        <div className={`online-status ${isOnline ? 'online' : 'offline'}`}>
          {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
          <span>{isOnline ? 'Online' : 'Offline'}</span>
        </div>
        <div className="battery-status">
          {batteryLevel > 20 ? <Battery size={14} /> : <BatteryCharging size={14} />}
          <span>{Math.round(batteryLevel)}%</span>
        </div>
        <div className="sync-status" onClick={onSync}>
          <RefreshCw size={14} className={isLoading ? 'spinning' : ''} />
          <span>Last sync: {lastSync.toLocaleTimeString()}</span>
        </div>
      </div>
      <div className="status-right">
        <button onClick={onToggleDarkMode} className="status-btn">
          {darkMode ? <Sun size={14} /> : <Moon size={14} />}
        </button>
        <button onClick={onIncreaseFontSize} className="status-btn">
          <Maximize2 size={14} />
        </button>
      </div>
    </div>
  );
};