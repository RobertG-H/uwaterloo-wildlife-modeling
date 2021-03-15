const initSlopeValues = () => {
  return {
    '0 - 20': [95.15, 0],
    '21 - 40': [3.5, 0],
    '> 41': [1.34, 0],
  };
};

const initLandCoverValeus = () => {
  return {
    Beach: [0.018, 0],
    'Sand Dune Systems': [0.013, 0],
    Cliff: [0.011, 0],
    Alvar: [0.007, 0],
    Tallgrass: [0.02, 0],
    'Coniferous Forest': [0.983, 0],
    'Mixed Forest': [1.726, 0],
    'Deciduous Forest': [4.336, 0],
    Wetland: [7.92, 0],
    'Open Water': [29.81, 0],
    Agriculture: [30.75, 0],
    'Built-Up Area': [4.662, 0],
    Undifferentiated: [17.03, 0],
    'Highway / Expressway': [0.07, 0],
    'Arterial Road': [0.063, 0],
    'Collector Road': [2.363, 0],
    'Resource / Rec Road': [0.212, 0],
    'Service Road': [0.002, 0],
    'Alleyway / Laneway': [0.012, 0],
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
