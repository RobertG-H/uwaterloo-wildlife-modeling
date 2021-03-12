import React from 'react';
import { Header } from 'semantic-ui-react';
import './sidebarStyle.css';

interface Props {
  iconClass: string;
  title: string;
}
// height='35' width='35'
const SidebarItem = (props: Props) => {
  return (
    <div>
      <div className='sidebar-item-icon'>
        <div className={'icon-35 ' + props.iconClass} />
      </div>
      <Header as='h5' inverted={true} className='sidebar-item-text'>
        {props.title}
      </Header>
    </div>
  );
};

export default SidebarItem;
