import TileLayer from '@arcgis/core/layers/TileLayer';

import { ARC_ADD_DEFAULT_LAYERS } from '../../../constants/actionTypes';

export default (newLayers: TileLayer[]) => (dispatch: React.Dispatch<any>) => {
  dispatch({
    type: ARC_ADD_DEFAULT_LAYERS,
    payload: newLayers,
  });
};
