import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import LegendViewModel from '@arcgis/core/widgets/Legend/LegendViewModel';
import TileLayer from '@arcgis/core/layers/TileLayer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';

interface arcState {
  authenticated: boolean;
  loading: boolean;
  arcMap: Map | null;
  arcMapView: MapView | null;
  legendVM: LegendViewModel | null;
  defaultLayers: TileLayer[];
  regionSelectLayers: FeatureLayer[];
  hotspotMapTileLayers: { [arcResId: string]: TileLayer[] };
}

export default {
  authenticated: false,
  loading: true,
  arcMap: null,
  arcMapView: null,
  legendVM: null,
  defaultLayers: [],
  regionSelectLayers: [],
  hotspotMapTileLayers: {},
} as arcState;
