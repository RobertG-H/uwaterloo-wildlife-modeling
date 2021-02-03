// Stick header code from: https://github.com/Semantic-Org/Semantic-UI-React/blob/master/docs/src/layouts/StickyLayout.js

import { Menu, Container, Visibility, Icon, Button } from 'semantic-ui-react';
import React from 'react';
import { AuthContext } from '../../AuthProvider';
import { OutputContext } from '../../OutputProvider';

// const menuStyle = {
//   border: 'none',
//   borderRadius: 0,
//   boxShadow: 'none',
//   transition: 'box-shadow 0.5s ease, padding 0.5s ease',
// };

const fixedMenuStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  boxShadow: 'none',
  // boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
};

const LarmHeader = () => {
  const [menuFixed, setMenuFixed] = React.useState(false);

  const { logout } = React.useContext(AuthContext);
  const { projectName } = React.useContext(OutputContext);

  return (
    <div>
      <Visibility onBottomPassed={() => setMenuFixed(true)} onBottomVisible={() => setMenuFixed(false)} once={false}>
        <Menu borderless fixed={'top'} style={fixedMenuStyle}>
          <Menu.Item header>{projectName}</Menu.Item>
          <Menu.Item position='right'>
            <Button icon='log out' onClick={logout} />
          </Menu.Item>
        </Menu>
      </Visibility>
    </div>
  );
};

export default LarmHeader;
