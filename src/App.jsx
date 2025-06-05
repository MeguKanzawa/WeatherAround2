// App.jsx
import { useState } from 'react';
import './App.css';
import BayAreaMap from './BayAreaMap';
import WeatherPanel from './WeatherPanel';

function App() {
  const [location, setLocation] = useState({
    name: 'Santa Clara',
    lat: 37.3541,
    lon: -121.9552,
  });

  return (
    <div style={{ display: 'flex', width: '100vw', height: '90vh' }}>
      <div style={{ flex: 1 }}>
        <BayAreaMap onAreaSelect={setLocation} />
      </div>
      <div style={{ flex: 1, minWidth: 0, overflowY: 'auto', borderLeft: '1px solid #ccc', padding: '1rem' }}>
        <WeatherPanel location={location} />
      </div>
    </div>
  );
}

export default App;

