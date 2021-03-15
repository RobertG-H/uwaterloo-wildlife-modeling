import React from 'react';
import { Header } from 'semantic-ui-react';
import './sidebarStyle.css';

interface Props {
  iconClass: string;
  title: string;
  active: boolean;
}
const SidebarItem = (props: Props) => {
  return (
    <div>
      {props.active && (
        <>
          <div className='sidebar-item-icon'>
            <div className={'icon-35 ' + props.iconClass + '-active'} />
          </div>
          <Header as='h5' inverted={true} className='sidebar-item-text-active'>
            {props.title}
          </Header>
        </>
      )}
      {!props.active && (
        <>
          <div className='sidebar-item-icon'>
            <div className={'icon-35 ' + props.iconClass} />
          </div>
          <Header as='h5' inverted={true} className='sidebar-item-text'>
            {props.title}
          </Header>
        </>
      )}
    </div>
  );
};

export default SidebarItem;
