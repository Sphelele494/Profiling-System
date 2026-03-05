import React from 'react';
import { JobSeekerCard } from './JobSeekerCard';
import { RecruiterCard } from './RecruiterCard';

export const ChoiceCardsContainer = ({
  selectedOption,
  hoveredCard,
  isLoading,
  onCardClick,
  onCardHover
}) => {
  return (
    <div className="choice-container">
      <div className="choice-grid">
        <JobSeekerCard
          isSelected={selectedOption === 'user'}
          isHovered={hoveredCard === 'user'}
          isLoading={isLoading}
          onClick={() => onCardClick('user')}
          onMouseEnter={() => onCardHover('user')}
          onMouseLeave={() => onCardHover(null)}
        />
        
        <RecruiterCard
          isSelected={selectedOption === 'recruiter'}
          isHovered={hoveredCard === 'recruiter'}
          isLoading={isLoading}
          onClick={() => onCardClick('recruiter')}
          onMouseEnter={() => onCardHover('recruiter')}
          onMouseLeave={() => onCardHover(null)}
        />
      </div>
    </div>
  );
};