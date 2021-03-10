import React from 'react';
import './headerStyle.css';
import { Menu, Visibility, Button } from 'semantic-ui-react';

// interface Props {}

const Header = (props: any) => {
  return (
    <Menu borderless fixed={'top'} className='fixed-header'>
      <Menu.Item header>Prototype Build</Menu.Item>
    </Menu>
  );
};

export default Header;
