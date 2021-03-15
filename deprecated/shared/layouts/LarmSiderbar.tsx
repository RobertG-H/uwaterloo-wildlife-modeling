import React from 'react';
import { Loader, Dimmer, Menu } from 'semantic-ui-react';

const LarmSidebar = (props: any) => {
  const initialTablList = [false, false, false];

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

  const onLegend = () => {
    setTab(2);
    props.setCurrentTab(2);
  };

  React.useEffect(() => {
    setTab(props.currentTab);
  }, [props.currentTab]);

  if (props.loading) {
    return (
      <Dimmer active>
        <Loader active inline></Loader>
      </Dimmer>
    );
  }

  return (
    <Menu icon='labeled' inverted vertical width='thin' borderless>
      <style>
        {`
      .ui.inverted.menu{
        background-color: rgb(90,97,117) !important;
      }
      .ui.inverted.icon.menu .item{
        color: rgb(214,219,232) !important;
      }
      .ui.icon.menu .item {
        text-align: left !important;
      }
    `}
      </style>
      <Menu.Item as='a' active={tabList[0]} onClick={onConfigureOutputs}>
        {/* <Icon name='circle outline' /> */}
        Output Maps
      </Menu.Item>
      <Menu.Item as='a' active={tabList[1]} onClick={onToggleLayers}>
        {/* <Icon name='circle outline' /> */}
        Layer View
      </Menu.Item>
      <Menu.Item as='a' active={tabList[2]} onClick={onLegend}>
        {/* <Icon name='circle outline' /> */}
        Legend
      </Menu.Item>
    </Menu>
  );
};
export default LarmSidebar;
