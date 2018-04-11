// @flow
import * as React from 'react';
import SettingsControls from '../../components/SettingsControls/SettingsControls';
import SettingsControl, { ControlPropType } from '../../components/SettingsControls/SettingsControl/SettingsControl';

type SettingsProps = {

}

type SettingsState = {

}

class Settings extends React.Component<SettingsProps, SettingsState> {
    render() {
        return (
            <SettingsControls>
                <SettingsControl
                    titleDivider="User"
                    controls={{
                        type: ControlPropType.Input,
                        properties: {
                            id: 'input_nickname',
                            tooltip: 'Change nickname',
                            placeholder: 'Nickname'
                        }
                    }}
                />
                <SettingsControl
                    titleDivider="Chat"
                    controls={{
                        type: ControlPropType.Switch,
                        properties: {
                            id: 'switch_stranger_allow',
                            checked: true,
                            label: 'Stranger can send messages to you',
                            tooltip: 'Enable/Disable Stranger from sending chat messages',
                            changeHandler: (event) => alert('changed')
                        }
                    }}
                />
                <SettingsControl
                    titleDivider="Notifications"
                    controls={[{
                        type: ControlPropType.Switch,
                        properties: {
                            id: 'switch_messages_notifications',
                            checked: false,
                            label: 'Chat messages notifications',
                            tooltip: 'Enable/Disable Chat messages notifications',
                            changeHandler: (event) => alert('changed')
                        }
                    },
                    {
                        type: ControlPropType.Switch,
                        properties: {
                            id: 'switch_user_post_notifications',
                            checked: true,
                            label: 'My Posts notifications',
                            tooltip: 'Enable/Disable notifications about posts you published',
                            changeHandler: (event) => alert('changed')
                        }
                    }]}
                />
            </SettingsControls>
        );
    }
}

export default Settings;