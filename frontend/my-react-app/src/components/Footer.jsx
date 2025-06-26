import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

/**
 * Footer component
 * @returns {JSX.Element} Footer component
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">NASA Explorer</h3>
          <p className="footer-description">
            Explore the wonders of space through NASA's open APIs. 
            Discover stunning imagery, scientific data, and the latest 
            discoveries from our universe.
          </p>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">Explore</h3>
          <ul className="footer-links">
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/apod" className="footer-link">Astronomy Picture of the Day</Link></li>
            <li><Link to="/mars" className="footer-link">Mars Rover Photos</Link></li>
            <li><Link to="/epic" className="footer-link">Earth Imagery</Link></li>
            <li><Link to="/neo" className="footer-link">Near Earth Objects</Link></li>
            <li><Link to="/search" className="footer-link">Image Search</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">Resources</h3>
          <ul className="footer-links">
            <li>
              <a 
                href="https://api.nasa.gov/" 
                className="footer-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                NASA Open APIs
              </a>
            </li>
            <li>
              <a 
                href="https://www.nasa.gov/" 
                className="footer-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                NASA Official Website
              </a>
            </li>
            <li>
              <a 
                href="https://github.com/nasa" 
                className="footer-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                NASA on GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p className="footer-copyright">
          &copy; {currentYear} NASA Explorer. All data provided by NASA's Open APIs.
        </p>
        <p className="footer-disclaimer">
          This application is not affiliated with or endorsed by NASA.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
