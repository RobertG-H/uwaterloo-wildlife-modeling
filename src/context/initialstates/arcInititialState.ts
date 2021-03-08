import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';

interface arcState {
  authenticated: boolean;
  loading: boolean;
  arcMap: Map | null;
  arcMapView: MapView | null;
}

export default {
  authenticated: false,
  loading: true,
  arcMap: null,
  arcMapView: null,
} as arcState;
