import React from 'react';
import { ArcContext } from '../../context/ArcProvider';
import { addMap } from '../../context/actions/arc';
import { addMapView } from '../../context/actions/arc';
import { addDefaultLayers } from '../../context/actions/arc';

import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import Extent from '@arcgis/core/geometry/Extent';
import TileLayer from '@arcgis/core/layers/TileLayer';

// interface Props {}
// This container doesn't have a layout because it is extremely simple.

const ArcMapContainer = (): JSX.Element => {
  const arcViewRef = React.useRef<HTMLDivElement>(null);

  const {
    state: { authenticated, arcMap, arcMapView, defaultLayers },
    dispatch,
  } = React.useContext(ArcContext);

  // Initial component load on authenticated
  React.useEffect(() => {
    if (authenticated) {
      // Setup basemap
      addMap(
        new Map({
          basemap: 'topo-vector',
        }),
      )(dispatch);
    }
  }, [authenticated]);

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
      addMapView(newMapView)(dispatch);
      if (defaultLayers.length === 0) {
        const newTileLayer = new TileLayer({
          url: 'https://tiles.arcgis.com/tiles/DwLTn0u9VBSZvUPe/arcgis/rest/services/Southern_Ontario_Land_Cover/MapServer',
        });
        arcMap.add(newTileLayer);
        addDefaultLayers(newTileLayer)(dispatch);
      }
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
