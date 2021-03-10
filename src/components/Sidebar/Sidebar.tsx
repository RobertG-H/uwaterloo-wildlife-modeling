import React from 'react';
import './sidebarStyle.css';
import SidebarItem from './SidebarItem';
import { Loader, Dimmer, Menu } from 'semantic-ui-react';

// interface Props {}

const Sidebar = (props: any) => {
  return (
    <Menu className='sidebar-acordian' icon='labeled' inverted vertical width='thin' borderless>
      <Menu.Item as='a'>
        <SidebarItem title='Create New Map'></SidebarItem>
      </Menu.Item>
      <Menu.Item as='a'>
        <SidebarItem></SidebarItem>
      </Menu.Item>
      <Menu.Item as='a'>
        <SidebarItem></SidebarItem>
      </Menu.Item>
      <hr></hr>
      <Menu.Item as='a'>
        <SidebarItem></SidebarItem>
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;
