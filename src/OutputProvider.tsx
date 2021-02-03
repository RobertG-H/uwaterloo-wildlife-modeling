import React from 'react';
import { v4 as uuidv4 } from 'uuid';

type ArcRes = {
  arcId: string;
  selectedRegionLandCover: string | null;
  selectedRegionShape: string | null;
  costMap: string | null;
  connectMap: string | null;
  hotspotMap: string | null;
};

// TODO update this to some database read when habitat quality values are automated.
const initHabitatQualityValues = () => {
  return {
    'Alvar - Open': 0,
    'Alvar - Shrub': 0,
    'Alvar - Treed': 0,
    'Beach/Bar - Open': 0,
    'Bedrock - Open': 0,
    Bog: 0,
    'Built -Up Area – Impervious': 0,
    'Built -Up Area – Pervious': 0,
    'Cliff and Talus - Open': 0,
    'Cliff and Talus - Treed': 0,
    'Extraction – Aggregate': 0,
    'Extraction – Peat/Topsoil': 0,
    Fen: 0,
    Forest: 0,
    'Forest - Coniferous': 0,
    'Forest - Deciduous': 0,
    'Forest - Mixed': 0,
    'Hedge Rows': 0,
    Marsh: 0,
    'Open Water': 0,
    'Plantations – Tree Cultivated': 0,
    'Sand Dune - Open': 0,
    'Sand Dune - Treed': 0,
    'Swamp - Thicket ': 0,
    'Swamp - Treed': 0,
    'Tallgrass Prairie - Open': 0,
    'Tallgrass Savannah': 0,
    'Tallgrass Woodland': 0,
    Tilled: 0,
    Transportation: 0,
    'Treed - Sparse': 0,
    Undifferentiated: 0,
  };
};

export class OutputMap {
  public mapId: string;
  public outputName: string;
  public arcRes: ArcRes;
  public habitatQualityValues: { [landCover: string]: number };
  public speciesName: string;
  public outputTypes: { [outputType: string]: boolean };
  constructor(madId: string) {
    this.mapId = madId;
    this.outputName = '';
    this.arcRes = {
      arcId: '',
      selectedRegionLandCover: null,
      selectedRegionShape: null,
      costMap: null,
      connectMap: null,
      hotspotMap: null,
    };
    this.habitatQualityValues = initHabitatQualityValues();
    this.speciesName = '';
    this.outputTypes = {
      hotspots: false,
      connectivity: false,
    };
  }
}

type ProjectContextProps = {
  projectName: string | null;
  projectId: string | null;
  outputMapDict: { [outputMapId: string]: OutputMap };
  SetOutputMapDict: any;
};

export const OutputContext = React.createContext<Partial<ProjectContextProps>>({});

export const OutputProvider = ({ children }: any) => {
  // On app load initialize the current project
  const [projectName, setProjectName] = React.useState('New Project');
  const [projectId, setProjectId] = React.useState(uuidv4());
  const [outputMapDict, SetOutputMapDict] = React.useState<{ [outputMapId: string]: OutputMap }>({});

  return (
    <OutputContext.Provider
      value={{
        projectName,
        projectId,
        outputMapDict,
        SetOutputMapDict,
      }}
    >
      {children}
    </OutputContext.Provider>
  );
};
