import TileLayer from '@arcgis/core/layers/TileLayer';
import { HotspotMap } from '../../initialstates/hotspotMapsInitialState';
import Map from '@arcgis/core/Map';

import { ARC_ADD_HOTSPOT } from '../../../constants/actionTypes';
import { CONNECTIVITY_REF, ROAD_MORTALITY_REF } from '../../../constants/staticArcResources';

export default (arcMap: Map | null, newHotspotMap: HotspotMap) => (dispatch: React.Dispatch<any>) => {
  if (arcMap) {
    // Add the tile layers
    const connect = new TileLayer({
      url: CONNECTIVITY_REF[+newHotspotMap.arcResId],
    });
    connect.opacity = 0.5;
    const road_mortality = new TileLayer({
      url: ROAD_MORTALITY_REF[+newHotspotMap.arcResId],
    });
    road_mortality.opacity = 1.0;
    arcMap.add(connect);
    arcMap.add(road_mortality);

    dispatch({
      type: ARC_ADD_HOTSPOT,
      payload: { hotspotMap: newHotspotMap, tileLayers: [connect, road_mortality] },
    });
  }
};
