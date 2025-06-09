import { useState, useRef } from 'react';
import './App.css';
import BayAreaMap from './BayAreaMap';
import WeatherPanel from './WeatherPanel';
import NavBar from "./NavBar";
import Directions from "./Directions";
import FavoritesPanel from "./FavoritesPanel";

function App() {
  const [location, setLocation] = useState({
    name: 'Santa Clara',
    lat: 37.3541,
    lon: -121.9552,
  });
  const [favorites, setFavorites] = useState([]);
  const favoritesRef = useRef(null);
  const [isFahrenheit, setIsFahrenheit] = useState(true);
  const toggleTempUnit = () => setIsFahrenheit(prev => !prev);


  const addFavorite = (loc) => {
    if (!favorites.some(f => f.lat === loc.lat && f.lon === loc.lon)) {
      setFavorites(prev => [...prev, loc]);
    }
    setTimeout(() => {
      favoritesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  };

  return (
    <div
      style={{
        // height: '200vh',
        width: '93vw',
        display: 'flex',
        flexDirection: 'column',
      }}
    >


      {/* Main Content - snap start */}
      <section
        style={{
          height: '100vh', // only show half if there's a bottom panel
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0.5rem', // small padding to avoid overflow
          boxSizing: 'border-box',
          flexShrink: 0, // don't shrink this section
        }}
      >


        {/* NavBar */}
        <div style={{ width: '100%', height: '15%', minHeight: '60px' }}>
          <NavBar />
        </div>

        {/* Directions */}
        <div style={{ width: '100%', marginTop: '2rem' }}>
          <Directions isFahrenheit={isFahrenheit} toggleTempUnit={toggleTempUnit} />
        </div>

        {/* Center: Map + Weather */}
        <div
          className="center"
        >
          {/* Bay Area Map */}
          <div
            style={{
              flex: '1 1 50%',
              height: '100%',
              minHeight: '71vh',
              display: 'flex',
              flexDirection: 'column',
            }} className = "map-panel"
          >
            <BayAreaMap onAreaSelect={setLocation} />
          </div>

          {/* Weather Panel */}
          <div
            style={{
              flex: '1 1 50%',
              height: '100%',
              overflowY: 'auto',
              padding: '0.2rem',
              display: 'flex',
              flexDirection: 'column',
            }} className = "weather-panel"
          >
            <WeatherPanel location={location} onFavorite={addFavorite} isFahrenheit={isFahrenheit} />
          </div>
        </div>
      </section>

      {/* FavoritesPanel - snap start */}
      {favorites.length > 0 && (
        <section ref={favoritesRef} className="favorite-snap">
          <FavoritesPanel favorites={favorites} isFahrenheit={isFahrenheit} />
        </section>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Megu Kanzawa. WeatherAround. All rights reserved.</p>
      </footer>

    </div>

  );
}

export default App;
