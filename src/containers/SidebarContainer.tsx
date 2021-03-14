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
    if (showConfirm()) {
      setConfirmIsOpen(true);
    } else {
      setTab(-1);
    }
  };

  const tryToChangeTab = (targetTab: number) => {
    if (tab === targetTab) return;
    setTargetTab(targetTab);

    if (showConfirm()) {
      setConfirmIsOpen(true);
    } else {
      setTab(targetTab);
    }
  };

  const showConfirm = () => {
    if (tab === tabForConfirm) return true;
    return false;
  };

  const onCreateNewMapComplete = () => {
    setTab(-1);
  };

  const onCreateNewMapStart = () => {
    setTab(1);
  };

  const getOptionView = () => {
    switch (tab) {
      case 1:
        return (
          <OptionView headerTitle='Output Map Setup' onClose={tryCloseOptionView}>
            <CreateNewMapContainer onCreateNewMapComplete={onCreateNewMapComplete} />
          </OptionView>
        );
      case 2:
        return (
          <OptionView headerTitle='Edit Maps' onClose={tryCloseOptionView}>
            <EditMapsContainer onCreateNewMap={onCreateNewMapStart} />
          </OptionView>
        );
      case 3:
        return (
          <OptionView headerTitle='Layer View' onClose={tryCloseOptionView}>
            <LayerViewContainer />
          </OptionView>
        );
      case -1:
        return;
      default:
        return (
          <OptionView headerTitle='Under Construction' onClose={tryCloseOptionView}>
            <h5>Oops! Looks like this section is not complete yet...</h5>
          </OptionView>
        );
    }
  };

  return (
    <div className='sidebar-container'>
      <Sidebar setTab={tryToChangeTab} currentTab={tab} />
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
