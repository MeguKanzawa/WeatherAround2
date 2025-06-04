// src/BayAreaMap.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function BayAreaMap() {
  const [countyData, setCountyData] = useState(null);
  const [selectedAreaData, setSelectedAreaData] = useState(null);

  useEffect(() => {
    fetch('/santaClaraCounty.geojson')
      .then((response) => response.json())
      .then((data) => setCountyData(data))
      .catch((error) => console.error('Error loading GeoJSON:', error));
  }, []);

  const geoJsonStyle = {
    fillColor: 'rgba(255, 165, 0, 0.5)', // semi-transparent orange
    weight: 2,
    color: 'darkorange',
    fillOpacity: 0.7,
  };

  const highlightFeature = (e) => {
    const layer = e.target;
    layer.setStyle({
      weight: 3,
      color: '#666',
      fillOpacity: 0.9,
    });
  };

  const resetHighlight = (e) => {
    const layer = e.target;
    layer.setStyle(geoJsonStyle);
  };

  const onFeatureClick = (e) => {
    const areaName = e.target.feature.properties.name || 'Santa Clara County';

    // Simulate fetching real-time data (replace with your fetch call)
    const dummyData = {
      temperature: 22,
      humidity: 60,
      description: 'Sunny',
    };

    setSelectedAreaData({
      area: areaName,
      weather: dummyData,
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
    <div>
      <MapContainer
        style={{ height: '600px', width: '100%' }}
        center={[37.3541, -121.9552]} // Centered on Santa Clara
        zoom={10}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {countyData && (
          <GeoJSON
            data={countyData}
            style={geoJsonStyle}
            onEachFeature={onEachFeature}
          />
        )}
      </MapContainer>

      {selectedAreaData && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <h3>Real-time Weather Data for {selectedAreaData.area}</h3>
          <p>Temperature: {selectedAreaData.weather.temperature} °C</p>
          <p>Humidity: {selectedAreaData.weather.humidity} %</p>
          <p>Conditions: {selectedAreaData.weather.description}</p>
        </div>
      )}
    </div>
  );
}


// import 'leaflet/dist/leaflet.css';
// import React, { useState } from 'react';
// import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';

// // Santa Clara GeoJSON polygon (simplified)
// const santaClaraGeoJSON = {
//   type: "Feature",
//   properties: { name: "Santa Clara" },
//   geometry: {
//     type: "Polygon",
//     coordinates: [[
//       [-122.1, 37.1],
//       [-121.6, 37.1],
//       [-121.6, 37.5],
//       [-122.1, 37.5],
//       [-122.1, 37.1]
//     ]]
//   }
// };

// export default function BayAreaMap() {
//   const [selectedAreaData, setSelectedAreaData] = useState(null);

//   // Style polygons
//   const geoJsonStyle = {
//     fillColor: 'orange',
//     weight: 2,
//     color: 'darkorange',
//     fillOpacity: 0.7,
//   };

//   // Highlight style on hover
//   function highlightFeature(e) {
//     const layer = e.target;
//     layer.setStyle({
//       weight: 3,
//       color: '#666',
//       fillOpacity: 0.9
//     });
//   }

//   // Reset style on mouse out
//   function resetHighlight(e) {
//     const layer = e.target;
//     layer.setStyle(geoJsonStyle);
//   }

//   // On click fetch or show data
//   function onFeatureClick(e) {
//     const areaName = e.target.feature.properties.name;

//     // Simulate fetching real-time data (replace with your fetch call)
//     const dummyData = {
//       temperature: 22,
//       humidity: 60,
//       description: "Sunny",
//     };

//     setSelectedAreaData({
//       area: areaName,
//       weather: dummyData
//     });
//   }

//   // Attach event handlers for each feature
//   function onEachFeature(feature, layer) {
//     layer.on({
//       mouseover: highlightFeature,
//       mouseout: resetHighlight,
//       click: onFeatureClick,
//     });
//   }

//   return (
//     <div>
//       <MapContainer
//         style={{ height: '400px', width: '100%' }}
//         center={[37.3541, -121.9552]} // Bay Area center
//         zoom={11}
//         scrollWheelZoom={true}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution="&copy; OpenStreetMap contributors"
//         />
//         <GeoJSON
//           data={santaClaraGeoJSON}
//           style={geoJsonStyle}
//           onEachFeature={onEachFeature}
//         />
//       </MapContainer>

//       {selectedAreaData && (
//         <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
//           <h3>Real-time Weather Data for {selectedAreaData.area}</h3>
//           <p>Temperature: {selectedAreaData.weather.temperature} °C</p>
//           <p>Humidity: {selectedAreaData.weather.humidity} %</p>
//           <p>Conditions: {selectedAreaData.weather.description}</p>
//         </div>
//       )}
//     </div>
//   );
// }
