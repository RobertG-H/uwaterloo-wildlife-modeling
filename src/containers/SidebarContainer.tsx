import React from 'react';
import { Sidebar } from '../components/Sidebar';
import './sidebarContainerStyle.css';
import { OptionView } from './OptionView';
import { LayerViewContainer } from './OptionView/LayerView';
import { CreateNewMapContainer } from './OptionView/CreateNewMap';
import { EditMapsContainer } from './OptionView/EditMaps';

// interface Props {}

const SidebarContainer = (props: any) => {
  const [tab, setTab] = React.useState(-1);
  const getOptionView = () => {
    switch (tab) {
      case 1:
        return (
          <OptionView headerTitle='Output Map Setup'>
            <CreateNewMapContainer />
          </OptionView>
        );
      case 2:
        return (
          <OptionView headerTitle='Edit Maps'>
            <EditMapsContainer />
          </OptionView>
        );
      case 3:
        return (
          <OptionView headerTitle='Layer View'>
            <LayerViewContainer />
          </OptionView>
        );
      default:
        return;
    }
  };

  return (
    <div className='sidebar-container'>
      <Sidebar setTab={setTab} />
      {getOptionView()}
    </div>
  );
};

export default SidebarContainer;
