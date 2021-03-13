import { HotspotMap } from '../../initialstates/hotspotMapsInitialState';

import { HOTSPOT_ADD } from '../../../constants/actionTypes';

export default (newHotspotMap: HotspotMap) => (dispatch: React.Dispatch<any>) => {
  dispatch({
    type: HOTSPOT_ADD,
    payload: newHotspotMap,
  });
};
