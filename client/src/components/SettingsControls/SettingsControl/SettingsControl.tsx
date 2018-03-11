import * as React from 'react';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import InputControl, { InputControlProps } from './InputControl/InputControl';
import SwitchControl, { SwitchControlProps } from './SwitchControl/SwitchControl';

export enum ControlPropType {
    Switch = 'SWITCH_CONTROL',
    Input = 'INPUT_CONTROL',
}

export type ControlType = { type: ControlPropType.Input, properties: InputControlProps } |
    { type: ControlPropType.Switch, properties: SwitchControlProps };

export interface SettingsControlProps {
    titleDivider: string;
    controls: ControlType | ControlType[];
}

const settingsControl = (props: SettingsControlProps) => {
    let controls: JSX.Element[] = [];
    const propertiesControls = Array.isArray(props.controls) ? props.controls : new Array(props.controls);

    propertiesControls.forEach((options: ControlType, index: number) => {

        switch (options.type) {
            case (ControlPropType.Input):
                controls.push(
                    <Grid key={index} container={true} direction="row" justify="space-between">
                        <Grid item={true}>
                            <InputControl
                                {...options.properties}
                            />
                        </Grid>
                    </Grid>
                );
                break;
            case (ControlPropType.Switch):
                controls.push(
                    <Grid key={index} container={true} direction="row" justify="space-between">
                        <Grid item={true}>
                            <SwitchControl
                                {...options.properties}
                            />
                        </Grid>
                    </Grid>
                );
                break;
            default:
                throw new TypeError(`The type provided does'nt exist on ${ControlPropType}`);
        }
    });

    return (
        <div>
            <Typography align="center" variant="headline">
                {props.titleDivider}
            </Typography>
            <Divider />
            <Grid container={true} direction="column" justify="space-between">
                {controls}
            </Grid>
        </div>
    );
};

export default settingsControl;