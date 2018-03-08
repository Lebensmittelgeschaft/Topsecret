import * as React from 'react';
import { CardActions } from 'material-ui/Card';
import TextField from 'material-ui/TextField';

export interface ChatFooterProps {
    className?: string;
}

const chatFooter = (props: ChatFooterProps) => {
    return (
        <CardActions className={props.className} >
            <TextField InputProps={{ disableUnderline: true}} multiline={true} placeholder="Enter message..."/>
        </CardActions>
    );
};

export default chatFooter;
