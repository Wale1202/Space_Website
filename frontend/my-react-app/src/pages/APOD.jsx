// import { useState, useEffect } from 'react';
// import { fetchAPOD } from '../services/api';
// import DataCard from '../components/DataCard';
// import Loader from '../components/Loader';
// import ErrorMessage from '../components/ErrorMessage';

// const APOD = () => {
//   const [apodData, setApodData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getAPOD = async () => {
//       try {
//         const data = await fetchAPOD();
//         setApodData(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getAPOD();
//   }, []);

//   if (loading) return <Loader />;
//   if (error) return <ErrorMessage message={error} />;

//   return (
//     <div className="apod-container">
//       <h1>Astronomy Picture of the Day</h1>
//       {apodData && (
//         <DataCard 
//           title={apodData.title}
//           date={apodData.date}
//           explanation={apodData.explanation}
//           mediaUrl={apodData.url}
//           mediaType={apodData.media_type}
//         />
//       )}
//     </div>
//   );
// };

// export default APOD;