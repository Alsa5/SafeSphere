import React from "react";
import { MapContainer, TileLayer, Rectangle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";

const chennaiBounds = [
  [12.9, 79.95], // West-South boundary (restricted further inland)
  [13.3, 80.25], // East-North boundary
];

const coimbatoreBounds = [
  [10.9, 76.85], // Southwest boundary
  [11.1, 77.1],  // Northeast boundary
];

const colors = ["green", "red", "orange"];

const generateSquares = (bounds, count) => {
  const [minLat, minLng] = bounds[0];
  const [maxLat, maxLng] = bounds[1];
  const squares = [];

  for (let i = 0; i < count; i++) {
    const lat = Math.random() * (maxLat - minLat) + minLat;
    const lng = Math.random() * (maxLng - minLng) + minLng;
    const size = 0.02; // Square size
    squares.push({
      bounds: [
        [lat, lng],
        [lat + size, lng + size]
      ],
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }
  return squares;
};

const chennaiSquares = generateSquares(chennaiBounds, 50);
const coimbatoreSquares = generateSquares(coimbatoreBounds, 50);

const App = () => {
  return (
    <div className="app-container">
      <h1>Heatmaps - Know your arena!</h1>
      <div id="map">
        <MapContainer center={[12.97, 80.22]} zoom={11} style={{ height: "500px", width: "80%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {chennaiSquares.concat(coimbatoreSquares).map((sq, index) => (
            <Rectangle key={index} bounds={sq.bounds} pathOptions={{ color: sq.color, fillOpacity: 0.5 }} />
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default App;
