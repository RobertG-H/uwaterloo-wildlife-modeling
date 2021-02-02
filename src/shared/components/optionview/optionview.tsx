import { Button } from 'semantic-ui-react';
import { ConfigureOutputsView } from '../../components/';
import React from 'react';

const OptionView = (props: any) => {
  const configureOutputsTitle = 'Configure Outputs';
  const toggleLayersTitle = 'Toggle Layers';

  const [title, setTitle] = React.useState('---');
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
    } else {
      setIsVisible(false);
    }
  }, [props.currentTab]);

  if (!isVisible) {
    return null;
  }

  if (title === configureOutputsTitle) {
    return (
      <div>
        <Button onClick={() => hide()}>Close</Button>
        <h3 style={{ paddingTop: 10 }}>{title}</h3>
        <ConfigureOutputsView></ConfigureOutputsView>
      </div>
    );
  } else if (title === toggleLayersTitle) {
    return (
      <div>
        <h3 style={{ paddingTop: 10 }}>{title}</h3>
        <Button onClick={() => props.toggleLayerVisibility('LandCover')}>LandCover</Button>
        <Button onClick={() => props.toggleLayerVisibility('Costs1')}>Costs</Button>
      </div>
    );
  }

  return (
    <div>
      <h3>Error loading data...</h3>
    </div>
  );
};

export default OptionView;
