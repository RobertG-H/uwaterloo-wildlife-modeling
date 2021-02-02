import React from 'react';
import firebase from '../../../firebase';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import TileLayer from '@arcgis/core/layers/TileLayer';
import ScaleBar from '@arcgis/core/widgets/ScaleBar';
import { LarmSidebar, LarmHeader } from '../../../shared/layouts';
import { OptionView } from '../../../shared/components';
import { Grid, Menu, Segment } from 'semantic-ui-react';

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

  // const OptionViewToRender = () => <div></div>;

  // React.useEffect(() => {
  //   if (currentTab != -1) {
  //     OptionViewToRender = (
  //       <div style={{ position: 'fixed', height: '100%', zIndex: 1, marginTop: 48, marginLeft: 146.75, backgroundColor: 'white' }}>
  //         <Segment padded raised={false}>
  //           <OptionView
  //             currentTab={currentTab}
  //             setCurrentTab={setCurrentTab}
  //             arcView={arcView}
  //             toggleLayerVisibility={toggleLayerVisibility}
  //           ></OptionView>
  //         </Segment>
  //       </div>
  //     );
  //   }
  // });

  return (
    <div style={{ textAlign: 'center' }}>
      <style>
        {`
      .no-padding {
        padding-right: 0 !important;
      }
      .esri-scale-bar__label-container--ruler{
        background-color: rgba(55, 55, 55, 0.50) !important;
        padding-left:5px !important;
        padding-right:5px !important;

      }
    `}
      </style>
      <LarmSidebar currentTab={currentTab} setCurrentTab={setCurrentTab}></LarmSidebar>
      {currentTab >= 0 && (
        <div style={{ position: 'fixed', height: '100%', zIndex: 1, marginTop: 48, marginLeft: 146.75, backgroundColor: 'white' }}>
          <Segment padded raised={false}>
            <OptionView
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              arcView={arcView}
              toggleLayerVisibility={toggleLayerVisibility}
            ></OptionView>
          </Segment>
        </div>
      )}

      <LarmHeader></LarmHeader>
      <div ref={arcViewRef} className={'arcViewDiv'} style={{ width: '100vw', height: '100vh', zIndex: -1 }}></div>
    </div>
  );
};

export default Dashboard;
