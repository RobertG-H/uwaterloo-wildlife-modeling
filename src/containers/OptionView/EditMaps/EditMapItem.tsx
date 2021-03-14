import React from 'react';
import './editMapsStyle.css';
import { Dropdown } from 'semantic-ui-react';

interface Props {
  title: string;
  onEdit(hotspotMapId: string): void;
  hotspotMapId: string;
}

const EditMapItem = (props: Props) => {
  const onEdit = () => {
    props.onEdit(props.hotspotMapId);
  };

  return (
    <div className='edit-map-item hover-pointer' onClick={onEdit}>
      <div className='edit-map-item-title'>{props.title}</div>
      <div>
        <Dropdown compact icon='ellipsis horizontal'>
          <Dropdown.Menu>
            <Dropdown.Item text='Edit' onClick={onEdit}></Dropdown.Item>
            <Dropdown.Item text='Rename'></Dropdown.Item>
            {/* <Dropdown.Item text='Duplicate' onClick={onDuplicate}></Dropdown.Item> */}
            <Dropdown.Item text='Delete'></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default EditMapItem;
