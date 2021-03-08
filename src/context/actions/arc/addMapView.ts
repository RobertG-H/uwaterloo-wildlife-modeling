import MapView from '@arcgis/core/views/MapView';
import { ARC_ADD_MAPVIEW } from '../../../constants/actionTypes';

export default (newMapView: MapView) => (dispatch: React.Dispatch<any>) => {
  dispatch({
    type: ARC_ADD_MAPVIEW,
    payload: newMapView,
  });
};
