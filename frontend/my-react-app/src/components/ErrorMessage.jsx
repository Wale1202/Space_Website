import React from 'react';
import './ErrorMessage.css';

/**
 * Error message component
 * @param {Object} props
 * @param {string} props.message - The error message to display
 * @param {function} [props.onRetry] - Optional retry callback
 */
const ErrorMessage = ({ message = 'An error occurred.', onRetry }) => (
  <div className="error-message-container">
    <p className="error-message-text">{message}</p>
    {onRetry && (
      <button className="error-retry-btn" onClick={onRetry}>
        Retry
      </button>
    )}
  </div>
);

export default ErrorMessage;
