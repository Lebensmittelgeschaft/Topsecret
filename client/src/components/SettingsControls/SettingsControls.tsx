import * as React from 'react';
import Grid from 'material-ui/Grid';
import SettingsControl from './SettingsControl/SettingsControl';

export interface SettingsControlsProps {

}

export interface SettingsControlsState {

}

class SettingsControls extends React.Component<SettingsControlsProps, SettingsControlsState> {
    render() {
        return (
            <Grid container={true} direction="column" justify="space-around" alignItems="center">
                <Grid item={true}>
                    <SettingsControl titleDivider="User" />
                </Grid>
            </Grid>
        );
    }
}

export default SettingsControls;
