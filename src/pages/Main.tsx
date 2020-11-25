import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import '../styles/pages/main.css';
import 'leaflet/dist/leaflet.css';

import mapMarkerIcon from '../assets/mapMarkerIcon';

import data from '../data/escolas.json';

export default function Main() {
  console.log(data.escolas);
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

        {data.escolas.map(escola => {
            return(
              <Marker
                icon={mapMarkerIcon}
                position={[escola.latitude,escola.longitude]}
                key={escola.id}>
                <Popup>
                  {escola.nome}<br />
                  {escola.endereco}<br />
                  {escola.bairro}<br />
                  Telefone: {escola.telefone}<br />
                  Região: {escola.regiao}<br />
                </Popup>
              </Marker>
            )
        })}


      </MapContainer>
    </div>
  )
}
