import Leaflet from 'leaflet';

import mapMarkerIcon from '../images/marker-icon.png';

const mapMarker = Leaflet.icon({
  iconUrl: mapMarkerIcon,
  iconSize: [30, 47],
  
})

export default mapMarker;