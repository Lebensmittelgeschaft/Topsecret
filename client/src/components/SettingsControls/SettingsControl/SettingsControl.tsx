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

export type ControlType = { type: PropType.Input, properties: InputControlProps } |
                          { type: PropType.Switch, properties: SwitchControlProps }

export interface SettingsControlProps {
    titleDivider: string;
    controls: ControlType | ControlType[]
}

const settingsControl = (props: SettingsControlProps) => {    
    
    let controls: JSX.Element[] = [];
    const propertiesControls = Array.isArray(props.controls) ? props.controls : new Array(props.controls);

    propertiesControls.forEach((options: ControlType , index: number) => {  

        switch (options.type) {
            case (PropType.Input):
                controls.push(                        
                    <Grid key={index} container={true} direction="row" justify="space-between">
                        <Grid item={true}>
                            <InputControl 
                                id={options.type + index} 
                                tooltip={options.properties.tooltip} 
                                label={options.properties.label}
                                changeHandler={options.properties.changeHandler}
                            />                            
                        </Grid>
                    </Grid>
                ); 
                break;
            case (PropType.Switch):                                    
                controls.push(
                    <Grid key={index} container={true} direction="row" justify="space-between">
                    <Grid item={true}>
                        <SwitchControl
                            id={options.type + index}
                            checked={options.properties.checked}
                            tooltip={options.properties.tooltip}
                            label={options.properties.label}
                            changeHandler={options.properties.changeHandler}                            
                        />
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