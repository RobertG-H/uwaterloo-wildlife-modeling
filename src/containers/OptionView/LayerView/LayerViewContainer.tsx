import React from 'react';
import LayerAccordian from './LayerAccordian';
import LayerItem from './LayerItem';
import LayerLegend from './LayerLegend';
import LandCoverLegend from './LandCoverLegend';
import './layerViewStyle.css';
// interface Props {}

const LayerViewContainer = (props: any) => {
  return (
    <div className='layer-view-container'>
      <LayerAccordian title='Default Layers'>
        <LayerItem title='Base Map'></LayerItem>
      </LayerAccordian>
    </div>
  );
};

export default LayerViewContainer;
