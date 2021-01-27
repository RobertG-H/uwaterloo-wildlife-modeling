// Stick header code from: https://github.com/Semantic-Org/Semantic-UI-React/blob/master/docs/src/layouts/StickyLayout.js

import { Menu, Container, Visibility, Icon } from 'semantic-ui-react';
import React from 'react';

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

    return (
        <div>
            <Visibility onBottomPassed={stickTopMenu} onBottomVisible={unStickTopMenu} once={false}>
                <Menu borderless fixed={menuFixed ? 'top' : undefined} style={menuFixed ? fixedMenuStyle : menuStyle}>
                    <Container text>
                        <Menu.Item header>Untitled Project</Menu.Item>
                        <Menu.Item>
                            <Icon name="user" />
                        </Menu.Item>
                    </Container>
                </Menu>
            </Visibility>
        </div>
    );
};

export default LarmHeader;
