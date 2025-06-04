// App.jsx
import { useState } from 'react';
import './App.css';
import BayAreaMap from './BayAreaMap';
import WeatherPanel from './WeatherPanel';

function App() {
  const [selectedLocation, setSelectedLocation] = useState({
    name: 'Santa Clara',
    lat: 37.3541,
    lon: -121.9552,
  });

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 2 }}>
        <BayAreaMap onAreaSelect={setSelectedLocation} />
      </div>
      <div style={{ flex: 1, borderLeft: '1px solid #ccc', padding: '1rem' }}>
        <WeatherPanel location={selectedLocation} />
      </div>
    </div>
  );
}

export default App;

