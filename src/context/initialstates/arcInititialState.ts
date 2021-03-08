import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';

interface arcState {
  arcMap: Map | null;
  arcMapView: MapView | null;
}

export default {
  arcMap: null,
  arcMapView: null,
} as arcState;
