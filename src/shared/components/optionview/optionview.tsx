import { Button, Menu, Divider, Segment } from 'semantic-ui-react';
import { ConfigureOutputsView } from '..';
import { LegendView } from '..';
import { ToggleLayersView } from '..';
import React from 'react';
import Legend from '@arcgis/core/widgets/Legend';
import useWindowDimensions from '../../../windowDimensions';

const OptionView = (props: any) => {
  const configureOutputsTitle = 'Output Maps';
  const toggleLayersTitle = 'Layer View';
  const legendTitle = 'Legend';

  const [title, setTitle] = React.useState('---');
  const [isEditingOutput, setIsEditingOutput] = React.useState(false);
  const [isEditingExistingOutput, setIsEditingExistingOutput] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  const { height, width } = useWindowDimensions();

  const hide = () => {
    setIsVisible(false);
    props.setCurrentTab(-1);
  };

  const onSetupOutputComplete = (outputId: string, outputName: string) => {
    setIsEditingOutput(false);
    setIsEditingExistingOutput(false);
    props.onSetupOutputComplete(outputId, outputName);
  };

  React.useEffect(() => {
    if (props.currentTab == 0) {
      setTitle(configureOutputsTitle);
      setIsVisible(true);
    } else if (props.currentTab == 1) {
      setTitle(toggleLayersTitle);
      setIsVisible(true);
      setIsEditingOutput(false);
    } else if (props.currentTab == 2) {
      setTitle(legendTitle);
      setIsVisible(true);
      setIsEditingOutput(false);
    } else {
      setIsVisible(false);
      setIsEditingOutput(false);
    }
  }, [props.currentTab]);

  if (!isVisible) {
    return null;
  }

  console.log(height);
  const optionViewHeight = height - props.headerHeight;

  return (
    <div style={{ flex: '1', display: 'flex', flexDirection: 'column', maxHeight: optionViewHeight }}>
      {/* Header */}
      <Menu borderless style={{ boxShadow: 'none', border: 'none', borderRadius: 0 }}>
        <Menu.Item header>{title}</Menu.Item>
        <Menu.Item style={{ paddingRight: 10 }} position='right'>
          <Button icon='close' className='noBG' onClick={() => hide()} />
        </Menu.Item>
      </Menu>
      <Divider style={{ marginTop: 0 }}></Divider>
      {/* END Header */}

      {/* Configure Outputs */}

      {props.currentTab === 0 && (
        <ConfigureOutputsView
          isEditingOutput={isEditingOutput}
          setIsEditingOutput={setIsEditingOutput}
          isEditingExistingOutput={isEditingExistingOutput}
          setIsEditingExistingOutput={setIsEditingExistingOutput}
          arcView={props.arcView}
          onSetupOutputComplete={onSetupOutputComplete}
        ></ConfigureOutputsView>
      )}
      {/* END Configure Outputs */}
      {/* Toggle Layers */}

      {props.currentTab === 1 && <ToggleLayersView defaultLayers={props.defaultLayers} arcView={props.arcView}></ToggleLayersView>}
      {/* END Toggle Layers */}

      {/* Legend */}
      {props.currentTab === 2 && <LegendView defaultLayers={props.defaultLayers} arcView={props.arcView} />}
      {/* End Legend */}
    </div>
  );
};

export default OptionView;
