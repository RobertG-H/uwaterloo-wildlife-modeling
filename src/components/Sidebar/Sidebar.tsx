import React from 'react';
import './sidebarStyle.css';
import SidebarItem from './SidebarItem';
import tempIcon from '../../assets/icons/light-icons/add-light.png';
import { Loader, Dimmer, Menu } from 'semantic-ui-react';

interface Props {
  setTab(newTab: number): void;
}

const Sidebar = (props: Props) => {
  const onItemClick = (event: any, data: any) => {
    props.setTab(data!.index);
  };

  return (
    <Menu className='sidebar-acordian' icon='labeled' inverted vertical width='thin' borderless>
      <Menu.Item className='sidebar-item' onClick={onItemClick} index={1}>
        <SidebarItem iconClass={'icon-create-new-map'} title='Create New Map'></SidebarItem>
      </Menu.Item>
      <Menu.Item className='sidebar-item' onClick={onItemClick} index={2}>
        <SidebarItem iconClass={'icon-edit-maps'} title='Edit Maps'></SidebarItem>
      </Menu.Item>
      <Menu.Item className='sidebar-item' onClick={onItemClick} index={3}>
        <SidebarItem iconClass={'icon-layer-view'} title='Layer View'></SidebarItem>
      </Menu.Item>
      <hr></hr>
      <Menu.Item className='sidebar-item' onClick={onItemClick} index={4}>
        <SidebarItem iconClass={'icon-save-project'} title='Save Project'></SidebarItem>
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;
