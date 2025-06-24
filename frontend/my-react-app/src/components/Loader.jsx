import React from 'react';
import './Loader.css';

/**
 * Loading spinner component
 * @param {Object} props - Component props
 * @param {string} props.size - Size of the loader ('small', 'medium', 'large')
 * @param {string} props.message - Optional loading message
 * @returns {JSX.Element} Loader component
 */
const Loader = ({ size = 'medium', message = 'Loading...' }) => {
  const sizeClass = `loader-${size}`;
  
  return (
    <div className="loader-container">
      <div className={`loader ${sizeClass}`}>
        <div className="loader-orbit">
          <div className="loader-planet"></div>
        </div>
      </div>
      {message && <p className="loader-message">{message}</p>}
    </div>
  );
};

export default Loader;
