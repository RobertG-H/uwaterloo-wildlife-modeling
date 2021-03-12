const initSlopeValues = () => {
  return {
    '0 - 20': 0,
    '21 - 40': 0,
    '>41': 0,
  };
};

const initLandCoverValeus = () => {
  return {
    Agriculture: 0,
    Alvar: 0,
    Beach: 0,
    'Built-Up Area': 0,
    Cliff: 0,
    'Forest - Coniferous': 0,
    'Forest - Deciduous': 0,
    'Forest - Mixed': 0,
    'Open Water': 0,
    'Sand Dune Systems': 0,
    Tallgrass: 0,
    Wetland: 0,
    Undifferentiated: 0,
    'Road - Alleyway / Laneway': 0,
    'Road - Arterial': 0,
    'Road - Collector': 0,
    'Road - Freeway': 0,
    'Road - Highway/Expressway': 0,
    'Road - Resource': 0,
    'Road - Service': 0,
  };
};

export function CreateEmptyHotspotMap(hotspotMapId: string) {
  const newHotspotMap: HotspotMap = {
    hotspotMapId: hotspotMapId,
    outputName: '',
    arcResId: '',
    landCoverValues: initLandCoverValeus(),
    slopeValues: initSlopeValues(),
    speciesName: '',
    outputTypes: {
      hotspots: false,
      connectivity: false,
    },
    extent: [0, 0, 0, 0],
  };
  return newHotspotMap as HotspotMap;
}

export interface HotspotMap {
  hotspotMapId: string;
  outputName: string;
  arcResId: string;
  landCoverValues: { [landCover: string]: number };
  slopeValues: { [landCover: string]: number };
  speciesName: string;
  outputTypes: { [outputType: string]: boolean };
  extent: number[];
}

interface hotspotMapsState {
  hotspotMaps: { [hotspotMapId: string]: HotspotMap };
}

export default {
  hotspotMaps: {},
} as hotspotMapsState;
