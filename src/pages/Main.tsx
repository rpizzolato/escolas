import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import AutoSuggest from 'react-autosuggest';

import '../styles/pages/main.css';
import 'leaflet/dist/leaflet.css';

import mapMarkerIcon from '../assets/mapMarkerIcon';

import data from '../data/escolas.json';

interface SchoolAndLocation {
  name: string,
  location: number[]
}

export default function Main() {

  const [flyValue, setFlyValue] = useState<number[]>([]);
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<SchoolAndLocation[]>([]);

  const schoolAndLocation = data.escolas.map(escola => {
    return {
      name: escola.nome.toLowerCase(),
      location: [
        escola.latitude,
        escola.longitude
      ]
    }
  })

  function getSuggestions(value: string): SchoolAndLocation[] {

    return schoolAndLocation.filter(school => school.name.includes(value.trim().toLowerCase()));
  }

  function FlyToComponent() {
    const map = useMap();
    const [lat, lng] = flyValue;

    flyValue.length === 0 ? console.log('vazio') : map.flyTo([lat,lng], 18)

    return null;
  }

  return (

    <div id="main-container">
      <aside>
        <AutoSuggest
          suggestions={suggestions}
          onSuggestionsClearRequested={() => setSuggestions([])}
          onSuggestionsFetchRequested={({ value }) => {
            setValue(value);
            setSuggestions(getSuggestions(value));
          }}
            onSuggestionSelected={(_, { suggestionValue, suggestion }) => {
              console.log("Selected: " + suggestionValue)
              const [lat, lng] = suggestion.location;
              setFlyValue([lat, lng])
            
            }
          }
          getSuggestionValue={suggestion => suggestion.name}
          renderSuggestion={suggestion => <span>{suggestion.name}</span>}
          inputProps={{
            placeholder: "Digite o nome da escola",
            value: value,
            onChange: (_, { newValue, method }) => {
              setValue(newValue);
            }
          }}
          highlightFirstSuggestion={true}
        />
      </aside>

      <MapContainer
        center={[-22.7244976,-47.6352641]}
        zoom={12.5}
        style={{ width: '100%', height: '100%' }}>

          <FlyToComponent />

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
