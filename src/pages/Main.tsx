import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import AutoSuggest from 'react-autosuggest';

import '../styles/pages/main.css';
import 'leaflet/dist/leaflet.css';

import mapMarkerIcon from '../assets/mapMarkerIcon';

import data from '../data/escolas.json';

export default function Main() {

  //const [schools, setSchools] = useState([{}]);
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  function handleFilterSchools(event: React.FormEvent<HTMLInputElement>) {
    const search = event.currentTarget.value;

    const filtered = data.escolas.filter(escola => escola.nome.toLowerCase().includes(search.toString().toLowerCase()));

    const schoolNames: string[] = filtered.map(obj => obj.nome);

    setSuggestions(schoolNames)
    
    console.log(suggestions);
  }

  return (

    <div id="main-container">
      <aside>
        <input type="text" placeholder="Entre com o nome da escola" onChange={handleFilterSchools}/>
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

      </MapContainer>
    </div>
  )
}
