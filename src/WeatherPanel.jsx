import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cloudy from './assets/cloudy.svg';
import sunny from './assets/sunny.svg';
import sunnycloudy from './assets/sunny-cloudy.svg';
import thunder from './assets/thunder.svg';
import windy from './assets/windy.svg';
import rainy from './assets/rainy.svg';
import heart from './assets/heart-plus.svg'
import './WeatherPanel.css';
import { motion, AnimatePresence } from 'framer-motion';

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
        
        const now = new Date();
        const timestamp = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

        const newTile = {
          id: `${location.lat},${location.lon}`,
          name: cityName,
          weather: response.data,
          fetchedAt: timestamp,
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

  const handleRemoveTile = (id) => {
    setWeatherTiles(prev => prev.filter(tile => tile.id !== id));
  };

const getWeatherIcon = (weatherMain, description) => {
  const main = weatherMain.toLowerCase();
  const desc = description.toLowerCase();

  if (main.includes('clear') && desc.includes('night')) return clearMoon;
  if (main.includes('clear')) return sunny;
  if (main.includes('cloud')) return cloudy;
  if (main.includes('rain') && desc.includes('heavy')) return rainy;
  if (main.includes('drizzle')) return rainy;
  if (main.includes('thunderstorm')) return thunder;
  if (desc.includes('sun') && desc.includes('cloud')) return sunnycloudy;
  if (desc.includes('night')) return night;
  if (desc.includes('sun')) return sunny;
  if (desc.includes('wind')) return windy;
  return cloudy; // fallback
};


  if (!weatherTiles.length) {
    return <p className="p-4">Click on a region to view weather info.</p>;
  }

  return (
    <div className="weather_tile_container" style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '0rem', height: '100%', width: '100%' }}>
      <AnimatePresence>
        {weatherTiles.map((tile, index) => (
          <motion.div
            key={tile.id}
            className="tile"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            style={{
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: "0rem",
              filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
              borderRadius: '18px',
              alignSelf: 'stretch',
              border: '3px solid #006FC8',
              height: '35vh',
              marginBottom: '0.5rem'
            }}
          >
            <div className="tileLeft">
              <h2 className="locationText">{tile.name}</h2>
              <img src={getWeatherIcon(tile.weather.weather[0].main, tile.weather.weather[0].description)} className="weatherImg" alt="Weather Image" />
            </div>
            <div className="tileRight">
              <div className="tileRightTop">
                <h2 className="temperatureText">
                  {Math.round(tile.weather.main.temp)}<span className="degree">&nbsp;°C&nbsp;</span>
                </h2>
              </div>
              <div className="tileRightButtom">
                <div className="tileRightLeft">
                  <p className="tileRightLeftText"><strong>Humidity</strong></p>
                  <p className="tileRightLeftText"><strong>Condition</strong></p>
                </div>
                <div className="tileRightRight">
                  <p className="tileRightRightText"><strong>{tile.weather.main.humidity}%</strong></p>
                  <p className="tileRightRightText"><strong>{tile.weather.weather[0].description}</strong></p>
                </div>
              </div>
            </div>
            <button onClick={() => handleRemoveTile(tile.id)} className="deleteButton" aria-label="Remove tile">
              <img src={heart} className="heart"></img>
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default WeatherPanel;
