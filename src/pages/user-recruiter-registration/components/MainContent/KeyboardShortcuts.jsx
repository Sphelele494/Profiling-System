import React from 'react';

export const KeyboardShortcuts = () => {
  return (
    <div className="shortcuts-hint">
      <span className="hint-item">
        <kbd>1</kbd> Job Seeker
      </span>
      <span className="hint-item">
        <kbd>2</kbd> Recruiter
      </span>
      <span className="hint-item">
        <kbd>Enter</kbd> Continue
      </span>
      <span className="hint-item">
        <kbd>Esc</kbd> Home
      </span>
    </div>
  );
};