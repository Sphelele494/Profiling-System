import React from 'react';
import './Filters.css';

export const FilterSelect = ({ value, options, onChange }) => {
  return (
    <select
      className="filter-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  );
};