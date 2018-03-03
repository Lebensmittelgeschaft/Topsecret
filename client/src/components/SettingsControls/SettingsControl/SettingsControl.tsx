import * as React from 'react';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import InputControl, { InputControlProps } from './InputControl/InputControl';
import SwitchControl, { SwitchControlProps } from './SwitchControl/SwitchControl';

export enum PropType {
    Switch = 'SWITCH_CONTROL',
    Input = 'INPUT_CONTROL',    
}

export interface SettingsControlProps {
    titleDivider: string;
    controls:  { type: PropType.Input, properties: InputControlProps }[] |
                 { type: PropType.Switch, properites: SwitchControlProps }[] |
                 { type: PropType.Input, properties: InputControlProps } |
                 { type: PropType.Switch, properties: SwitchControlProps }
}

const settingsControl = (props: SettingsControlProps) => {    
    
    let controls: JSX.Element[] = [];
    const propertiesControls = Array.isArray(props.controls) ? props.controls : new Array(props.controls);

    propertiesControls.forEach((options: SettingsControlProps.controls, index) => {        
        switch (options.type) {
            case (PropType.Input):
                controls.push(                        
                    <Grid key={index} container={true} direction="row" justify="space-between">
                        <Grid item={true}>
                            <TextField 
                                id={'text-field-' + index} 
                                label={options.tooltip ? options.tooltip : options.label} 
                                placeholder={options.label}
                                onChange={options.changeHandler}
                            />                            
                        </Grid>
                    </Grid>
                ); 
                break;
            case (PropType.Switch):
                // const switchControl = <Switch checked={}
                controls.push(
                    <Grid key={index} container={true} direction="row" justify="space-between">
                    <Grid item={true}>
                        {options.tooltip ? 
                        <Tooltip id={'tooltip-' + index} title={options.tooltip}>
                            {switchControl}
                        </Tooltip> : {switchControl}}
                    </Grid>
                </Grid>
                );
                break;        
        }
    }); 

    return (
    <div>
        <Typography align="right" variant="headline">
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