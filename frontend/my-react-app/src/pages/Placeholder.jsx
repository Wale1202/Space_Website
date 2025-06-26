import React from 'react';
import { Link } from 'react-router-dom';
import './Placeholder.css';

/**
 * Placeholder page component for features that are coming soon
 * @param {string} title - The title of the feature
 * @param {string} description - A brief description of the feature
 * @returns {JSX.Element} Placeholder page component
 */
const Placeholder = (title, description) => {
  return (
    <div className="placeholder-page">
      <div className="placeholder-content">
        <div className="placeholder-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="96" height="96">
            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z"/>
          </svg>
        </div>
        <h1 className="placeholder-title">{title}</h1>
        <p className="placeholder-description">{description}</p>
        <div className="placeholder-message">
          <p>This feature is coming soon!</p>
          <p>Keep checking for Updates.</p>
        </div>
        <div className="placeholder-actions">
          <Link to="/" className="placeholder-button">
            Return to Home
          </Link>
        </div>
      </div>
      
      <div className="placeholder-stars">
        {Array.from({ length: 50 }).map((_, index) => (
          <div 
            key={index} 
            className="star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Placeholder;
