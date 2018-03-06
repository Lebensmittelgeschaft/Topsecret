import * as React from 'react';
import Grid from 'material-ui/Grid';
import Switch from 'material-ui/Switch';
import { FormControlLabel } from 'material-ui/Form';
import Tooltip from 'material-ui/Tooltip';

export interface SwitchControlProps {
    id: string;
    checked: boolean;
    label: string;
    tooltip?: string;
    changeHandler: (event: object) => void;
}

const switchControl = (props: SwitchControlProps) => {
    const switchCoreElement = (
    <FormControlLabel
        control={<Switch
            id={props.id}
            checked={props.checked}
            onChange={props.changeHandler}
        />}
        label={props.label}
    />);

    return (
        <Grid container={true} direction="row" justify="space-between">
            <Grid item={true}>
                <Tooltip title={props.tooltip ? props.tooltip : props.label} children={switchCoreElement} />
            </Grid>
        </Grid>
    );
};

export default switchControl;
