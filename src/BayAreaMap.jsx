import React, { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  CircleMarker,
  useMapEvents
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import pin from './assets/pin.svg'
import {Marker} from 'react-leaflet';
import './BayAreaMap.css';

export default function BayAreaMap({ onAreaSelect }) {
  // stores the clicked location and the function that gets triggered
  const [clickedLocation, setClickedLocation] = useState(null); 
  // handles clicks
  function ClickHandler({ onMapClick }) {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setClickedLocation({ lat, lng });
        onMapClick({
          name: `Clicked Location`,
          lat,
          lon: lng,
        });
      },
    });
    return null;
  }

  // returns the components for the Leaflet
  return (
    <div style={{ flex: 1, width: '100%', boxSizing: 'border-box'}}>
      {/* overall map component */}
      <MapContainer
        className="custom-cursor"
        style={{
          height: '100%',
          width: '100%',
          boxSizing: 'border-box',
          border: '5px solid #7044C9',
          filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
          borderRadius: '18px'
        }}
        center={[37.3541, -121.9552]}
        zoom={12}
        scrollWheelZoom={true}
      >
        {/* base map component */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* click action */}
        <ClickHandler onMapClick={onAreaSelect} />
        {clickedLocation && (
          <Marker
            position={[clickedLocation.lat, clickedLocation.lng]}
            icon={pinIcon}
          />
        )}
      </MapContainer>
    </div>
  );
}

// make the cursor the pin image
const pinIcon = new L.DivIcon({
  html: `<img src="${pin}" style="width: 2rem; height: 2rem;" alt="marker"/>`,
  iconSize: [30, 30],
  className: 'custom-pin-icon'
});
