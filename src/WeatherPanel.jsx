import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = '6d3d00323f6dd5b83392fa54db270c66';

const WeatherPanel = ({ location }) => {
  const [weatherTiles, setWeatherTiles] = useState([]);

  useEffect(() => {
    if (!location) return;

    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          'https://api.openweathermap.org/data/2.5/weather',
          {
            params: {
              lat: location.lat,
              lon: location.lon,
              units: 'metric',
              appid: API_KEY,
            },
          }
        );

        const cityName = response.data.name || location.name;

        const newTile = {
          id: `${location.lat},${location.lon}`,
          name: cityName,
          weather: response.data,
        };

        setWeatherTiles(prev => {
          const filtered = prev.filter(tile => tile.id !== newTile.id);
          return [newTile, ...filtered].slice(0, 6);
        });
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchWeather();
  }, [location]);

  if (!weatherTiles.length) {
    return <p className="p-4">Click on a region to view weather info.</p>;
  }

  return (
    <div className="p-4 grid grid-cols-2 gap-4 bg-blue-50 rounded-xl shadow-md h-full overflow-auto">
      {weatherTiles.map((tile) => (
        <div key={tile.id} className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-1">
            {tile.name}
          </h2>
          <p><strong>Temperature:</strong> {tile.weather.main.temp}°C</p>
          <p><strong>Humidity:</strong> {tile.weather.main.humidity}%</p>
          <p><strong>Condition:</strong> {tile.weather.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherPanel;
