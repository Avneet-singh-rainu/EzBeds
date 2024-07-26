import React from "react";
import { useLocation } from "react-router";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Ensure Leaflet's CSS is imported
import { colors } from "@mui/material";
import L from "leaflet";

// Create a custom icon using an online home icon image
const customHomeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/25/25694.png", // URL of the home icon
  iconSize: [38, 38], // Size of the icon
  iconAnchor: [19, 38], // Anchor of the icon (point of the icon which will correspond to marker's location)
  popupAnchor: [0, -38], // Anchor of the popup relative to the iconAnchor
});

function Map() {
  const location = useLocation();
  const p = location.state.location; // Initial map center position
  const d = location.state.dest; // Initial map center position
  const [position, setPosition] = [[p.latitude, p.longitude]];
  const [dest, setDest] = [[d.latitude, d.longitude]];

  return (
    <div style={styles.mapcontainer}>
      <MapContainer
        center={position}
        zoom={8}
        style={{ height: "800px", width: "900px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={customHomeIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Marker position={dest} style={{ colors: "red" }}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

const styles = {
  mapcontainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    height: "80vh",
  },
};

export default Map;
