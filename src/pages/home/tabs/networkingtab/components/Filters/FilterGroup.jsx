import React from 'react';
import { Filter, MapPin, Calendar, Briefcase } from 'lucide-react';
import { FilterSelect } from './FilterSelect';
import './Filters.css';

const iconMap = {
  Filter,
  MapPin,
  Calendar,
  Briefcase,
  salary: () => <span className="salary-icon">R</span>
};

export const FilterGroup = ({ label, icon, value, options, onChange }) => {
  const Icon = iconMap[icon] || Filter;

  return (
    <div className="filter-group">
      <label className="filter-label">
        {typeof Icon === 'function' ? <Icon /> : <Icon size={16} />}
        {label}
      </label>
      <FilterSelect
        value={value}
        options={options}
        onChange={onChange}
      />
    </div>
  );
};