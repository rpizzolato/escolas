import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import '../styles/pages/main.css';
import 'leaflet/dist/leaflet.css';

export default function Main() {
  return (
    <div id="main-container">
      <aside>
        <input type="text" placeholder="Entre com o nome da escola"/>
      </aside>

      <MapContainer
        center={[-22.7244976,-47.6352641]}
        zoom={13}
        style={{ width: '100%', height: '100%' }}>

        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      </MapContainer>
    </div>
  )
}
