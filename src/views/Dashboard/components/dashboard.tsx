import React from 'react';
import firebase from '../../../firebase';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import TileLayer from '@arcgis/core/layers/TileLayer';
import ScaleBar from '@arcgis/core/widgets/ScaleBar';
import { LarmSidebar, LarmHeader } from '../../../shared/layouts';
import { OptionView } from '../../../shared/components';
import { Grid, Menu, Segment } from 'semantic-ui-react';
import { OutputProvider } from '../../../OutputProvider';

import 'firebase/firestore';

const Dashboard = () => {
  const arcViewRef = React.useRef<HTMLDivElement>(null);
  const [arcMap, setArcMap] = React.useState<Map>(new Map());
  const [arcView, setArcView] = React.useState<MapView>(new MapView());
  const [allLayers, setAllLayers] = React.useState<{ [key: string]: TileLayer }>({});
  const [currentTab, setCurrentTab] = React.useState(0);

  const toggleLayerVisibility = (layerName: string) => {
    if (allLayers[layerName].opacity === 1) allLayers[layerName].opacity = 0;
    else allLayers[layerName].opacity = 1;
  };

  React.useEffect(() => {
    if (arcViewRef.current) {
      const newArcMap = new Map({
        basemap: 'topo-vector',
      });

      const newMapView = new MapView({
        container: arcViewRef.current,
        map: newArcMap,
        zoom: 14,
        center: [-80.58, 43.48],
        constraints: {
          minZoom: 10,
          maxZoom: 16,
          rotationEnabled: false,
        },
      });
      const scaleBar = new ScaleBar({
        view: newMapView,
        unit: 'metric',
        style: 'ruler',
      });
      newMapView.ui.move(['zoom'], 'bottom-right');
      newMapView.ui.add(scaleBar, {
        position: 'bottom-right',
      });

      const landCover = new TileLayer({
        url: 'https://tiles.arcgis.com/tiles/wlGPBvwc5LdaCZBr/arcgis/rest/services/ArcOnline_jan1/MapServer',
      });
      newArcMap.add(landCover);
      const costs1 = new TileLayer({
        url: 'https://tiles.arcgis.com/tiles/wlGPBvwc5LdaCZBr/arcgis/rest/services/CM1_Gnarly_costs/MapServer',
      });
      newArcMap.add(costs1);

      setArcMap(newArcMap);
      setArcView(newMapView);
      setAllLayers({
        LandCover: landCover,
        Costs1: costs1,
      });
    }
  }, []);

  // height and width calcs
  const headerHeight = 48;

  return (
    <OutputProvider>
      <style>
        {`
      .esri-scale-bar__label-container--ruler{
        background-color: rgba(55, 55, 55, 0.50) !important;
        padding-left:5px !important;
        padding-right:5px !important;
      }
    `}
      </style>
      {/* Header */}
      <LarmHeader></LarmHeader>
      {/* END Header */}

      {/* Dashboard Elements - Flexbox container*/}

      <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
        {/* Sidebar */}
        <div
          style={{
            zIndex: 1,
            marginTop: headerHeight,
            backgroundColor: 'rgb(90,97,117)',
          }}
        >
          <LarmSidebar currentTab={currentTab} setCurrentTab={setCurrentTab}></LarmSidebar>
        </div>
        {/* END Sidebar */}

        {/* Optionview */}

        {currentTab >= 0 && (
          <div
            style={{
              zIndex: 1,
              marginTop: headerHeight,
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
            }}
          >
            {/* <Segment raised={false} style={{ padding: 0 }}> */}
            <OptionView
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              arcView={arcView}
              toggleLayerVisibility={toggleLayerVisibility}
            ></OptionView>
            {/* </Segment> */}
          </div>
        )}
        {/* END Optionview */}
      </div>
      {/* END Dashboard Elements - Flexbox container*/}

      {/* ArcGIS Canvas */}
      <div
        ref={arcViewRef}
        className={'arcViewDiv'}
        style={{ width: '100vw', height: '100vh', position: 'fixed', zIndex: 0, top: 0, left: 0 }}
      ></div>
      {/* END ArcGIS Canvas */}
    </OutputProvider>
  );
};

export default Dashboard;
