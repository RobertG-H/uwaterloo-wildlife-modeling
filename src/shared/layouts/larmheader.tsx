// Stick header code from: https://github.com/Semantic-Org/Semantic-UI-React/blob/master/docs/src/layouts/StickyLayout.js

import { Menu, Container, Visibility, Icon, Button } from 'semantic-ui-react';
import React from 'react';
import { AuthContext } from '../../AuthProvider';

const menuStyle = {
    border: 'none',
    borderRadius: 0,
    boxShadow: 'none',
    transition: 'box-shadow 0.5s ease, padding 0.5s ease',
};

const fixedMenuStyle = {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
};

const LarmHeader = () => {
    const [menuFixed, setMenuFixed] = React.useState(false);

    const stickTopMenu = () => setMenuFixed(true);

    const unStickTopMenu = () => setMenuFixed(false);

    const { logout } = React.useContext(AuthContext);

    return (
        <div>
            <Visibility onBottomPassed={stickTopMenu} onBottomVisible={unStickTopMenu} once={false}>
                <Menu borderless fixed={menuFixed ? 'top' : undefined} style={menuFixed ? fixedMenuStyle : menuStyle}>
                    <Menu.Item header>Untitled Project</Menu.Item>
                    <Menu.Item position="right">
                        <Button icon="log out" onClick={logout} />
                    </Menu.Item>
                </Menu>
            </Visibility>
        </div>
    );
};

export default LarmHeader;
