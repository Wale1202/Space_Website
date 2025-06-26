import React, { useState } from 'react';
import './DataCard.css';

/**
 * Data card component for displaying NASA data
 * @param {Object} props - Component props
 * @param {string} props.title - Card title
 * @param {string} props.date - Date of the data
 * @param {string} props.explanation - Explanation text
 * @param {string} props.mediaUrl - URL of the media (image or video)
 * @param {string} props.mediaType - Type of media ('image' or 'video')
 * @param {string} props.copyright - Optional copyright information
 * @returns {JSX.Element} DataCard component
 */
const DataCard = ({ 
  title, 
  date, 
  explanation, 
  mediaUrl, 
  mediaType = 'image',
  copyright
}) => {
  const [expanded, setExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const renderMedia = () => {
    if (!mediaUrl) return null;

    if (mediaType === 'image') {
      return (
        <div className="data-card-media">
          {!imageLoaded && <div className="data-card-media-loading">Loading image...</div>}
          <img 
            src={mediaUrl} 
            alt={title} 
            className={`data-card-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      );
    } else if (mediaType === 'video') {
      return (
        <div className="data-card-media">
          <iframe
            src={mediaUrl}
            title={title}
            className="data-card-video"
            allowFullScreen
            frameBorder="0"
          />
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="data-card">
      <div className="data-card-header">
        <h2 className="data-card-title">{title}</h2>
        <div className="data-card-meta">
          <span className="data-card-date">{date}</span>
          {copyright && <span className="data-card-copyright">© {copyright}</span>}
        </div>
      </div>
      
      {renderMedia()}
      
      <div className={`data-card-content ${expanded ? 'expanded' : ''}`}>
        <p className="data-card-explanation">{explanation}</p>
      </div>
      
      {explanation && explanation.length > 200 && (
        <button 
          className="data-card-expand-button" 
          onClick={toggleExpanded}
        >
          {expanded ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
};

export default DataCard;
