import React from 'react';
import {
    Checkbox,
    Grid,
    Header,
    Icon,
    Menu,
    Segment,
    Sidebar,
  } from 'semantic-ui-react'

const LarmSidebar = (props:any) => {
    const [visible, setVisible] = React.useState(true)

    return (
        <div>
        <Sidebar.Pushable as={Segment}>
            <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={() => setVisible(false)}
            vertical
            visible={visible}
            width='thin'
            >
            <Menu.Item as='a'>
                <Icon name='home' />
                Home
            </Menu.Item>
            <Menu.Item as='a'>
                <Icon name='gamepad' />
                Games
            </Menu.Item>
            <Menu.Item as='a'>
                <Icon name='camera' />
                Channels
            </Menu.Item>
            </Sidebar>

            <Sidebar.Pusher>
            <Segment basic>
                {props.children}
            </Segment>
            </Sidebar.Pusher>
        </Sidebar.Pushable> 
        </div>
    );
}
export default LarmSidebar;