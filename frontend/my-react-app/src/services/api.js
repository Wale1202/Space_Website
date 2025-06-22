const API_BASE_URL = 'http://localhost:5001/api/nasa';

export const fetchAPOD = async (date) => {
  const url = `${API_BASE_URL}/apod${date ? `?date=${date}` : ''}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch APOD data');
  }
  return response.json();
};

// export const fetchMarsPhotos = async (rover, earth_date, camera) => {
//   let url = `${API_BASE_URL}/mars-photos/${rover}`;
//   const params = new URLSearchParams();
//   if (earth_date) params.append('earth_date', earth_date);
//   if (camera) params.append('camera', camera);
  
//   if (params.toString()) url += `?${params.toString()}`;
  
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error('Failed to fetch Mars photos');
//   }
//   return response.json();
// };