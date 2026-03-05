// src/pages/home/tabs/networkingtab/components/Categories/CategoryTabs.jsx
import React from 'react';
import './Categories.css';

// Single Tab Item Component (what you already have)
const CategoryTab = ({ category, isActive, count, onClick }) => {
  const Icon = category.icon;
  
  return (
    <button
      className={`category-tab ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <Icon size={18} />
      <span>{category.label}</span>
      <span className="category-count">{count}</span>
    </button>
  );
};

// Main CategoryTabs Container Component (this is what you need to export)
const CategoryTabs = ({ categories, activeCategory, onCategoryChange, jobCounts }) => {
  return (
    <div className="category-tabs-container">
      {categories.map((category) => (
        <CategoryTab
          key={category.id}
          category={category}
          isActive={activeCategory === category.id}
          count={jobCounts[category.id] || 0}
          onClick={() => onCategoryChange(category.id)}
        />
      ))}
    </div>
  );
};

// Export the main component as default (recommended)
export default CategoryTabs;

// OR if you want to keep named export, uncomment the line below:
// export { CategoryTabs };