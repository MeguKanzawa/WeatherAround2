import React, { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  CircleMarker,
  useMapEvents
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// const santaClaraGeoJSON = {
//   type: "Feature",
//   properties: { name: "Santa Clara" },
//   geometry: {
//     type: "Polygon",
//     coordinates: [[
//       [-122.0, 37.3],
//       [-121.9, 37.3],
//       [-121.9, 37.4],
//       [-122.0, 37.4],
//       [-122.0, 37.3]
//     ]]
//   }
// };

export default function BayAreaMap({ onAreaSelect }) {
  const [clickedLocation, setClickedLocation] = useState(null); 

  // const geoJsonStyle = {
  //   fillColor: 'orange',
  //   weight: 2,
  //   color: 'darkorange',
  //   fillOpacity: 0.7,
  // };

  // const highlightFeature = (e) => {
  //   e.target.setStyle({
  //     weight: 3,
  //     color: '#666',
  //     fillOpacity: 0.9,
  //   });
  // };

  // const resetHighlight = (e) => {
  //   e.target.setStyle(geoJsonStyle);
  // };

  // const onFeatureClick = (e) => {
  //   const areaName = e.target.feature.properties.name;
  //   const latlng = e.latlng;

  //   setClickedLocation(latlng);
  //   onAreaSelect({
  //     name: areaName,
  //     lat: latlng.lat,
  //     lon: latlng.lng,
  //   });
  // };

  // const onEachFeature = (feature, layer) => {
  //   layer.on({
  //     mouseover: highlightFeature,
  //     mouseout: resetHighlight,
  //     click: onFeatureClick,
  //   });
  // };

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

  return (
    <div style={{ flex: 1, width: '100%', boxSizing: 'border-box'}}>
      <MapContainer
        style={{ height: '100%', width: '100%', boxSizing: 'border-box', border: "3px solid #7044C9", filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))", borderRadius: "18px" }}
        center={[37.3541, -121.9552]}
        zoom={12}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <ClickHandler onMapClick={onAreaSelect} />
        {/* <GeoJSON
          data={santaClaraGeoJSON}
          style={geoJsonStyle}
          onEachFeature={onEachFeature}
        /> */}
        {clickedLocation && (
          <CircleMarker
            center={[clickedLocation.lat, clickedLocation.lng]}
            radius={10}
            pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.5 }}
          />
        )}
      </MapContainer>
    </div>
  );
}
