import React from 'react';
import './sidebarStyle.css';
import SidebarItem from './SidebarItem';
import { Loader, Dimmer, Menu } from 'semantic-ui-react';

interface Props {
  setTab: React.Dispatch<React.SetStateAction<number>>;
}

const Sidebar = (props: Props) => {
  const onItemClick = (event: any, data: any) => {
    props.setTab(data!.index);
  };

  return (
    <Menu className='sidebar-acordian' icon='labeled' inverted vertical width='thin' borderless>
      <Menu.Item onClick={onItemClick} index={1}>
        <SidebarItem title='Create New Map'></SidebarItem>
      </Menu.Item>
      <Menu.Item onClick={onItemClick} index={2}>
        <SidebarItem title='Edit Maps'></SidebarItem>
      </Menu.Item>
      <Menu.Item onClick={onItemClick} index={3}>
        <SidebarItem title='Layer View'></SidebarItem>
      </Menu.Item>
      <hr></hr>
      <Menu.Item onClick={onItemClick} index={4}>
        <SidebarItem title='Save Project'></SidebarItem>
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;
