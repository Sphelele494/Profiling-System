import React, { useState } from 'react';
import './Common.css';

export const Avatar = ({ src, alt, fallback, size = 40 }) => {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        className="avatar-fallback"
        style={{
          width: size,
          height: size,
          fontSize: size / 2,
          backgroundColor: '#10b981',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          fontWeight: '600'
        }}
      >
        {fallback}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        objectFit: 'cover'
      }}
    />
  );
};