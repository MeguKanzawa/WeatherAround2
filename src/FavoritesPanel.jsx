import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FavoritesPanel.css';
import cloudy from './assets/cloudy.svg';
import sunny from './assets/sunny.svg';
import sunnycloudy from './assets/sunny-cloudy.svg';
import thunder from './assets/thunder.svg';
import windy from './assets/windy.svg';
import rainy from './assets/rainy.svg';
import heart from './assets/heart-plus.svg'

const API_KEY = '6d3d00323f6dd5b83392fa54db270c66';

const FavoritesPanel = ({ favorites, isFahrenheit}) => {
  const [weatherData, setWeatherData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState('next');
  const [slideKey, setSlideKey] = useState(0);

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
  
  const handlePrev = () => {
    setDirection('prev');
    setSlideKey((prev) => prev + 1); // force remount
    setActiveIndex((prev) => (prev === 0 ? weatherData.length - 1 : prev - 1));
    };

    const handleNext = () => {
    setDirection('next');
    setSlideKey((prev) => prev + 1); // force remount
    setActiveIndex((prev) => (prev === weatherData.length - 1 ? 0 : prev + 1));
    };

  const entry = weatherData[activeIndex];

  return (
    <div className="favorites-panel">
      <h2 className="carousel-title">Favorite Locations</h2>
      {entry && (
        <div className="carousel-container">
          <button className="carousel-button" onClick={handlePrev}>◀</button>
          <div key={slideKey} className={`favorite-tile carousel-slide ${direction}`}>
            <div className = "top-row">
                <div className = "carouselLeft">
                    <h3>{entry.name}</h3>
                    <p className="carousel-date">
                        {new Date(entry.current.dt * 1000).toLocaleDateString(undefined, {
                            weekday: 'long',
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                        })}
                    </p>
                    <img src={getWeatherIcon(entry.current.weather[0].main, entry.current.weather[0].description)} className="weatherImgFav" alt="Weather Image" />
                </div>
                <div className = "carouselMiddle">
                    <p className = "temperatureText">
                        {isFahrenheit
                        ? Math.round((entry.current.main.temp * 9) / 5 + 32)
                        : Math.round(entry.current.main.temp)}
                        <span className="degree">&nbsp;°{isFahrenheit ? 'F' : 'C'}&nbsp;</span>
                    </p>
                    <p className = "carouselSubText"><strong>Humidity:</strong> {entry.current.main.humidity}%</p>
                    <p className = "carouselSubText"><strong>Condition:</strong> {entry.current.weather[0].description}</p>
                </div>
            </div>
            <div className="forecast-row">
                {entry.forecast.map((f, i) => (
                  <div className="forecast-col" key={i}>
                    <p className = "forecast-time">{new Date(f.dt_txt).getHours()}:00</p>
                    <p className = "forecast-weather">
                        {isFahrenheit
                        ? Math.round((f.main.temp * 9) / 5 + 32)
                        : Math.round(f.main.temp)}
                        <span className="forecast-degree">&nbsp;°{isFahrenheit ? 'F' : 'C'}&nbsp;</span>
                        </p>
                  </div>
                ))}
            </div>
            
          </div>

          <button className="carousel-button" onClick={handleNext}>▶</button>
        </div>
      )}
    </div>
  );
};

export default FavoritesPanel;


