// @flow
import * as React from 'react';
import Grid from 'material-ui/Grid';
import SettingsControl from './SettingsControl/SettingsControl';

export type SettingsControlsProps = {
    children: Array<React.Element<typeof SettingsControl>>
}

const settingsControls = (props: SettingsControlsProps) => {
    
    const settingsControlsElements: React.Node[] =
        props.children.map((control: React.Element<typeof SettingsControl>, index: number) => {
            return (
                <Grid key={index} item={true}>
                    <SettingsControl {...control.props } />
                </Grid>
            );
        });

    return (
        <Grid container={true} direction="column" justify="space-between" alignItems="center" spacing={40}>
            {settingsControlsElements}
        </Grid>
    );
};

export default settingsControls;
