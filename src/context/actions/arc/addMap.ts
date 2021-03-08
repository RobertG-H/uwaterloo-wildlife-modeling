import Map from '@arcgis/core/Map';

import { ARC_ADD_MAP } from '../../../constants/actionTypes';

export default (newMap: Map) => (dispatch: React.Dispatch<any>) => {
  dispatch({
    type: ARC_ADD_MAP,
    payload: newMap,
  });
};
