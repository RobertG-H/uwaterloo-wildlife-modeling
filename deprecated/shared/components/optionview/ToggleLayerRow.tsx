import React from 'react';
import { ChangeEvent } from 'react';
import { Divider, Checkbox } from 'semantic-ui-react';
import { OutputContext } from '../../../../OutputProvider';
import Slider, { SliderTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
const { Handle } = Slider;

const marks = {
  0: <strong>0</strong>,
  100: <strong>100</strong>,
};

const ToggleLayerRow = (props: any) => {
  const { outputMapDict } = React.useContext(OutputContext);
  const [opacity, setOpacity] = React.useState(80);
  const [visible, setVisible] = React.useState(true);

  const onLayerVisibility = (event: any, data: any) => {
    setVisible(data.checked);
    props.layer.visible = data.checked;
    if (props.layer2) props.layer2.visible = data.checked;
  };

  const setLayerOpacity = (newOpacity: number) => {
    setOpacity(newOpacity);
    props.layer.opacity = opacity;
    if (props.layer2) props.layer2.opacity = opacity;
  };

  const handleSlider = (sliderProps: any) => {
    const { value, dragging, index, ...restProps } = sliderProps;
    //console.log(sliderProps);
    setLayerOpacity(sliderProps.value / 100);
    return (
      <SliderTooltip prefixCls='rc-slider-tooltip' overlay={`${value} %`} visible={dragging} placement='top' key={index}>
        <Handle value={value} {...restProps} />
      </SliderTooltip>
    );
  };

  return (
    <>
      <div style={{ textAlign: 'left', paddingLeft: 10, marginBottom: 15 }}>
        <Checkbox label={props.layerName} onChange={onLayerVisibility} defaultChecked={props.layer.visible} />
        <div style={{ padding: '10px 20px 20px 10px' }}>
          <Slider defaultValue={props.layer.opacity * 100} marks={marks} min={0} max={100} handle={handleSlider} />
        </div>
      </div>
    </>
  );
};

export default ToggleLayerRow;
