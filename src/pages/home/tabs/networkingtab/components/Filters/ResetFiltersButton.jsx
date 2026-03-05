import React from 'react';
import { X } from 'lucide-react';
import './Filters.css';

export const ResetFiltersButton = ({ onReset }) => {
  return (
    <div className="filter-group">
      <label className="filter-label">&nbsp;</label>
      <button className="reset-filters-btn" onClick={onReset}>
        <X size={16} />
        <span>Reset All</span>
      </button>
    </div>
  );
};