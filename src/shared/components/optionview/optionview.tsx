import { Button } from 'semantic-ui-react';
import React from 'react';

const OptionView = (props: any) => {
  const [title, setTitle] = React.useState('---');
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    if (props.currentTab == 0) {
      setTitle('Configure Outputs');
    } else if (props.currentTab == 1) {
      setTitle('Toggle Layers');
    } else {
      setIsVisible(false);
    }
  });

  if (!isVisible) {
    return <div></div>;
  }

  return (
    <div>
      <h3>{title}</h3>
    </div>
  );
};

export default OptionView;
