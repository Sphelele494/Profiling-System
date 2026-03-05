import React from 'react';
import './Common.css';

export const FilterTabs = ({ options, activeFilter, onFilterChange }) => {
  return (
    <div className="filter-tabs">
      {options.map(option => (
        <button
          key={option}
          className={`filter-tab ${activeFilter === option ? 'active' : ''}`}
          onClick={() => onFilterChange(option)}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
    </div>
  );
};