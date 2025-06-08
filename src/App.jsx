// App.jsx
import { useState } from 'react';
import './App.css';
import BayAreaMap from './BayAreaMap';
import WeatherPanel from './WeatherPanel';
import NavBar from "./NavBar";
import Directions from "./Directions";


function App() {
  const [location, setLocation] = useState({
    name: 'Santa Clara',
    lat: 37.3541,
    lon: -121.9552,
  });
  return (
 
    // Root / AllContents
    <div style={{ display: 'flex', width: '90vw', height: '100vh', flexDirection: 'column', alignItems: 'center'}}>
      {/* For Nav Bar */}
      <div style={{border: '2px dashed red', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'stretch', gap: '1rem', width:'100%', height:'15%'}}>
        <NavBar></NavBar>
      </div>
      {/* Direction + Center */}
      <div style = {{display: 'flex', width: '100%', height: '80vh', flexDirection: 'column', alignItems: 'flex-start', maxHeight: '80vh'}}>
        {/* Direction */}
        <div style = {{border: '2px dashed red', width: '100%', marginTop: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
          <Directions></Directions>
        </div>
        {/* Center */}  
        <div style = {{display: 'flex', width: '100%', height: '72vh', flexDirection: 'row', alignItems: 'flex-start', padding: '0rem', margin: '0', maxHeight: '72vh'}}>
          {/* Bay Area Map Panel */}
          <div style = {{border: '2px dashed red', height: '90vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '0.2rem',  gap: '0rem', alignSelf: 'stretch', height: '100%', maxHeight: '90vh'}}>
            <BayAreaMap onAreaSelect={setLocation}/>
          </div>
          {/* Weather Panel / All Tiles */}
          <div style={{border: '2px dashed red', width: '100%', display: 'flex', flexDirection: 'column',
            height: '100%', padding: '0.2rem', maxHeight: '100%', overflow: 'auto'}}>
            <WeatherPanel location={location} />
          </div>
        </div>
      </div>

      {/* <div style={{ flex: 1, height: '100%' }}>
        <div className="top-bar">
      <div className="logo-bar">
        <div className="logo-area">
          <img src={sun} alt="Sun" className="sun" />
          <img src={mainLogo} alt="Main Logo" className="main-logo" />
        </div>
        <div className="weather-around">WeatherAround</div>
      </div>

      <div className="contact-help-area">
        <div className="contact">
          <img src={contact} alt="Contact Logo" className="contact-logo" />
          <div className="contact-text">Contact Me!</div>
        </div>
        <div className="help">
          <img src={help} alt="Help Logo" className="help-logo" />
          <div className="help-text">Help</div>
        </div>
      </div>
    </div>
    <div className = "DirectionsCenter">
      <div className = "Directions">
        <img src = {pin} alt = "Pin" className = "pin"/>
        <p className = "DirectionsText">Add a <span className = "DirectionsPinText">pin</span> to a location to explore!</p>
      </div>
      <div className = "Center">
        <div className = "BayAreaMapPanel">
          
        </div>
      </div>
    </div>

      </div> */}
      
    </div>
  );
}

export default App;


