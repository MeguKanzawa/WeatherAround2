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
        height: '200vh',
        width: '93vw',
        display: 'flex',
        flexDirection: 'column',
      }}
    >


      {/* Main Content - snap start */}
      <section
        style={{
          height: favorites.length > 0 ? '60vh' : '100vh', // only show half if there's a bottom panel
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
          <Directions />
        </div>

        {/* Center: Map + Weather */}
        <div
          className="center"
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '71vh',
            maxHeight: '71vh',
            gap: '0.5rem',
            marginTop: '1rem',
          }}
        >
          {/* Bay Area Map */}
          <div
            style={{
              flex: '1 1 50%',
              height: '100%',
              minHeight: '71vh',
              display: 'flex',
              flexDirection: 'column',
            }}
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
            }}
          >
            <WeatherPanel location={location} onFavorite={addFavorite} />
          </div>
        </div>
      </section>

      {/* FavoritesPanel - snap start */}
      {favorites.length > 0 && (
        <section
          ref={favoritesRef}
          style={{
            scrollSnapAlign: 'start',
            minHeight: '100vh',
            width: '100%',
            padding: '0 1rem 1rem 1rem',
            marginTop: '20rem', // ← ADD THIS LINE for spacing
            boxSizing: 'border-box',
          }}
        >
          <FavoritesPanel favorites={favorites} />
        </section>
      )}

    </div>
  );
}

export default App;
