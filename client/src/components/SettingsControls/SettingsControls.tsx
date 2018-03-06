import * as React from 'react';
import Grid from 'material-ui/Grid';
import SettingsControl, { ControlPropType } from './SettingsControl/SettingsControl';

export interface SettingsControlsProps {

}

export interface SettingsControlsState {

}

class SettingsControls extends React.Component<SettingsControlsProps, SettingsControlsState> {
    render() {
        return (
            <Grid container={true} direction="column" justify="space-between" alignItems="center" spacing={40}>
                <Grid item={true}>
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
                </Grid>
                <Grid item={true}>
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
                </Grid>
                <Grid item={true}>
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
                </Grid>
            </Grid>
        );
    }
}

export default SettingsControls;
