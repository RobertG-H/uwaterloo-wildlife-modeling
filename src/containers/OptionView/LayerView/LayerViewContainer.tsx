import React from 'react';
import LayerAccordian from './LayerAccordian';
import LayerItem from './LayerItem';
import LayerLegend from './LayerLegend';
import LandCoverLegend from './LandCoverLegend';
import { ArcContext } from '../../../context/ArcProvider';
import { HotspotsMapsContext } from '../../../context/HotspotsMapsProvider';
import {
  DEFAULT_LAYERS_LEGEND_CONVERT,
  CONNECTIVITY_LEGEND_CONVERT,
  ROAD_MORTALITY_LEGEND_CONVERT,
} from '../../../constants/staticArcResources';

import TileLayer from '@arcgis/core/layers/TileLayer';

import './layerViewStyle.css';
// interface Props {}

const LayerViewContainer = (props: any) => {
  const {
    state: { hotspotMaps },
  } = React.useContext(HotspotsMapsContext);

  const {
    state: { authenticated, arcMap, arcMapView, defaultLayers, hotspotMapTileLayers },
  } = React.useContext(ArcContext);

  const generateRows = () => {
    const rows: JSX.Element[] = [];
    Object.keys(hotspotMaps).forEach(key => {
      const connect: TileLayer = hotspotMapTileLayers[hotspotMaps[key].arcResId][0];
      const roadkill: TileLayer = hotspotMapTileLayers[hotspotMaps[key].arcResId][1];

      rows.push(
        <LayerAccordian title={hotspotMaps[key].outputName} inverted={true}>
          <LayerItem
            title='Connectivity Map'
            startingOpacity={connect.opacity}
            layer={connect}
            layer2={undefined}
            activeLayerInfoTitle={CONNECTIVITY_LEGEND_CONVERT[+hotspotMaps[key].arcResId]}
          >
            <LayerLegend></LayerLegend>
          </LayerItem>
          <LayerItem
            title='Road Mortality Map'
            startingOpacity={roadkill.opacity}
            layer={roadkill}
            layer2={undefined}
            activeLayerInfoTitle={ROAD_MORTALITY_LEGEND_CONVERT[+hotspotMaps[key].arcResId]}
          >
            <LayerLegend></LayerLegend>
          </LayerItem>
        </LayerAccordian>,
      );
    });
    return rows;
  };

  return (
    <div className='overflow-wrapper flex-item'>
      <div className='overflow-inner'>
        <LayerAccordian title='Default Layers' inverted={true}>
          <LayerItem
            title='Base Map'
            startingOpacity={arcMapView?.allLayerViews.getItemAt(0).layer.opacity}
            layer={arcMapView?.allLayerViews.getItemAt(0).layer}
            layer2={arcMapView?.allLayerViews.getItemAt(1).layer}
            activeLayerInfoTitle='no title'
          >
            {(props: any) => {
              return <></>;
            }}
          </LayerItem>
          <LayerItem
            title='Land Cover'
            startingOpacity={defaultLayers[0] ? defaultLayers[0].opacity : 1.0}
            layer={defaultLayers[0] ? defaultLayers[0] : undefined}
            layer2={undefined}
            activeLayerInfoTitle={DEFAULT_LAYERS_LEGEND_CONVERT[0]}
          >
            <LandCoverLegend></LandCoverLegend>
          </LayerItem>
        </LayerAccordian>
        {generateRows()}
      </div>
    </div>
  );
};

export default LayerViewContainer;
