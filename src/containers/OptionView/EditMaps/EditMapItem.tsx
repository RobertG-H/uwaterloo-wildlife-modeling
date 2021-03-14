import React from 'react';
import './editMapsStyle.css';
import moreIcon from '../../../assets/icons/general-icons/more.png';
import { Dropdown } from 'semantic-ui-react';

interface Props {
  title: string;
  onEdit(hotspotMapId: string): void;
  hotspotMapId: string;
}

const EditMapItem = (props: Props) => {
  const onDuplicate = () => {
    // const newOutput: { [outputMapId: string]: OutputMap } = {};
    // const newId = uuidv4();
    // newOutput[newId] = JSON.parse(JSON.stringify(outputMapDict![props.outputMapId]));
    // newOutput[newId].outputName = newOutput[newId].outputName + ' (1)';
    // SetOutputMapDict({
    //   ...outputMapDict,
    //   ...newOutput,
    // });
  };

  const onEdit = () => {
    props.onEdit(props.hotspotMapId);
  };

  return (
    <div className='edit-map-item'>
      <div className='edit-map-item-title'>{props.title}</div>
      <div>
        <Dropdown compact icon='ellipsis vertical'>
          <Dropdown.Menu>
            <Dropdown.Item text='Edit' onClick={onEdit}></Dropdown.Item>
            <Dropdown.Item text='Rename'></Dropdown.Item>
            <Dropdown.Item text='Duplicate' onClick={onDuplicate}></Dropdown.Item>
            <Dropdown.Item text='Delete'></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {/* <img className='hover-pointer' src={moreIcon} width={24} height={24} /> */}
    </div>
  );
};

export default EditMapItem;
