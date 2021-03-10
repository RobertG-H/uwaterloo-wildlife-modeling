import React from 'react';
import { Sidebar } from '../components/Sidebar';
import './sidebarContainerStyle.css';
import { OptionView } from './OptionView';

// interface Props {}

const SidebarContainer = (props: any) => {
  return (
    <div className='sidebar-container'>
      <Sidebar />
      <OptionView />
    </div>
  );
};

export default SidebarContainer;
