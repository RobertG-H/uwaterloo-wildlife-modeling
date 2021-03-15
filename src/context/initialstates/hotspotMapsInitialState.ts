const initSlopeValues = () => {
  return {
    '0 - 20': [0, 0],
    '21 - 40': [0, 0],
    '> 41': [0, 0],
  };
};

const initLandCoverValeus = () => {
  return {
    Beach: [0, 0],
    'Sand Dune Systems': [0, 0],
    Cliff: [0, 0],
    Alvar: [0, 0],
    Tallgrass: [0, 0],
    'Coniferous Forest': [0, 0],
    'Mixed Forest': [0, 0],
    'Deciduous Forest': [0, 0],
    Wetland: [0, 0],
    'Open Water': [0, 0],
    Agriculture: [0, 0],
    'Built-Up Area': [0, 0],
    Undifferentiated: [0, 0],
    'Highway / Expressway': [0, 0],
    'Arterial Road': [0, 0],
    'Collector Road': [0, 0],
    'Resource / Rec Road': [0, 0],
    'Service Road': [0, 0],
    'Alleyway / Laneway': [0, 0],
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
  landCoverValues: { [landCover: string]: number[] };
  slopeValues: { [landCover: string]: number[] };
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
