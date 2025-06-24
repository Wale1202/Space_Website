import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

/**
 * Navigation bar component
 * @returns {JSX.Element} Navbar component
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <div className="navbar-logo-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z"/>
            </svg>
          </div>
          <span>NASA Explorer</span>
        </Link>
        
        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className={`navbar-toggle-icon ${isMenuOpen ? 'open' : ''}`}></span>
        </div>
        
        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <Link 
              to="/" 
              className={`navbar-link ${isActive('/') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link 
              to="/apod" 
              className={`navbar-link ${isActive('/apod') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              APOD
            </Link>
          </li>
          <li className="navbar-item">
            <Link 
              to="/mars" 
              className={`navbar-link ${isActive('/mars') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Mars Rover
            </Link>
          </li>
          <li className="navbar-item">
            <Link 
              to="/epic" 
              className={`navbar-link ${isActive('/epic') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              EPIC
            </Link>
          </li>
          <li className="navbar-item">
            <Link 
              to="/neo" 
              className={`navbar-link ${isActive('/neo') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Near Earth Objects
            </Link>
          </li>
          <li className="navbar-item">
            <Link 
              to="/search" 
              className={`navbar-link ${isActive('/search') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Image Search
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
