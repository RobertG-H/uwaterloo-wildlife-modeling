import React from 'react';
import { Checkbox, Grid, Header, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';

const LarmSidebar = (props: any) => {
  const [visible, setVisible] = React.useState(true);
  const onToggle = () => {
    setVisible(!visible);
  };

  const [configureOutputsActive, setConfigureOutputsActive] = React.useState(true);
  const [toggleLayersActive, setToggleLayersActive] = React.useState(false);

  const initialTablList = [false, false];

  const [tabList, setTabList] = React.useState(initialTablList);

  const resetTabList = () => {
    setTabList(initialTablList);
  };

  const setTab = (index: number) => {
    if (index < 0) {
      resetTabList();
      return;
    }
    setTabList(() => {
      return tabList.map((item, currentIndex: number) => {
        if (index === currentIndex) return true;
        else return false;
      });
    });
  };

  const onConfigureOutputs = () => {
    setTab(0);
    props.setCurrentTab(0);
  };

  const onToggleLayers = () => {
    setTab(1);
    props.setCurrentTab(1);
  };

  React.useEffect(() => {
    setTab(props.currentTab);
  }, [props.currentTab]);

  return (
    <div>
      <Sidebar.Pushable as={Segment}>
        <Sidebar as={Menu} animation='push' icon='labeled' inverted vertical visible={visible} width='thin'>
          <Menu.Item as='a' active={tabList[0]} onClick={onConfigureOutputs}>
            {/* <Icon name='circle outline' /> */}
            Configure Outputs
          </Menu.Item>
          <Menu.Item as='a' active={tabList[1]} onClick={onToggleLayers}>
            {/* <Icon name='circle outline' /> */}
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
