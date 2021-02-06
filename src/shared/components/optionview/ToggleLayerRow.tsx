import React from 'react';
import { ChangeEvent } from 'react';
import { Divider, Checkbox } from 'semantic-ui-react';
import { OutputContext } from '../../../OutputProvider';
import Slider, { SliderTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
const { Handle } = Slider;

const marks = {
  0: <strong>0</strong>,
  100: <strong>100</strong>,
};

const ToggleLayerRow = (props: any) => {
  const { outputMapDict } = React.useContext(OutputContext);
  const [opacity, setOpacity] = React.useState(100);
  const [visible, setVisible] = React.useState(true);

  const onLayerVisibility = (event: any, data: any) => {
    setVisible(data.checked);
    props.allLayers[props.layerName].visible = data.checked;
  };

  const setLayerOpacity = (newOpacity: number) => {
    setOpacity(newOpacity);
    props.allLayers[props.layerName].opacity = opacity;
  };

  //   React.useEffect(() => {
  //     setValue(outputMapDict![props.editingMapId].habitatQualityValues[props.landCover]);
  //   }, []);

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
      <div style={{ textAlign: 'left', paddingLeft: 10 }}>
        <Checkbox
          as={'h5'}
          label={props.layerName}
          onChange={onLayerVisibility}
          defaultChecked={props.allLayers[props.layerName].visible}
        />
        <div style={{ padding: '0px 20px 20px 10px' }}>
          <Slider defaultValue={props.allLayers[props.layerName].opacity * 100} marks={marks} min={0} max={100} handle={handleSlider} />
        </div>
      </div>
      <Divider></Divider>
    </>
  );
};

export default ToggleLayerRow;
