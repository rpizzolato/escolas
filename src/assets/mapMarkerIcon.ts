import Leaflet from 'leaflet';

import mapMarkerIcon from '../images/marker-icon.png';

const mapMarker = Leaflet.icon({
  iconUrl: mapMarkerIcon,
  iconSize: [30, 47],
  iconAnchor: [15, 47],
  popupAnchor: [0, -50]
})

export default mapMarker;