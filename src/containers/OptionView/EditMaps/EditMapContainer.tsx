import React from 'react';
import { HotspotMap } from '../../../context/initialstates/hotspotMapsInitialState';
import { ArcContext } from '../../../context/ArcProvider';
import { HotspotsMapsContext } from '../../../context/HotspotsMapsProvider';
import RegionSelect from '../CreateNewMap/RegionSelect';
import ExtentSelect from '../CreateNewMap/ExtentSelect';
import FactorTable from '../CreateNewMap/FactorTable';
import { Checkbox, Input, Button, Modal } from 'semantic-ui-react';
import './editMapsStyle.css';

import { addHotspotTileLayers } from '../../../context/actions/arc';
import { hotspotAdd } from '../../../context/actions/hotspotmaps';

interface Props {
  hotspotMap: HotspotMap | null;
  setHotspotMap: React.Dispatch<React.SetStateAction<HotspotMap | null>>;
  onCreateNewMapComplete(): void;
  quitWhileEditing(): void;
}

const EditMapContainer = (props: Props) => {
  const [name, setName] = React.useState(props.hotspotMap?.outputName);
  const [originalName, setOriginalName] = React.useState(props.hotspotMap?.outputName);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const { state: hotspotMapsState, dispatch: hotspotMapsDispatch } = React.useContext(HotspotsMapsContext);

  const {
    state: { arcMap, hotspotMapTileLayers, regionSelectLayers },
    dispatch: arcDispatch,
  } = React.useContext(ArcContext);

  const onCancelClick = () => {
    props.quitWhileEditing();
  };

  const onSaveClick = () => {
    setModalIsOpen(true);
  };

  const onCancelModal = () => {
    setModalIsOpen(false);
  };

  const onSaveAsNewModal = () => {
    if (!name || name === originalName) {
      props.onCreateNewMapComplete();
    } else {
      if (name.charAt(0) === '1') {
        saveHotspotMap('0');
      } else if (name.charAt(0) === '2') {
        saveHotspotMap('1');
      }
    }
  };

  const onOutputNameChange = (event: any, data: any) => {
    setName(data.value);
  };

  // To be called when everything complete.
  const saveHotspotMap = (arcResId: string) => {
    props.hotspotMap!.arcResId = arcResId;
    props.hotspotMap!.outputName = name!;

    tryAddTileLayers(arcResId);
    props.onCreateNewMapComplete();
  };

  const tryAddTileLayers = (arcResId: string) => {
    // First check that we don't already have a hotspot with the current arcResId
    if (hotspotMapTileLayers[arcResId]) {
      console.log('Not adding more tile layers for existing arcresId');
      return;
    }
    addHotspotTileLayers(arcMap, props.hotspotMap!)(arcDispatch);
    hotspotAdd(props.hotspotMap!)(hotspotMapsDispatch);
  };

  const checkDisableSaveButton = () => {
    if (name) {
      if (name.length === 0) return true;
      if (name.charAt(0) === '1' || name.charAt(0) === '2') return false;
      else return true;
    }
    return false;
  };

  return (
    <div className='flex-item flex-parent'>
      <div className={'overflow-wrapper flex-item edit-map-static-width'}>
        <div className='edit-map-container flex-parent flex-item overflow-inner '>
          <div className='edit-map-output-name'>
            <div className='edit-map-title'>Output Name</div>
            <Input value={name} fluid size={'large'} placeholder='Enter a name for the output' onChange={onOutputNameChange}></Input>
            <div className='output-map-finalize-checkbox-container'>
              <div className='edit-map-title'>Output Maps</div>
              <Checkbox label='Road Mortality Hotspot Map' defaultChecked={true} />
              <Checkbox label='Connectivity Map' defaultChecked={true} />
            </div>
          </div>
          <div className='edit-map-region-select'>
            <div className='edit-map-title'>Study Region</div>
            <RegionSelect
              onRegionSelected={() => {
                return;
              }}
              regionSelected={true}
            />
          </div>
          <div className='edit-map-land-cover'>
            <div className='edit-map-title'>Habitat Suitability Values by Land Cover</div>
            <div className='flex-parent flex-item'>
              <FactorTable
                title='LAND COVER FACTOR'
                factorValues={props.hotspotMap ? props.hotspotMap.landCoverValues : {}}
                showImage={true}
              />
            </div>
          </div>
          <div className='edit-map-slope'>
            <div className='edit-map-title'>Habitat Suitability Values by Land Cover</div>
            <div className='flex-parent flex-item'>
              <FactorTable title='PERCENT SLOPE' factorValues={props.hotspotMap ? props.hotspotMap.slopeValues : {}} showImage={false} />
            </div>
          </div>
        </div>
      </div>
      <div className='edit-map-region-footer'>
        <div>
          <Button onClick={onCancelClick}>Cancel</Button>
        </div>
        <div>
          <Button secondary onClick={onSaveClick} disabled={checkDisableSaveButton()}>
            Save
          </Button>
        </div>
      </div>
      <Modal open={modalIsOpen} size='small'>
        <Modal.Header>Overwrite or Save as New?</Modal.Header>
        <Modal.Content>
          <div className='modal-description'>
            <p>Would you like to overwrite the existing map, or save it as a new output map?</p>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={onCancelModal}>CANCEL</Button>
          <Button primary>OVERWRITE</Button>
          <Button primary onClick={onSaveAsNewModal}>
            SAVE AS NEW
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default EditMapContainer;
