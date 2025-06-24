import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import axios from 'axios';
import './App.css';

function App() {
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        const response = await axios.get('https://space-website-911e.onrender.com/api/apod');
        setApodData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAPOD();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="App">
      <h1>NASA Astronomy Picture of the Day</h1>
      {apodData && (
        <div className="apod-container">
          <h2>{apodData.title}</h2>
          <p>{apodData.date}</p>
          {apodData.media_type === 'image' ? (
            <img 
              src={apodData.url} 
              alt={apodData.title} 
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          ) : (
            <iframe
              title={apodData.title}
              src={apodData.url}
              frameBorder="0"
              allowFullScreen
            />
          )}
          <p>{apodData.explanation}</p>
        </div>
      )}
    </div>
  );
}


export default App;