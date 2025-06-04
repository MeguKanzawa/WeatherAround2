// BayAreaMap.jsx
import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const santaClaraGeoJSON = {
  type: "Feature",
  properties: { name: "Santa Clara" },
  geometry: {
    type: "Polygon",
    coordinates: [[
      [-122.0, 37.3],
      [-121.9, 37.3],
      [-121.9, 37.4],
      [-122.0, 37.4],
      [-122.0, 37.3]
    ]]
  }
};

export default function BayAreaMap({ onAreaSelect }) {
  const geoJsonStyle = {
    fillColor: 'orange',
    weight: 2,
    color: 'darkorange',
    fillOpacity: 0.7,
  };

  const highlightFeature = (e) => {
    e.target.setStyle({
      weight: 3,
      color: '#666',
      fillOpacity: 0.9,
    });
  };

  const resetHighlight = (e) => {
    e.target.setStyle(geoJsonStyle);
  };

  const onFeatureClick = (e) => {
    const areaName = e.target.feature.properties.name;

    // Default Santa Clara center
    onAreaSelect({
      name: areaName,
      lat: 37.3541,
      lon: -121.9552,
    });
  };

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: onFeatureClick,
    });
  };

  return (
    <div style={{ height: '100%' }}>
      <MapContainer
        style={{ height: '100%', width: '100%' }}
        center={[37.3541, -121.9552]}
        zoom={12}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <GeoJSON
          data={santaClaraGeoJSON}
          style={geoJsonStyle}
          onEachFeature={onEachFeature}
        />
      </MapContainer>
    </div>
  );
}
