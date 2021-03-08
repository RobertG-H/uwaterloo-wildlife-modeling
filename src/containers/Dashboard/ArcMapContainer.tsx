import React from 'react';
import LoginUI from '../../layout/LoginUI';
import { ArcContext } from '../../context/ArcProvider';
import { addMap } from '../../context/actions/arc/addMap';

import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import Extent from '@arcgis/core/geometry/Extent';
import TileLayer from '@arcgis/core/layers/TileLayer';

// interface Props {}
// This container doesn't have a layout because it is extremely simple.

const ArcMapContainer = (): JSX.Element => {
  const arcViewRef = React.useRef<HTMLDivElement>(null);

  const {
    state: { arcMap, arcMapView },
    dispatch,
  } = React.useContext(ArcContext);

  // Initial component load
  React.useEffect(() => {
    // Setup basemap
    addMap(
      new Map({
        basemap: 'topo-vector',
      }),
    )(dispatch);
  }, []);

  // On state arcMap update
  React.useEffect(() => {
    if (arcMap) {
      const extent = new Extent();
      extent.xmin = -81;
      extent.xmax = -79;
      extent.ymin = 43.1;
      extent.ymax = 43.9;
      const newMapView = new MapView({
        map: arcMap,
        zoom: 10,
        center: [-80.58, 43.48],
        constraints: {
          minZoom: 10,
          maxZoom: 15,
          rotationEnabled: false,
          geometry: extent,
        },
        rotation: -3.2,
      });

      // const landCover = new TileLayer({
      //   url: 'https://tiles.arcgis.com/tiles/DwLTn0u9VBSZvUPe/arcgis/rest/services/Cost_Map_Original/MapServer',
      // });
      // newArcMap.add(landCover);
    }
  }, [arcMap]);

  // On state arcMapView update
  React.useEffect(() => {
    if (arcMapView) {
      arcMapView.container = arcViewRef.current!;
    }
  }, [arcMapView]);
  return (
    <div
      ref={arcViewRef}
      className={'arcViewDiv'}
      style={{ width: '100vw', height: '100vh', position: 'fixed', zIndex: 0, top: 0, left: 0 }}
    ></div>
  );
};

export default ArcMapContainer;
