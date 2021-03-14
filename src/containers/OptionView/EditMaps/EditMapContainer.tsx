import React from 'react';
import { HotspotMap } from '../../../context/initialstates/hotspotMapsInitialState';
import RegionSelect from '../CreateNewMap/RegionSelect';
import ExtentSelect from '../CreateNewMap/ExtentSelect';
import './editMapsStyle.css';

interface Props {
  hotspotMap: HotspotMap | null;
}

const EditMapContainer = (props: Props) => {
  return (
    <div className='edit-map-container'>
      <div className='edit-map-title'>Editing: {props.hotspotMap?.outputName}</div>
      <div className='edit-map-region-select'>
        <div className='edit-map-region-select-title'>Study Region</div>
        <RegionSelect
          onRegionSelected={() => {
            return;
          }}
          regionSelected={true}
        />
        <ExtentSelect
          initExtent={props.hotspotMap ? props.hotspotMap.extent : [0, 0, 0, 0]}
          onInput={() => {
            return;
          }}
        />
      </div>
    </div>
  );
};

export default EditMapContainer;
