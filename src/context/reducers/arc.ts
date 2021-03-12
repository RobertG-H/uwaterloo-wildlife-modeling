import initialState from '../initialstates/arcInititialState';
import {
  AUTHACTIONTYPES,
  ARC_LOGIN_SUCCESS,
  ARC_LOGIN_ERROR,
  ARC_LOGIN_LOADING,
  ARC_ADD_MAP,
  ARC_ADD_MAPVIEW,
  ARC_ADD_DEFAULT_LAYERS,
  ARC_ADD_LEGEND_VM,
  ARC_ADD_HOTSPOT,
} from '../../constants/actionTypes';

const arc = (state: typeof initialState, action: AUTHACTIONTYPES) => {
  switch (action.type) {
    case ARC_LOGIN_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ARC_LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        loading: false,
      };
    case ARC_LOGIN_ERROR:
      return {
        ...state,
        authenticated: false,
        loading: false,
      };
    case ARC_ADD_MAP:
      return {
        ...state,
        arcMap: action.payload,
      };
    case ARC_ADD_MAPVIEW:
      return {
        ...state,
        arcMapView: action.payload,
      };
    case ARC_ADD_DEFAULT_LAYERS:
      return {
        ...state,
        defaultLayers: action.payload,
      };
    case ARC_ADD_LEGEND_VM:
      return state;
    case ARC_ADD_HOTSPOT: {
      const key = action.payload.hotspotMap.arcResId;
      if (state.hotspotMapTileLayers[key]) {
        console.error('Outputmap with id already exists. You should only call this function with correct arcResId.');
        return state;
      }
      const newHotspotMapTileLayers = state.hotspotMapTileLayers;
      newHotspotMapTileLayers[key] = action.payload.tileLayers;
      return {
        ...state,
        hotspotMaps: {
          ...newHotspotMapTileLayers,
        },
      };
    }

    default:
      return state;
  }
};

export default arc;
