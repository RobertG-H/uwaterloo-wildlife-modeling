import React from 'react';
import { Sidebar } from '../components/Sidebar';
import './sidebarContainerStyle.css';
import { OptionView } from './OptionView';
import { LayerViewContainer } from './OptionView/LayerView';
import { CreateNewMapContainer } from './OptionView/CreateNewMap';
import { EditMapsContainer } from './OptionView/EditMaps';
import { Confirm } from 'semantic-ui-react';

// interface Props {}

const SidebarContainer = (props: any) => {
  const [tab, setTab] = React.useState(-1);
  const [targetTab, setTargetTab] = React.useState(-1);
  const [confirmIsOpen, setConfirmIsOpen] = React.useState(false);

  const tabForConfirm = 1;

  const handleCancel = () => {
    setConfirmIsOpen(false);
  };

  const handleConfirm = () => {
    setConfirmIsOpen(false);
    setTab(targetTab);
  };

  const tryCloseOptionView = () => {
    setTargetTab(-1);
    if (tab === tabForConfirm) {
      setConfirmIsOpen(true);
    } else {
      setTab(-1);
    }
  };

  const tryToChangeTab = (targetTab: number) => {
    setTargetTab(targetTab);
    if (tab === tabForConfirm) {
      setConfirmIsOpen(true);
    } else {
      setTab(targetTab);
    }
  };

  const getOptionView = () => {
    switch (tab) {
      case 1:
        return (
          <OptionView headerTitle='Output Map Setup' onClose={tryCloseOptionView}>
            <CreateNewMapContainer />
          </OptionView>
        );
      case 2:
        return (
          <OptionView headerTitle='Edit Maps' onClose={tryCloseOptionView}>
            <EditMapsContainer />
          </OptionView>
        );
      case 3:
        return (
          <OptionView headerTitle='Layer View' onClose={tryCloseOptionView}>
            <LayerViewContainer />
          </OptionView>
        );
      default:
        return;
    }
  };

  return (
    <div className='sidebar-container'>
      <Sidebar setTab={tryToChangeTab} />
      {getOptionView()}
      <Confirm
        open={confirmIsOpen}
        cancelButton='Never mind'
        confirmButton="Let's do it"
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default SidebarContainer;
