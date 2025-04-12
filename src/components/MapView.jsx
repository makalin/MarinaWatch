import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapView({ entries }) {
  return (
    <MapContainer center={[37, 27]} zoom={5} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {entries.map((entry, i) => (
        <Marker key={i} position={[entry.lat, entry.lng]}>
          <Popup>
            <strong>{entry.vessel || 'Vessel'}</strong><br />
            {entry.marina || 'Marina'}<br />
            {entry.year} - €{entry.price}<br />
            {entry.country}, {entry.region}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;