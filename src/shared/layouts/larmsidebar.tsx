import React from 'react';
import { Checkbox, Grid, Header, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';

const LarmSidebar = (props: any) => {
  const [visible, setVisible] = React.useState(true);
  const onToggle = () => {
    setVisible(!visible);
  };
  return (
    <div>
      <Sidebar.Pushable as={Segment}>
        <Sidebar as={Menu} animation='push' icon='labeled' inverted vertical visible={visible} width='thin'>
          <Menu.Item as='a'>
            <Icon name='circle outline' />
            Configure Outputs
          </Menu.Item>
          <Menu.Item as='a'>
            <Icon name='circle outline' />
            Toggle Layers
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher>
          <div>{props.children}</div>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  );
};
export default LarmSidebar;
