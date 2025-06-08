import React, { useEffect, useState } from 'react';
import axios from 'axios';
import sunwind from './assets/Sunny and windy.svg'
import './WeatherPanel.css'

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
  }

  if (!weatherTiles.length) {
    return <p className="p-4">Click on a region to view weather info.</p>;
  }

  return (
  <div style={{position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '0rem', height: '100%', width: '100%'}}>
    {weatherTiles.map(tile => (
      <div key={tile.id} style = {{boxSizing: 'border-box', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: "0rem", filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))", borderRadius: '18px', alignSelf: 'stretch', border: '3px solid #006FC8', height: '35vh', marginBottom: '0.5rem'}}>
        <div className = "tileLeft">
          <h2 className = "locationText">
            {tile.name}
          </h2>
          <img src ={sunwind} className = "weatherImg" style = {{outline: '2px solid red'}} alt = "Weather Image"></img>
        </div>
        <div className = "tileRight">
          <div className = "tileRightTop">
            <h2 className = "temperatureText">
              {Math.round(tile.weather.main.temp)}<span className = "degree">&nbsp;°C&nbsp;</span>
            </h2>
          </div>
          <div className = "tileRightButtom">
            <div className = "tileRightLeft">
              <p className = "tileRightLeftText"><strong>Humidity</strong></p>
              <p className = "tileRightLeftText"><strong>Condition</strong></p>
            </div>
            <div className = "tileRightRight">
              <p className = "tileRightRightText"><strong> {tile.weather.main.humidity}%</strong></p>
              <p className = "tileRightRightText"><strong> {tile.weather.weather[0].description}</strong></p>
            </div>
          </div>
        </div>
        <button onClick={() => handleRemoveTile(tile.id)} className = "deleteButton" aria-label="Remove tile">
          <p className = "x">x</p>
        </button>
      </div>
    ))}
  </div>
    );
};

export default WeatherPanel;
/* Tile */



// <h2 className="text-lg font-semibold mb-1">
//           {tile.name}
//         </h2>
//         {/* Remove button */}
//           <button
//             onClick={() => handleRemoveTile(tile.id)}
//             className="absolute top-1 right-2 text-black hover:text-red-500 text-lg font-bold"
//             aria-label="Remove tile"
//           >
//             ×
//           </button>
//         <p className="text-sm text-gray-500 mb-2 ">
//           At Time: {tile.fetchedAt}
//         </p>
//         <p><strong>Temperature:</strong> {tile.weather.main.temp}°C</p>
//         <p><strong>Humidity:</strong> {tile.weather.main.humidity}%</p>
//         <p><strong>Condition:</strong> {tile.weather.weather[0].description}</p>


        // <div className = "tileRightRow">
        //   <p className = "tileRightRowLeft"><strong>Humidity </strong></p>
        //   <p className = "tileRightRowRight"><strong> {tile.weather.main.humidity}%</strong></p>
        // </div>
        // <div className = "tileRightRow">
        //   <p className = "tileRightRowLeft"><strong>Condition: </strong></p>
        //   <p className = "tileRightRowRight"><strong> {tile.weather.weather[0].description}</strong></p>
        // </div>

