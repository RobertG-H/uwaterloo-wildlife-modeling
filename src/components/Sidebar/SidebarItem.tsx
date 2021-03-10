import React from 'react';
import tempIcon from '../../assets/images/Toggle-Layer-24px.svg';
import './sidebarStyle.css';

// interface Props {}

const SidebarItem = (props: any) => {
  return (
    <div>
      <div className='sidebar-item-icon'>
        <img src={tempIcon} height='35' width='35' />
      </div>
      <div className='sidebar-item-text'>{props.title}</div>
    </div>
  );
};

export default SidebarItem;
