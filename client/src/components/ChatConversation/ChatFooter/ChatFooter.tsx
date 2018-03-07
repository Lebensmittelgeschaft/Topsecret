import * as React from 'react';
import { CardActions } from 'material-ui/Card';
import TextField from 'material-ui/TextField';

export interface ChatFooterProps {

}

const chatFooter = (props: ChatFooterProps) => {
    return (
        <CardActions >
            <TextField placeholder="Enter message..."/>
        </CardActions>
    );
};

export default chatFooter;
