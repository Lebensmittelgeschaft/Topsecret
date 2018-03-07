import * as React from 'react';
import Grid from 'material-ui/Grid';
import SettingsControl from './SettingsControl/SettingsControl';

export interface SettingsControlsProps {
    children: React.ReactNode[];
}

const settingsControls = (props: SettingsControlsProps) => {

    const settingsControlsElements: React.ReactNode[] =
        props.children.map((control: JSX.Element, index: number) => {
            return (
                <Grid key={index} item={true}>
                    <SettingsControl {...control.props} />
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
