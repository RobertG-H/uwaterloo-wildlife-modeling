import React from 'react';
import Slider, { SliderTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
import visibleIcon from '../../../assets//icons/general-icons/Toggle-Layer.png';
import './layerViewStyle.css';

interface Props {
  title: string;
}

const LayerItem = (props: Props) => {
  return (
    <div className='layer-item'>
      <div className='layer-item-title'>
        <div>{props.title}</div>
        <img src={visibleIcon} width='14' height='14'></img>
      </div>
      <div className='layer-item-opacity-title'>OPACITY</div>
      <div className='layer-item-slider'>
        <Slider
          defaultValue={30}
          trackStyle={{ backgroundColor: '#a2b1d9', height: 4 }}
          handleStyle={{
            borderColor: '#a2b1d9',
            height: 16,
            width: 16,
            marginTop: -6,
            backgroundColor: '#ffffff',
          }}
          railStyle={{ backgroundColor: '#e9e9e9', height: 4 }}
        />
      </div>
    </div>
  );
};

export default LayerItem;
