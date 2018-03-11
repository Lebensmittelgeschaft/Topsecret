import * as React from 'react';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';

export interface InputControlProps {
    id: string;
    tooltip?: string;
    placeholder: string;
    changeHandler?: (event: object) => void; 
}

const inputControl = (props: InputControlProps) => {
    return (
        <Grid container={true} direction="row" justify="space-between">
            <Grid item={true}>
                <TextField
                    id={props.id}
                    label={props.tooltip ? props.tooltip : props.placeholder}
                    placeholder={props.placeholder}
                    onChange={props.changeHandler}
                />
            </Grid>
        </Grid>
    );
};

export default inputControl;
