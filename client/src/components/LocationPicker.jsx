import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function LocationMarker({ coordinates, setCoordinates }) {
  useMapEvents({
    click(e) {
      setCoordinates([e.latlng.lng, e.latlng.lat]);
    },
  });

  return (
    <Marker
      position={[coordinates[1], coordinates[0]]}
    />
  );
}

function LocationPicker({
  coordinates,
  setCoordinates,
}) {
  return (
    <MapContainer
      center={[coordinates[1], coordinates[0]]}
      zoom={14}
      style={{
        height: "400px",
        width: "100%",
        borderRadius: "20px",
      }}
    >
      <TileLayer
        attribution="OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarker
        coordinates={coordinates}
        setCoordinates={setCoordinates}
      />
    </MapContainer>
  );
}

export default LocationPicker;