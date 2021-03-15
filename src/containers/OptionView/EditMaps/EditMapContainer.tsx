import React from 'react';
import { HotspotMap } from '../../../context/initialstates/hotspotMapsInitialState';
import RegionSelect from '../CreateNewMap/RegionSelect';
import ExtentSelect from '../CreateNewMap/ExtentSelect';
import FactorTable from '../CreateNewMap/FactorTable';
import { Checkbox, Input, Button } from 'semantic-ui-react';
import './editMapsStyle.css';

interface Props {
  hotspotMap: HotspotMap | null;
}

const EditMapContainer = (props: Props) => {
  const [name, setName] = React.useState(props.hotspotMap?.outputName);
  const [originalName, setOriginalName] = React.useState(props.hotspotMap?.outputName);

  const onCancel = () => {
    return;
  };

  const onSave = () => {
    return;
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
    <div className={'overflow-wrapper flex-item edit-map-static-width'}>
      <div className='edit-map-container flex-parent flex-item overflow-inner '>
        <div className='edit-map-output-name'>
          <div className='edit-map-title'>Output Name</div>
          <Input
            value={name}
            fluid
            size={'large'}
            placeholder='Enter a name for the output'
            onChange={() => {
              return;
            }}
          ></Input>
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
        <div className='edit-map-region-footer'>
          <div>
            <Button onClick={onCancel}>Cancel</Button>
          </div>
          <div>
            <Button secondary onClick={onSave} disabled={checkDisableSaveButton()}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMapContainer;
