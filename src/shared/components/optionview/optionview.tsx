import { Button, Menu, Divider, Segment } from 'semantic-ui-react';
import { ConfigureOutputsView } from '..';
import { LegendView } from '..';
import { ToggleLayersView } from '..';
import React from 'react';
import Legend from '@arcgis/core/widgets/Legend';

const OptionView = (props: any) => {
  const configureOutputsTitle = 'Configure Outputs';
  const toggleLayersTitle = 'Toggle Layers';
  const legendTitle = 'Legend';

  const [title, setTitle] = React.useState('---');
  const [isEditingOutput, setIsEditingOutput] = React.useState(false);
  const [isEditingExistingOutput, setIsEditingExistingOutput] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);

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

  return (
    <div style={{ flex: '1', display: 'flex', flexDirection: 'column', overflowY: 'scroll' }}>
      {/* Header */}
      <Menu borderless style={{ boxShadow: 'none', border: 'none', borderRadius: 0 }}>
        <Menu.Item header>{title}</Menu.Item>
        <Menu.Item position='right'>
          <Button icon='close' onClick={() => hide()} />
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

      {props.currentTab === 1 && (
        <div>
          <ToggleLayersView allLayers={props.allLayers}></ToggleLayersView>
        </div>
      )}
      {/* END Toggle Layers */}

      {/* Legend */}
      {props.currentTab === 2 && <LegendView allLayers={props.allLayers} arcView={props.arcView} />}
      {/* End Legend */}
    </div>
  );
};

export default OptionView;
