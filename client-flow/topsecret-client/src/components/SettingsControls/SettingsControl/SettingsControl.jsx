// @flow
import * as React from 'react';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import InputControl, { type InputControlProps } from './InputControl/InputControl';
import SwitchControl, { type SwitchControlProps } from './SwitchControl/SwitchControl';

type Switch = 'Switch';
type Input = 'Input';

type ControlsPropType = {
    Switch: 'Switch',
    Input: 'Input',
}

export const ControlPropType = {
    Switch: 'Switch',
    Input: 'Input',
}

export type ControlType = { type: $ElementType<ControlsPropType, Input>, properties: InputControlProps } |
    { type: $ElementType<ControlsPropType, Switch>, properties: SwitchControlProps };

export type SettingsControlProps ={
    titleDivider: string;
    controls: ControlType | ControlType[];
}

const settingsControl = (props: SettingsControlProps) => {
    let controls: React.Node[] = [];
    const propertiesControls: ControlType[] = Array.isArray(props.controls) ? props.controls : [props.controls];   

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
                throw new TypeError(`The type provided does'nt exist on SettingsControl types`);
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