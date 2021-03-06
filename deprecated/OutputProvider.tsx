import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import TileLayer from '@arcgis/core/layers/TileLayer';

class ArcRes {
  public arcId: string | null | undefined;
  public selectedRegionLandCover: string | null;
  public selectedRegionShape: string | null;
  public costMap: string | null | undefined;
  public connectMap: string | null | undefined;
  public hotspotMap: string | null | undefined;
  constructor(arcId: string, costMap: string, connectMap: string, hotspotMap: string) {
    this.arcId = arcId;
    this.selectedRegionLandCover = null;
    this.selectedRegionShape = null;
    this.costMap = costMap;
    this.connectMap = connectMap;
    this.hotspotMap = hotspotMap;
  }
}

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
  public tileLayers: { [key: string]: TileLayer };
  public extent: number[];
  constructor(mapId: string) {
    this.mapId = mapId;
    this.outputName = '';
    this.arcRes = new ArcRes('null', '', '', '');
    this.habitatQualityValues = initHabitatQualityValues();
    this.speciesName = '';
    this.outputTypes = {
      hotspots: false,
      connectivity: false,
    };
    this.tileLayers = {};
    this.extent = [0, 0, 0, 0];
  }
}

type ProjectContextProps = {
  projectName: string | null;
  projectId: string | null;
  outputMapDict: { [outputMapId: string]: OutputMap };
  SetOutputMapDict: any;
  staticArcRes: { [arcResId: string]: ArcRes };
  staticLandCoverValues: { [landCover: string]: number };
};

export const OutputContext = React.createContext<Partial<ProjectContextProps>>({});

export const OutputProvider = ({ children }: any) => {
  // On app load initialize the current project
  const [projectName, setProjectName] = React.useState('Prototype Build');
  const [projectId, setProjectId] = React.useState(uuidv4());
  const [outputMapDict, SetOutputMapDict] = React.useState<{ [outputMapId: string]: OutputMap }>({});

  // TODO update this Static Arc Res to a DB fetch
  const [staticArcRes, setStaticArcRes] = React.useState<{ [arcResId: string]: ArcRes }>({
    1: new ArcRes(
      '1',
      'https://tiles.arcgis.com/tiles/DwLTn0u9VBSZvUPe/arcgis/rest/services/Cost_Map_Original/MapServer',
      'https://tiles.arcgis.com/tiles/DwLTn0u9VBSZvUPe/arcgis/rest/services/Connectivity_Map_Original/MapServer',
      'https://tiles.arcgis.com/tiles/DwLTn0u9VBSZvUPe/arcgis/rest/services/Road_Mortality_Hotspots_Original/MapServer',
    ),
    2: new ArcRes(
      '2',
      'https://tiles.arcgis.com/tiles/DwLTn0u9VBSZvUPe/arcgis/rest/services/Cost_Map_Tweaked/MapServer',
      'https://tiles.arcgis.com/tiles/DwLTn0u9VBSZvUPe/arcgis/rest/services/Connectivity_Map_Tweaked/MapServer',
      'https://tiles.arcgis.com/tiles/DwLTn0u9VBSZvUPe/arcgis/rest/services/Road_Mortality_Hotspots_Tweaked/MapServer',
    ),
  });

  const [staticLandCoverValues, setStaticLandCoverValues] = React.useState<{ [landCover: string]: number }>({
    'Alvar - Open': 150,
    'Alvar - Shrub': 300,
    'Alvar - Treed': 600,
    'Beach/Bar - Open': 50,
    'Bedrock - Open': 50,
    Bog: 950,
    'Built -Up Area – Impervious': 50,
    'Built -Up Area – Pervious': 200,
    'Cliff and Talus - Open': 50,
    'Cliff and Talus - Treed': 300,
    'Extraction – Aggregate': 25,
    'Extraction – Peat/Topsoil': 50,
    Fen: 950,
    Forest: 900,
    'Forest - Coniferous': 900,
    'Forest - Deciduous': 900,
    'Forest - Mixed': 900,
    'Hedge Rows': 700,
    Marsh: 950,
    'Open Water': 50,
    'Plantations – Tree Cultivated': 700,
    'Sand Dune - Open': 50,
    'Sand Dune - Treed': 250,
    'Swamp - Thicket ': 950,
    'Swamp - Treed': 950,
    'Tallgrass Prairie - Open': 150,
    'Tallgrass Savannah': 300,
    'Tallgrass Woodland': 700,
    Tilled: 100,
    Transportation: 50,
    'Treed - Sparse': 300,
    Undifferentiated: 125,
  });

  return (
    <OutputContext.Provider
      value={{
        projectName,
        projectId,
        outputMapDict,
        SetOutputMapDict,
        staticArcRes,
        staticLandCoverValues,
      }}
    >
      {children}
    </OutputContext.Provider>
  );
};
