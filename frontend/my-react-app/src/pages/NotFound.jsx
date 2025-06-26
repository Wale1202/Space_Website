import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

/**
 * 404 Not Found page
 * @returns {JSX.Element} NotFound page component
 */
const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="96" height="96">
            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z"/>
          </svg>
        </div>
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-message">
          The page you are looking is temporarily unavailable.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="not-found-button">
            Return to Home
          </Link>
        </div>
      </div>
      
      <div className="not-found-stars">
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

export default NotFound;
