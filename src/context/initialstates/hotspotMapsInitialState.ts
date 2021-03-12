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

export class HotspotMap {
  public hotspotMapId: string;
  public outputName: string;
  public arcResId: string;
  public landCoverValues: { [landCover: string]: number };
  public slopeValues: { [landCover: string]: number };
  public speciesName: string;
  public outputTypes: { [outputType: string]: boolean };
  public extent: number[];
  constructor(hotspotMapId: string) {
    this.hotspotMapId = hotspotMapId;
    this.outputName = '';
    this.arcResId = '';
    this.landCoverValues = initLandCoverValeus();
    this.slopeValues = initSlopeValues();
    this.speciesName = '';
    this.outputTypes = {
      hotspots: false,
      connectivity: false,
    };
    this.extent = [0, 0, 0, 0];
  }
}

interface hotspotMapsState {
  hotspotMaps: { [hotspotMapId: string]: HotspotMap };
}

export default {
  hotspotMaps: {},
} as hotspotMapsState;
