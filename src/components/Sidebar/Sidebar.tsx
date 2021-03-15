import React from 'react';
import './sidebarStyle.css';
import SidebarItem from './SidebarItem';
import tempIcon from '../../assets/icons/light-icons/add-light.png';
import { Loader, Dimmer, Menu } from 'semantic-ui-react';

interface Props {
  setTab(newTab: number): void;
  currentTab: number;
}

const Sidebar = (props: Props) => {
  const onItemClick = (event: any, data: any) => {
    props.setTab(data!.index);
  };

  return (
    <Menu className='sidebar-acordian' icon='labeled' inverted vertical width='thin' borderless>
      <Menu.Item className='sidebar-item' onClick={onItemClick} index={1} active={props.currentTab === 1}>
        <SidebarItem iconClass={'icon-create-new-map'} title='Create New Map' active={props.currentTab === 1}></SidebarItem>
      </Menu.Item>
      <Menu.Item className='sidebar-item' onClick={onItemClick} index={2} active={props.currentTab === 2}>
        <SidebarItem iconClass={'icon-edit-maps'} title='Edit Maps' active={props.currentTab === 2}></SidebarItem>
      </Menu.Item>
      <Menu.Item className='sidebar-item' onClick={onItemClick} index={3} active={props.currentTab === 3 || props.currentTab === 4}>
        <SidebarItem
          iconClass={'icon-layer-view'}
          title='Layer View'
          active={props.currentTab === 3 || props.currentTab === 4}
        ></SidebarItem>
      </Menu.Item>
      <hr></hr>
      <Menu.Item className='sidebar-item' onClick={onItemClick} index={9} active={props.currentTab === 9}>
        <SidebarItem iconClass={'icon-save-project'} title='Save Project' active={props.currentTab === 9}></SidebarItem>
      </Menu.Item>
      <Menu.Item className='sidebar-item' onClick={onItemClick} index={5} active={props.currentTab === 5}>
        <SidebarItem iconClass={'icon-edit-project'} title='Edit Project' active={props.currentTab === 5}></SidebarItem>
      </Menu.Item>
      <Menu.Item className='sidebar-item' onClick={onItemClick} index={6} active={props.currentTab === 6}>
        <SidebarItem iconClass={'icon-open-project'} title='Open Project' active={props.currentTab === 6}></SidebarItem>
      </Menu.Item>
      <hr></hr>
      <Menu.Item className='sidebar-item' onClick={onItemClick} index={7} active={props.currentTab === 7}>
        <SidebarItem iconClass={'icon-settings'} title='Settings' active={props.currentTab === 7}></SidebarItem>
      </Menu.Item>
      <Menu.Item className='sidebar-item' onClick={onItemClick} index={8} active={props.currentTab === 8}>
        <SidebarItem iconClass={'icon-help'} title='Help' active={props.currentTab === 8}></SidebarItem>
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;
