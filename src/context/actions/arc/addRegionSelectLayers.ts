import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import { ARC_ADD_REGION_SELECT_LAYERS } from '../../../constants/actionTypes';

export default (newLayers: FeatureLayer[]) => (dispatch: React.Dispatch<any>) => {
  dispatch({
    type: ARC_ADD_REGION_SELECT_LAYERS,
    payload: newLayers,
  });
};
