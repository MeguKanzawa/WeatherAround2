import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FavoritesPanel.css';

const API_KEY = '6d3d00323f6dd5b83392fa54db270c66';

const FavoritesPanel = ({ favorites }) => {
  const [weatherData, setWeatherData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchAll = async () => {
      const data = await Promise.all(
        favorites.map(async (loc) => {
          const current = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: { lat: loc.lat, lon: loc.lon, units: 'metric', appid: API_KEY },
          });

          const forecast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
            params: { lat: loc.lat, lon: loc.lon, units: 'metric', appid: API_KEY },
          });

          return {
            name: loc.name,
            current: current.data,
            forecast: forecast.data.list.slice(0, 5),
          };
        })
      );
      setWeatherData(data.reverse()); // most recent first
      setActiveIndex(0); // reset to newest when updated
    };

    if (favorites.length > 0) {
      fetchAll();
    }
  }, [favorites]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? weatherData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === weatherData.length - 1 ? 0 : prev + 1));
  };

  const entry = weatherData[activeIndex];

  return (
    <div className="favorites-panel">
      <h2 className="carousel-title">Favorite Locations</h2>

      {entry && (
        <div className="carousel-container">
          <button className="carousel-button" onClick={handlePrev}>◀</button>

          <div className="favorite-tile carousel-slide">
            <h3>{entry.name}</h3>
            <p className="carousel-date">
              {new Date(entry.current.dt * 1000).toLocaleDateString(undefined, {
                weekday: 'long',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
            <div className="weather-info">
              <div>
                <p><strong>Temp:</strong> {Math.round(entry.current.main.temp)}°C</p>
                <p><strong>Humidity:</strong> {entry.current.main.humidity}%</p>
                <p><strong>Condition:</strong> {entry.current.weather[0].description}</p>
              </div>
              <div className="forecast-row">
                {entry.forecast.map((f, i) => (
                  <div className="forecast-col" key={i}>
                    <p>{new Date(f.dt_txt).getHours()}:00</p>
                    <p>{Math.round(f.main.temp)}°</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button className="carousel-button" onClick={handleNext}>▶</button>
        </div>
      )}
    </div>
  );
};

export default FavoritesPanel;
