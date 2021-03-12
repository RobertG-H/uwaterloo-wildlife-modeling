import React from 'react';
import LayerAccordian from './LayerAccordian';
import LayerItem from './LayerItem';
import LayerLegend from './LayerLegend';
import LandCoverLegend from './LandCoverLegend';
import { ArcContext } from '../../../context/ArcProvider';
import './layerViewStyle.css';
// interface Props {}

const LayerViewContainer = (props: any) => {
  const {
    state: { authenticated, arcMap, arcMapView, defaultLayers },
    dispatch,
  } = React.useContext(ArcContext);

  return (
    <div className='layer-view-container'>
      <LayerAccordian title='Default Layers'>
        <LayerItem
          title='Base Map'
          startingOpacity={arcMapView?.allLayerViews.getItemAt(0).layer.opacity}
          layer={arcMapView?.allLayerViews.getItemAt(0).layer}
          layer2={arcMapView?.allLayerViews.getItemAt(1).layer}
        >
          <LandCoverLegend></LandCoverLegend>
        </LayerItem>
        <LayerItem
          title='Land Cover'
          startingOpacity={defaultLayers[0] ? defaultLayers[0].opacity : 1.0}
          layer={defaultLayers[0] ? defaultLayers[0] : undefined}
          layer2={undefined}
        >
          {'test'}
        </LayerItem>
      </LayerAccordian>
    </div>
  );
};

export default LayerViewContainer;
