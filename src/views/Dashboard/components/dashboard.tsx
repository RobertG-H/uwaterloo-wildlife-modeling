import React from 'react';
import firebase from '../../../firebase';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import TileLayer from '@arcgis/core/layers/TileLayer';
import ScaleBar from '@arcgis/core/widgets/ScaleBar';
import Extent from '@arcgis/core/geometry/Extent';
import { LarmSidebar, LarmHeader } from '../../../shared/layouts';
import { OptionView } from '../../../shared/components';
import { Grid, Menu, Segment } from 'semantic-ui-react';
import { OutputContext } from '../../../OutputProvider';

import 'firebase/firestore';

const Dashboard = () => {
  const { outputMapDict, staticArcRes } = React.useContext(OutputContext);
  const arcViewRef = React.useRef<HTMLDivElement>(null);
  const [arcMap, setArcMap] = React.useState<Map>(new Map());
  const [arcView, setArcView] = React.useState<MapView>(new MapView());
  const [defaultLayers, setDeafultLayers] = React.useState<{ [key: string]: TileLayer }>({});
  const [currentTab, setCurrentTab] = React.useState(0);

  const onSetupOutputComplete = (outputId: string, outputName: string) => {
    if (parseInt(outputName.charAt(0)) === 1) {
      // TODO update hardcoded map loading based on outputName
      addNewOutputMap(outputId, outputName.charAt(0));
    } else if (parseInt(outputName.charAt(0)) === 2) {
      addNewOutputMap(outputId, outputName.charAt(0));
    } else {
      console.log("output name invalid, can't generate map");
    }
    setCurrentTab(1);
  };

  const addNewOutputMap = (outputId: string, arcResId: string) => {
    if (outputMapDict![outputId].arcRes.arcId !== arcResId) {
      outputMapDict![outputId].arcRes = staticArcRes![arcResId];
      const connect = new TileLayer({
        url: staticArcRes![arcResId].connectMap!,
      });
      connect.opacity = 0.8;
      const hotspots = new TileLayer({
        url: staticArcRes![arcResId].hotspotMap!,
      });
      hotspots.opacity = 0.8;
      // TODO add more maps here
      arcMap.add(connect);
      arcMap.add(hotspots);
      outputMapDict![outputId].tileLayers['Connectivity'] = connect;
      outputMapDict![outputId].tileLayers['Road Mortality Hotspots'] = hotspots;
      console.log('added new output map');
    }
  };

  React.useEffect(() => {
    if (arcViewRef.current) {
      const newArcMap = new Map({
        basemap: 'topo-vector',
      });

      const extent = new Extent();
      extent.xmin = -80.5;
      extent.xmax = -79.5;
      extent.ymin = 43.1;
      extent.ymax = 43.9;

      const newMapView = new MapView({
        container: arcViewRef.current,
        map: newArcMap,
        zoom: 14,
        center: [-80.58, 43.48],
        constraints: {
          minZoom: 10,
          maxZoom: 15,
          rotationEnabled: false,
          geometry: extent,
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
        url: 'https://tiles.arcgis.com/tiles/DwLTn0u9VBSZvUPe/arcgis/rest/services/Southern_Ontario_Land_Cover/MapServer',
      });
      newArcMap.add(landCover);

      setArcMap(newArcMap);
      setArcView(newMapView);

      setDeafultLayers({
        'Land Cover': landCover,
      });
    }
  }, []);

  // height and width calcs
  const headerHeight = 48;

  return (
    <div>
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
            <OptionView
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              arcView={arcView}
              defaultLayers={defaultLayers}
              onSetupOutputComplete={onSetupOutputComplete}
              headerHeight={headerHeight}
            ></OptionView>
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
    </div>
  );
};

export default Dashboard;
