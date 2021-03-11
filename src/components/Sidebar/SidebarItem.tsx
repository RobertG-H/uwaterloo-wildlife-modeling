import React from 'react';
import tempIcon from '../../assets/icons/light-icons/add-light.png';
import { Header } from 'semantic-ui-react';
import './sidebarStyle.css';

// interface Props {}

const SidebarItem = (props: any) => {
  return (
    <div>
      <div className='sidebar-item-icon'>
        <img src={tempIcon} height='35' width='35' />
      </div>
      <Header as='h5' inverted={true} className='sidebar-item-text'>
        {props.title}
      </Header>
    </div>
  );
};

export default SidebarItem;
