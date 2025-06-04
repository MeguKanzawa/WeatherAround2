import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherPanel = () => {
  const [weather, setWeather] = useState(null);

  const API_KEY = import.meta.env.VITE_OWM_KEY; // or process.env.REACT_APP_OWM_KEY
  const lat = 37.3541;
  const lon = -121.9552;

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=6d3d00323f6dd5b83392fa54db270c66`,
        {
          params: {
            lat,
            lon,
            units: 'metric',
            appid: API_KEY,
          },
        }
      );
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="p-4 bg-blue-100 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-2">Santa Clara Weather</h2>
      {weather ? (
        <div>
          <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
          <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
          <p><strong>Condition:</strong> {weather.weather[0].description}</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherPanel;



// // WeatherPanel.jsx
// import React, { useEffect, useState } from 'react';

// export default function WeatherPanel({ location }) {
//   const [weatherData, setWeatherData] = useState(null);

//   useEffect(() => {
//     if (!location) return;

//     // Simulate API response
//     const mockData = {
//       current: {
//         temp: 22.5,
//         humidity: 55,
//         weather: [{ description: 'Partly cloudy' }],
//       },
//       hourly: Array.from({ length: 5 }, (_, i) => ({
//         dt: Date.now() / 1000 + (i + 1) * 3600,
//         temp: 22 - i * 1.2,
//         weather: [{ description: ['Sunny', 'Cloudy', 'Fog', 'Windy', 'Clear'][i] }],
//       })),
//     };

//     setTimeout(() => setWeatherData(mockData), 500); // simulate loading delay
//   }, [location]);

//   if (!location) return <p>Click on a region on the map to see weather info.</p>;
//   if (!weatherData) return <p>Loading mock weather data for {location.name}...</p>;

//   const { current, hourly } = weatherData;

//   return (
//     <div>
//       <h2>Mock Weather in {location.name}</h2>
//       <p><strong>Temperature:</strong> {current.temp} °C</p>
//       <p><strong>Conditions:</strong> {current.weather[0].description}</p>
//       <p><strong>Humidity:</strong> {current.humidity} %</p>

//       <h3>Next Hours</h3>
//       <ul>
//         {hourly.map((hour, idx) => (
//           <li key={idx}>
//             {new Date(hour.dt * 1000).toLocaleTimeString([], {
//               hour: '2-digit',
//               minute: '2-digit',
//             })} — {hour.temp.toFixed(1)}°C, {hour.weather[0].description}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
