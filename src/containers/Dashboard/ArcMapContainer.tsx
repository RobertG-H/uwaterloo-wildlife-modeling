import React from 'react';
import { ArcContext } from '../../context/ArcProvider';
import { addMap } from '../../context/actions/arc';
import { addMapView } from '../../context/actions/arc';
import { addDefaultLayers } from '../../context/actions/arc';
import { addRegionSelectLayers } from '../../context/actions/arc';
import { addLegendVm } from '../../context/actions/arc';

import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import TileLayer from '@arcgis/core/layers/TileLayer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import ScaleBar from '@arcgis/core/widgets/ScaleBar';
import Extent from '@arcgis/core/geometry/Extent';

import { DEFAULT_LAYERS_REF, REGION_SELECT_REF } from '../../constants/staticArcResources';
import RegionSelect from '../OptionView/CreateNewMap/RegionSelect';
import LegendViewModel from '@arcgis/core/widgets/Legend/LegendViewModel';

// interface Props {}

const ArcMapContainer = (): JSX.Element => {
  const arcViewRef = React.useRef<HTMLDivElement>(null);

  const {
    state: { authenticated, arcMap, arcMapView, defaultLayers, regionSelectLayers },
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
      const scaleBar = new ScaleBar({
        view: newMapView,
        unit: 'metric',
        style: 'ruler',
      });
      newMapView.ui.move(['zoom'], 'bottom-right');
      newMapView.ui.add(scaleBar, {
        position: 'bottom-right',
      });

      addMapView(newMapView)(dispatch);
      if (defaultLayers.length === 0) {
        const landCover = new TileLayer({
          url: DEFAULT_LAYERS_REF[0],
        });
        landCover.visible = false;
        arcMap.add(landCover);
        addDefaultLayers(landCover)(dispatch);
      }
      if (regionSelectLayers.length === 0) {
        const regionPreSelect = new FeatureLayer({
          url: REGION_SELECT_REF[0],
        });
        const regionPostSelect = new FeatureLayer({
          url: REGION_SELECT_REF[1],
        });
        regionPreSelect.visible = false;
        regionPostSelect.visible = false;

        arcMap.add(regionPreSelect);
        arcMap.add(regionPostSelect);
        addRegionSelectLayers([regionPreSelect, regionPostSelect])(dispatch);
      }
    }
  }, [arcMap]);

  // On state arcMapView update
  React.useEffect(() => {
    if (arcMapView) {
      arcMapView.container = arcViewRef.current!;

      // Set LegendVM
      const newVm = new LegendViewModel();
      newVm.view = arcMapView;
      addLegendVm(newVm)(dispatch);
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
