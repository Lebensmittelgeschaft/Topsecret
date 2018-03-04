import * as React from 'react';
import Grid from 'material-ui/Grid';
import Switch from 'material-ui/Switch';
import Tooltip from 'material-ui/Tooltip';
import { FormControlLabel } from 'material-ui/Form';

export interface SwitchControlProps {
    id: string;
    checked: boolean;
    label: string;
    tooltip?: string;
    changeHandler: (event: object) => void;
}

const switchControl = (props: SwitchControlProps) => {
    const switchElement: React.ReactNode = <FormControlLabel
        control={<Switch
            id={props.id}
            checked={props.checked}
            onChange={props.changeHandler}
        />}
        label={props.label}
    />;
    const to = props.tooltip;
    const switchWithTooltip = props.tooltip ?
     <Tooltip title={to}> {switchElement} </Tooltip> : {switchElement};
    return (
        <Grid container={true} direction="row" justify="space-between">
            <Grid item={true}>
                {switchWithTooltip}
            </Grid>
        </Grid>

    );
}

export default switchControl;
