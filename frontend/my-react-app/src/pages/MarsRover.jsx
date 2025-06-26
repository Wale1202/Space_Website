import React, { useState, useEffect } from 'react';
import { fetchMarsPhotos } from '../services/api';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import './MarsRover.css';

/**
 * Mars Rover Photos page
 * @returns {JSX.Element} MarsRover page component
 */
const MarsRover = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  // Filter states
  const [rover, setRover] = useState('curiosity');
  const [camera, setCamera] = useState('');
  const [earthDate, setEarthDate] = useState('');
  const [sol, setSol] = useState('');
  
  // Get today's date in YYYY-MM-DD format for the date picker max value
  const today = new Date().toISOString().split('T')[0];
  
  // Camera options for each rover
  const cameraOptions = {
    curiosity: [
      { value: 'FHAZ', label: 'Front Hazard Avoidance Camera' },
      { value: 'RHAZ', label: 'Rear Hazard Avoidance Camera' },
      { value: 'MAST', label: 'Mast Camera' },
      { value: 'CHEMCAM', label: 'Chemistry and Camera Complex' },
      { value: 'MAHLI', label: 'Mars Hand Lens Imager' },
      { value: 'MARDI', label: 'Mars Descent Imager' },
      { value: 'NAVCAM', label: 'Navigation Camera' }
    ],
    opportunity: [
      { value: 'FHAZ', label: 'Front Hazard Avoidance Camera' },
      { value: 'RHAZ', label: 'Rear Hazard Avoidance Camera' },
      { value: 'NAVCAM', label: 'Navigation Camera' },
      { value: 'PANCAM', label: 'Panoramic Camera' },
      { value: 'MINITES', label: 'Miniature Thermal Emission Spectrometer' }
    ],
    spirit: [
      { value: 'FHAZ', label: 'Front Hazard Avoidance Camera' },
      { value: 'RHAZ', label: 'Rear Hazard Avoidance Camera' },
      { value: 'NAVCAM', label: 'Navigation Camera' },
      { value: 'PANCAM', label: 'Panoramic Camera' },
      { value: 'MINITES', label: 'Miniature Thermal Emission Spectrometer' }
    ],
    perseverance: [
      { value: 'EDL_RUCAM', label: 'Rover Up-Look Camera' },
      { value: 'EDL_RDCAM', label: 'Rover Down-Look Camera' },
      { value: 'EDL_DDCAM', label: 'Descent Stage Down-Look Camera' },
      { value: 'EDL_PUCAM1', label: 'Parachute Up-Look Camera A' },
      { value: 'EDL_PUCAM2', label: 'Parachute Up-Look Camera B' },
      { value: 'NAVCAM_LEFT', label: 'Navigation Camera - Left' },
      { value: 'NAVCAM_RIGHT', label: 'Navigation Camera - Right' },
      { value: 'MCZ_RIGHT', label: 'Mastcam-Z Right' },
      { value: 'MCZ_LEFT', label: 'Mastcam-Z Left' },
      { value: 'FRONT_HAZCAM_LEFT_A', label: 'Front Hazard Avoidance Camera - Left' },
      { value: 'FRONT_HAZCAM_RIGHT_A', label: 'Front Hazard Avoidance Camera - Right' },
      { value: 'REAR_HAZCAM_LEFT', label: 'Rear Hazard Avoidance Camera - Left' },
      { value: 'REAR_HAZCAM_RIGHT', label: 'Rear Hazard Avoidance Camera - Right' }
    ]
  };
  
  useEffect(() => {
    fetchMarsRoverPhotos();
  }, [rover, camera, earthDate, sol, page]);
  
  const fetchMarsRoverPhotos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Build query parameters
      const params = { rover };
      
      if (camera) params.camera = camera;
      
      // Use either earth_date or sol, not both
      if (earthDate) {
        params.earth_date = earthDate;
      } else if (sol) {
        params.sol = sol;
      } else {
        // Default to latest photos if neither is provided
        params.sol = 'latest';
      }
      
      // Add page parameter
      params.page = page;
      
      const data = await fetchMarsPhotos(params);
      
      if (data.photos && data.photos.length > 0) {
        if (page === 1) {
          setPhotos(data.photos);
        } else {
          setPhotos(prevPhotos => [...prevPhotos, ...data.photos]);
        }
        setHasMore(data.photos.length === 25); // Assuming 25 is the page size
      } else {
        setHasMore(false);
        if (page === 1) {
          setPhotos([]);
        }
      }
    } catch (err) {
      console.error('Error fetching Mars Rover photos:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleRoverChange = (e) => {
    setRover(e.target.value);
    setCamera(''); // Reset camera when rover changes
    setPage(1); // Reset page when filter changes
  };
  
  const handleCameraChange = (e) => {
    setCamera(e.target.value);
    setPage(1); // Reset page when filter changes
  };
  
  const handleEarthDateChange = (e) => {
    setEarthDate(e.target.value);
    setSol(''); // Clear sol when earth_date is set
    setPage(1); // Reset page when filter changes
  };
  
  const handleSolChange = (e) => {
    setSol(e.target.value);
    setEarthDate(''); // Clear earth_date when sol is set
    setPage(1); // Reset page when filter changes
  };
  
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  
  const handleRetry = () => {
    setPage(1);
    fetchMarsRoverPhotos();
  };

  return (
    <div className="mars-rover-page">
      <div className="mars-rover-header">
        <h1 className="mars-rover-title">Mars Rover Photos</h1>
        <p className="mars-rover-subtitle">
          Explore the surface of Mars through the eyes of NASA's rovers: Curiosity, Opportunity, Spirit, and Perseverance.
        </p>
      </div>
      
      <div className="mars-rover-filters">
        <div className="filter-group">
          <label htmlFor="rover-select">Rover:</label>
          <select 
            id="rover-select" 
            value={rover} 
            onChange={handleRoverChange}
          >
            <option value="curiosity">Curiosity</option>
            <option value="opportunity">Opportunity</option>
            <option value="spirit">Spirit</option>
            <option value="perseverance">Perseverance</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="camera-select">Camera:</label>
          <select 
            id="camera-select" 
            value={camera} 
            onChange={handleCameraChange}
          >
            <option value="">All Cameras</option>
            {cameraOptions[rover].map(cam => (
              <option key={cam.value} value={cam.value}>
                {cam.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="earth-date">Earth Date:</label>
          <input 
            type="date" 
            id="earth-date" 
            value={earthDate} 
            onChange={handleEarthDateChange}
            max={today}
            disabled={!!sol}
          />
        </div>
        
        <div className="filter-group">
          <label htmlFor="sol">Sol:</label>
          <input 
            type="number" 
            id="sol" 
            value={sol} 
            onChange={handleSolChange}
            min="0"
            placeholder="Martian day"
            disabled={!!earthDate}
          />
        </div>
      </div>
      
      {loading && page === 1 ? (
        <Loader size="large" message="Fetching Mars rover photos..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={handleRetry} />
      ) : (
        <>
          {photos.length === 0 ? (
            <div className="mars-rover-no-results">
              <p>No photos found for the selected filters. Try changing your search criteria.</p>
            </div>
          ) : (
            <>
              <div className="mars-rover-results">
                <p className="mars-rover-count">Showing {photos.length} photos</p>
                <div className="mars-rover-grid">
                  {photos.map(photo => (
                    <div key={photo.id} className="mars-rover-photo-card">
                      <img 
                        src={photo.img_src} 
                        alt={`Mars Rover ${rover} - Sol ${photo.sol}`}
                        className="mars-rover-photo"
                        loading="lazy"
                      />
                      <div className="mars-rover-photo-info">
                        <p><strong>Date:</strong> {photo.earth_date}</p>
                        <p><strong>Sol:</strong> {photo.sol}</p>
                        <p><strong>Camera:</strong> {photo.camera.full_name}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {loading && page > 1 && (
                  <div className="mars-rover-loading-more">
                    <Loader size="small" message="Loading more photos..." />
                  </div>
                )}
                
                {hasMore && !loading && (
                  <button 
                    className="mars-rover-load-more" 
                    onClick={handleLoadMore}
                  >
                    Load More Photos
                  </button>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MarsRover;
