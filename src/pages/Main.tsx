import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

import '../styles/pages/main.css';
import 'leaflet/dist/leaflet.css';

import mapMarkerIcon from '../assets/mapMarkerIcon';

import data from '../data/escolas.json';
import { LeafletMouseEvent } from 'leaflet';

export default function Main() {

  function AddMarkerToClick() {
    const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

    const map = useMapEvents({
      click(event: LeafletMouseEvent) {
        const { lat, lng } = event.latlng;
        setPosition({
          latitude: lat,
          longitude: lng,
        });
        console.log(position);
      }
    })

    return(
      position.latitude !== 0 ?
      (
        <Marker 
          position={[position.latitude, position.longitude]}
          icon={mapMarkerIcon}/>
      ) :
      null
    );
  }

  return (

    <div id="main-container">
      <aside>
        <input type="text" placeholder="Entre com o nome da escola"/>
      </aside>

      <MapContainer
        center={[-22.7244976,-47.6352641]}
        zoom={12.5}
        style={{ width: '100%', height: '100%' }}>

        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {data.escolas.map(escola => {
            return(
              <Marker
                icon={mapMarkerIcon}
                position={[escola.latitude,escola.longitude]}
                key={escola.id}>
                <Popup className="map-popup">
                  <strong>{escola.nome}</strong><br />
                  {escola.endereco}<br />
                  {escola.bairro}<br />
                  Telefone: <strong>{escola.telefone}</strong><br />
                  Região: {escola.regiao}<br />
                </Popup>
              </Marker>
            )
        })}

        <AddMarkerToClick/>

      </MapContainer>
    </div>
  )
}
