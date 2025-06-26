import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAPOD } from '../services/api';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import './Home.css';

/**
 * Home page component
 * @returns {JSX.Element} Home page
 */
const Home = () => {
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const getAPOD = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await fetchAPOD();
        setApodData(data);
      } catch (err) {
        console.error('Error fetching APOD:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getAPOD();
  }, []);
  
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Explore the Cosmos</h1>
          <p className="hero-subtitle">
            Discover the wonders of space through NASA's vast collection of data and imagery
          </p>
        </div>
        <div className="hero-image-container">
          {loading ? (
            <div className="hero-image-placeholder">
              <Loader size="large" message="Loading today's astronomy picture..." />
            </div>
          ) : error ? (
            <div className="hero-image-placeholder">
              <ErrorMessage 
                message="Could not load today's astronomy picture" 
                onRetry={() => window.location.reload()}
              />
            </div>
          ) : apodData && (
            <>
              <div 
                className="hero-image" 
                style={{ 
                  backgroundImage: `url(${apodData.url})` 
                }}
              />
              <div className="hero-image-caption">
                <h3>{apodData.title}</h3>
                <p>Today's Astronomy Picture of the Day</p>
              </div>
            </>
          )}
        </div>
      </section>
      
      <section className="features-section">
        <h2 className="section-title">Explore NASA's Data</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon apod-icon"></div>
            <h3 className="feature-title">Astronomy Picture of the Day</h3>
            <p className="feature-description">
              Discover the cosmos! Each day a different image or photograph of our fascinating universe is featured, along with a brief explanation written by a professional astronomer.
            </p>
            <Link to="/apod" className="feature-link">Explore APOD</Link>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon mars-icon"></div>
            <h3 className="feature-title">Mars Rover Photos</h3>
            <p className="feature-description">
              View thousands of images collected by NASA's Curiosity, Opportunity, Spirit and Perseverance rovers on Mars. Filter by camera, date, or rover.
            </p>
            <Link to="/mars" className="feature-link">Explore Mars</Link>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon epic-icon"></div>
            <h3 className="feature-title">Earth Imagery</h3>
            <p className="feature-description">
              The EPIC API provides imagery of the Earth captured by DSCOVR's Earth Polychromatic Imaging Camera (EPIC) instrument.
            </p>
            <Link to="/epic" className="feature-link">View Earth</Link>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon neo-icon"></div>
            <h3 className="feature-title">Near Earth Objects</h3>
            <p className="feature-description">
              Track asteroids and comets that have been discovered passing near Earth. Access data about their characteristics and orbital parameters.
            </p>
            <Link to="/neo" className="feature-link">Track Asteroids</Link>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon search-icon"></div>
            <h3 className="feature-title">NASA Image Search</h3>
            <p className="feature-description">
              Search NASA's extensive image and video library for space-related media. Find high-quality images of planets, stars, galaxies, and more.
            </p>
            <Link to="/search" className="feature-link">Search Images</Link>
          </div>
        </div>
      </section>
      
      <section className="about-section">
        <div className="about-content">
          <h2 className="section-title">About This Project</h2>
          <p>
            This application was built using React for the frontend and Node.js with Express for the backend. 
            It leverages NASA's Open APIs to provide interactive space features.
          </p>
          <p>
            The project demonstrates modern web development practices including responsive design, 
            API integration, data visualization, and user interactivity.
          </p>
          <p>
            All data is sourced directly from NASA's publicly available APIs. 
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
