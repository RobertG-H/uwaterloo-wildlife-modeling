import { Button, Menu, Divider, Segment } from 'semantic-ui-react';
import { ConfigureOutputsView } from '..';
import React from 'react';

const OptionView = (props: any) => {
  const configureOutputsTitle = 'Configure Outputs';
  const toggleLayersTitle = 'Toggle Layers';

  const [title, setTitle] = React.useState('---');
  const [isEditingOutput, setIsEditingOutput] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);

  const hide = () => {
    setIsVisible(false);
    props.setCurrentTab(-1);
  };

  React.useEffect(() => {
    if (props.currentTab == 0) {
      setTitle(configureOutputsTitle);
      setIsVisible(true);
    } else if (props.currentTab == 1) {
      setTitle(toggleLayersTitle);
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
    <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Menu borderless style={{ boxShadow: 'none', border: 'none', borderRadius: 0 }}>
        <Menu.Item header>{title}</Menu.Item>
        <Menu.Item position='right'>
          <Button icon='close' onClick={() => hide()} />
        </Menu.Item>
      </Menu>
      <Divider style={{ marginTop: 0 }}></Divider>
      {/* END Header */}

      {/* <Segment raised={false} style={{ boxShadow: 'none', border: 'none', borderRadius: 0 }}> */}
      {/* Configure Outputs */}

      {title === configureOutputsTitle && (
        <ConfigureOutputsView
          isEditingOutput={isEditingOutput}
          setIsEditingOutput={setIsEditingOutput}
          arcView={props.arcView}
        ></ConfigureOutputsView>
      )}
      {/* END Configure Outputs */}
      {/* Toggle Layers */}

      {title === toggleLayersTitle && (
        <div>
          <Button onClick={() => props.toggleLayerVisibility('LandCover')}>LandCover</Button>
          <Button onClick={() => props.toggleLayerVisibility('Costs1')}>Costs</Button>
        </div>
      )}
      {/* END Toggle Layers */}
      {/* </Segment> */}
    </div>
  );
};

export default OptionView;
