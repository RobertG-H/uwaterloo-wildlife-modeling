import { HOTSPOT_ADD, HOTSPOT_DELETE, HOTSPOT_REPLACE } from '../../constants/actionTypes';

const hotspotMaps = (state: any, action: any) => {
  switch (action.type) {
    case HOTSPOT_ADD: {
      const key = action.payload.hotspotMapId;
      if (state.hotspotMaps[key]) {
        console.log('Outputmap with id already exists. Not adding');
        return state;
      }
      const newHotspotMaps = state.hotspotMaps;
      newHotspotMaps[key] = action.payload;
      return {
        ...state,
        hotspotMaps: {
          ...newHotspotMaps,
        },
      };
    }

    default:
      return state;
  }
};

export default hotspotMaps;
