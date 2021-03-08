import React from 'react';
import { ArcProvider } from '../../context/ArcProvider';
import { HotspotsMapsProvider } from '../../context/HotspotsMapsProvider';

// import MapView from '@arcgis/core/views/MapView';
// import Map from '@arcgis/core/Map';
// import Extent from '@arcgis/core/geometry/Extent';
// import TileLayer from '@arcgis/core/layers/TileLayer';

// interface Props {}

const DashboardContainer = (): JSX.Element => {
  const arcViewRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (arcViewRef.current) {
      // const newArcMap = new Map({
      //   basemap: 'topo-vector',
      // });
      // const extent = new Extent();
      // extent.xmin = -81;
      // extent.xmax = -79;
      // extent.ymin = 43.1;
      // extent.ymax = 43.9;
      // const newMapView = new MapView({
      //   container: arcViewRef.current,
      //   map: newArcMap,
      //   zoom: 10,
      //   center: [-80.58, 43.48],
      //   constraints: {
      //     minZoom: 10,
      //     maxZoom: 15,
      //     rotationEnabled: false,
      //     geometry: extent,
      //   },
      //   rotation: -3.2,
      // });
      // const landCover = new TileLayer({
      //   url: 'https://tiles.arcgis.com/tiles/DwLTn0u9VBSZvUPe/arcgis/rest/services/Cost_Map_Original/MapServer',
      // });
      // newArcMap.add(landCover);
    }
  }, []);
  return (
    <ArcProvider>
      <HotspotsMapsProvider>
        <h1>Dashboard</h1>

        {/* ArcGIS Canvas */}
        <div
          ref={arcViewRef}
          className={'arcViewDiv'}
          style={{ width: '100vw', height: '100vh', position: 'fixed', zIndex: 0, top: 0, left: 0 }}
        ></div>
        {/* END ArcGIS Canvas */}
      </HotspotsMapsProvider>
    </ArcProvider>
  );
};

export default DashboardContainer;
