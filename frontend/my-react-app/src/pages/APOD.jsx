import { useState, useEffect } from 'react';
import { fetchAPOD } from '../services/api';
import DataCard from '../components/DataCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

/**
 * Astronomy Picture of the Day page
 * @returns {JSX.Element} APOD page component
 */
const APOD = () => {
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState('');

  // Get today's date in YYYY-MM-DD format for the date picker max value
  const today = new Date().toISOString().split('T')[0];
  
  // Calculate the minimum date (APOD started on June 16, 1995)
  const minDate = '1995-06-16';

  useEffect(() => {
    const getAPOD = async () => {
      try {
        const data = await fetchAPOD();
        setApodData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getAPOD();
  }, [date]);
  
    
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleRandomDate = () => {
    // Generate a random date between min date and today
    const start = new Date(minDate);
    const end = new Date();
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    
    // Format as YYYY-MM-DD
    const formattedDate = randomDate.toISOString().split('T')[0];
    setDate(formattedDate);
  };

  return (
    <div className="apod-page">
      <div className="apod-header">
        <h1 className="apod-title">Astronomy Picture of the Day</h1>
        <p className="apod-subtitle">
          Discover the cosmos! Each day a different image or photograph of our fascinating universe is featured, 
          along with a brief explanation written by a professional astronomer.
        </p>
        
        <div className="apod-controls">
          <div className="apod-date-picker">
            <label htmlFor="apod-date">Select a date: </label>
            <input
              type="date"
              id="apod-date"
              value={date}
              onChange={handleDateChange}
              min={minDate}
              max={today}
            />
          </div>
          
          <button 
            className="apod-random-button"
            onClick={handleRandomDate}
          >
            Random Date
          </button>
        </div>
      </div>

      <div className="apod-content">
        {loading ? (
          <Loader size="large" message="Loading the wonders of the universe..." />
        ) : error ? (
          <ErrorMessage 
            message={error} 
            onRetry={() => {
              setDate('');
              setError(null);
            }} 
          />
        ) : apodData ? (
          <DataCard 
            title={apodData.title}
            date={apodData.date}
            explanation={apodData.explanation}
            mediaUrl={apodData.url}
            mediaType={apodData.media_type}
            copyright={apodData.copyright}
          />
        ) : null}
      </div>
    </div>
  );
 };

 export default APOD;