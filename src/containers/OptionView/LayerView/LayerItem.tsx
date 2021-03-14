import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import visibleIconLight from '../../../assets//icons/general-icons/Toggle-Layer.png';
import visibleIconDark from '../../../assets//icons/general-icons/Toggle-Layer-ON.png';
import './layerViewStyle.css';

import Layer from '@arcgis/core/layers/Layer';

interface Props {
  title: string;
  startingOpacity: number | undefined;
  layer: Layer | undefined;
  layer2: Layer | undefined;
  children: React.ReactNode;
  activeLayerInfoTitle: string;
}

const LayerItem = (props: Props) => {
  const [opacity, setOpacity] = React.useState(props.startingOpacity);
  const [visible, setVisible] = React.useState(props.layer ? props.layer.visible : true);

  const onVisibleClick = () => {
    if (props.layer) props.layer.visible = !visible;
    if (props.layer2) props.layer2.visible = !visible;
    setVisible(!visible);
  };

  const setLayerOpacity = (newOpacity: number) => {
    setOpacity(newOpacity);
    if (props.layer) props.layer.opacity = newOpacity;
    if (props.layer2) props.layer2.opacity = newOpacity;
  };

  const handleSlider = (sliderProps: any) => {
    setLayerOpacity(sliderProps / 100);
  };

  const childrenWithExtraProp = React.Children.map(props.children, child =>
    React.cloneElement(child as React.ReactElement<any>, { visible: visible, activeLayerInfoTitle: props.activeLayerInfoTitle }),
  );

  return (
    <div className='layer-item'>
      <div className='layer-item-title'>
        <div>{props.title}</div>
        {visible && <img className='hover-pointer' src={visibleIconLight} width='16' height='16' onClick={onVisibleClick}></img>}
        {!visible && <img className='hover-pointer' src={visibleIconDark} width='16' height='16' onClick={onVisibleClick}></img>}
      </div>
      <div className='layer-item-opacity-title'>OPACITY</div>
      <div className='layer-item-slider'>
        <Slider
          defaultValue={props.startingOpacity ? props.startingOpacity * 100 : 100}
          min={0}
          max={100}
          onChange={handleSlider}
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
        <div className='layer-item-slider-text'>{opacity ? (opacity * 100).toFixed(0) : 0}%</div>
      </div>
      {childrenWithExtraProp}
    </div>
  );
};

export default LayerItem;
