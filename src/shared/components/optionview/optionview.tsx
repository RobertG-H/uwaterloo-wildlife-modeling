import { Button } from 'semantic-ui-react';
import { ConfigureOutputsView } from '../../components/';
import React from 'react';

const OptionView = (props: any) => {
  const configureOutputsTitle = 'Configure Outputs';
  const toggleLayersTitle = 'Toggle Layers';

  const [title, setTitle] = React.useState('---');
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    if (props.currentTab == 0) {
      setTitle(configureOutputsTitle);
    } else if (props.currentTab == 1) {
      setTitle(toggleLayersTitle);
    } else {
      setIsVisible(false);
    }
  });

  if (!isVisible) {
    return null;
  }

  if (title === configureOutputsTitle) {
    return (
      <div>
        <h3 style={{ paddingTop: 10 }}>{title}</h3>
        <Button onClick={() => setIsVisible(false)}>Close</Button>
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
