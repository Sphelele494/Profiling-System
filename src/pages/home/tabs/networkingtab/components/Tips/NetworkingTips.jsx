import React, { useState } from 'react';
import { Megaphone, RefreshCw } from 'lucide-react';
import { TipItem } from './TipItem';
import { networkingTips } from "../utils/constants";
import './Tips.css';

export const NetworkingTips = () => {
  const [tips] = useState(networkingTips);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="networking-tips">
      <div className="tips-header">
        <h4 className="tips-title">
          <Megaphone size={20} />
          Professional Networking Tips for South Africa
        </h4>
        <button className="refresh-tips-btn" onClick={handleRefresh}>
          <RefreshCw size={16} />
        </button>
      </div>
      <div className="tips-list" key={refreshKey}>
        {tips.map((tip, index) => (
          <TipItem key={index} tip={tip} />
        ))}
      </div>
    </div>
  );
};