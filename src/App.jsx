import { useState, useRef, useEffect } from 'react';
import './App.css';
import BayAreaMap from './BayAreaMap';
import WeatherPanel from './WeatherPanel';
import NavBar from "./NavBar";
import Directions from "./Directions";
import FavoritesPanel from "./FavoritesPanel";
import { motion, AnimatePresence } from 'framer-motion';


function App() {
  const [location, setLocation] = useState({
    name: 'Santa Clara',
    lat: 37.3541,
    lon: -121.9552,
  });
  const [favorites, setFavorites] = useState([]);
  const favoritesRef = useRef(null);
  const mapRef = useRef(null);
  const weatherRef = useRef(null);
  const [tooltipStep, setTooltipStep] = useState(0);
  const [isFahrenheit, setIsFahrenheit] = useState(true);
  const toggleTempUnit = () => setIsFahrenheit(prev => !prev);
  const favoriteBtnRef = useRef(null);


  const addFavorite = (loc) => {
    if (!favorites.some(f => f.lat === loc.lat && f.lon === loc.lon)) {
      setFavorites(prev => [...prev, loc]);
    }
    setTimeout(() => {
      favoritesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setTooltipStep((prev) => (prev < 3 ? prev + 1 : 0)); // reset at step 3
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Wait for refs to mount before showing tooltip
    const initTooltip = setTimeout(() => {
      if (mapRef.current && weatherRef.current && favoriteBtnRef.current) {
        setTooltipStep(1); // start from the map tooltip
      }
    }, 300); // small delay to allow mounting

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(initTooltip);
    };
  }, []);


  return (
    <div
      style={{
        width: '93vw',
        display: 'flex',
        flexDirection: 'column',
      }}
    >

      <section
        style={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0.5rem',
          boxSizing: 'border-box',
          flexShrink: 0,
          position: 'relative', // Important for absolute tooltips
        }}
      >

        <div style={{ width: '100%', height: '15%', minHeight: '60px' }}>
          <NavBar />
        </div>

        <div style={{ width: '100%', marginTop: '2rem' }}>
          <Directions isFahrenheit={isFahrenheit} toggleTempUnit={toggleTempUnit} />
        </div>

        {/* Center */}
        <div className="center">
          <div
            className="map-panel"
            ref={mapRef}
            style={{
              flex: '1 1 50%',
              height: '100%',
              minHeight: '71vh',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            <BayAreaMap onAreaSelect={setLocation} />
          </div>

          <div
            className="weather-panel"
            ref={weatherRef}
            style={{
              flex: '1 1 50%',
              height: '100%',
              overflowY: 'auto',
              padding: '0.2rem',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            <WeatherPanel location={location} onFavorite={addFavorite} isFahrenheit={isFahrenheit} favoriteBtnRef={favoriteBtnRef} />
          </div>
        </div>

        {/* Tooltip Elements */}
        {tooltipStep === 1 && mapRef.current && (
        <motion.div
          className="tooltip"
          data-position="top"
          style={getTooltipPosition(mapRef.current, "top")}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          Click anywhere on the map to investigate a location.
        </motion.div>
      )}

      {tooltipStep === 2 && weatherRef.current && (
        <motion.div
          className="tooltip"
          data-position="top"
          style={getTooltipPosition(weatherRef.current, "top")}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          Here's the current weather for your selected location.
        </motion.div>
      )}

      {tooltipStep === 3 && favoriteBtnRef.current && (
        <motion.div
          className="tooltip"
          data-position="top"
          style={getTooltipPosition(favoriteBtnRef.current, "top")}
        >
          Click the heart to save this location to Favorites!
        </motion.div>
      )}

      </section>

      {favorites.length > 0 && (
        <section ref={favoritesRef} className="favorite-snap">
          <FavoritesPanel favorites={favorites} isFahrenheit={isFahrenheit} />
        </section>
      )}

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Megu Kanzawa. WeatherAround. All rights reserved.</p>
      </footer>

    </div>
  );
}

function getTooltipPosition(refEl, position = "top") {
  const rect = refEl.getBoundingClientRect();
  const offset = 10;
  const base = {
    position: 'absolute',
    background: '#006FC8',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    fontSize: '0.9rem',
    zIndex: 1000,
    maxWidth: '240px',
    textAlign: 'center',
  };

  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

  if (position === "top") {
    return {
      ...base,
      top: rect.top + scrollTop - offset - 40,
      left: rect.left + scrollLeft + rect.width / 2 - 120,
    };
  } else if (position === "bottom") {
    return {
      ...base,
      top: rect.bottom + scrollTop + offset,
      left: rect.left + scrollLeft + rect.width / 2 - 120,
    };
  }
  return base;
}

export default App;
