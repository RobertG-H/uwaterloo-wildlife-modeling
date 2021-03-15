import React from 'react';
import { Sidebar } from '../components/Sidebar';
import './sidebarContainerStyle.css';
import { OptionView } from './OptionView';
import { LayerViewContainer } from './OptionView/LayerView';
import { CreateNewMapContainer } from './OptionView/CreateNewMap';
import { EditMapsContainer } from './OptionView/EditMaps';
import { Confirm, Dimmer, Loader, Modal, Button } from 'semantic-ui-react';
import { ArcContext } from '../context/ArcProvider';

// interface Props {}

const introMessage =
  'Wildlife Hotspots is a GIS-based tool' +
  <b> test</b> +
  'that displays road mortality hotspots and regional connectivity heatmaps based on the habitat quality of a landscape. This tool is meant to help identify and visualize critical locations for the development of wildlife crossings. Wildlife Hotspots is meant to be used in conjunction with other research methods, such as site-level ground surveys, local road mortality data, and other modeling techniques available. Do not solely rely on this tool for the modeling of connectivity and road mortality hotspots.';

const SidebarContainer = (props: any) => {
  const [tab, setTab] = React.useState(-1);
  const [targetTab, setTargetTab] = React.useState(-1);
  const [confirmIsOpen, setConfirmIsOpen] = React.useState(false);
  const [introIsOpen, setIntroIsOpen] = React.useState(true);

  const {
    state: { loading },
  } = React.useContext(ArcContext);

  const tabForConfirm = 1;

  const handleCancel = () => {
    setConfirmIsOpen(false);
  };

  const handleConfirm = () => {
    setConfirmIsOpen(false);
    setTab(targetTab);
  };

  const handleIntro = () => {
    setIntroIsOpen(false);
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
      {loading && (
        <Dimmer active>
          <Loader />
        </Dimmer>
      )}
      {!loading && <Sidebar setTab={tryToChangeTab} currentTab={tab} />}

      {getOptionView()}
      <Confirm
        header='Exit Map Setup?'
        content='All progress will be lost upon exiting this setup process.'
        open={confirmIsOpen}
        cancelButton='Cancel'
        confirmButton='Exit'
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        size='mini'
      />
      {/* <Confirm
        header='Welcome To Wildlife Hotspots'
        content={introMessage}
        open={introIsOpen}
        cancelButton=''
        confirmButton='I Understand'
        onConfirm={handleIntro}
        size='small'
      /> */}
      <Modal open={introIsOpen} size='small'>
        <Modal.Header>Welcome To Wildlife Hotspots</Modal.Header>
        <Modal.Content>
          <div className='modal-description'>
            <p>
              Wildlife Hotspots is a GIS-based tool that displays <b>road mortality hotspots</b> and <b>regional connectivity heatmaps</b>
              based on the habitat quality of a landscape. This tool is meant to help identify and visualize critical locations for the
              development of wildlife crossings.
            </p>
            <p>
              Wildlife Hotspots is meant to be used in conjunction with other research methods, such as site-level ground surveys, local
              road mortality data, and other modeling techniques available.
              <b className='modal-red'>Do not solely rely on this tool for the modeling of connectivity and road mortality hotspots.</b>
            </p>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button secondary onClick={handleIntro}>
            I Understand
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default SidebarContainer;
