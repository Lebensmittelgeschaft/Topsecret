// @flow
import * as React from 'react';
import { CardHeader } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ReturnIcon from '@material-ui/icons/KeyboardBackspace';

type ChatHeaderProps = {
    className?: string;
    contactName: string;
}

const chatHeader = (props: ChatHeaderProps) => {
    return (
        <CardHeader 
            className={props.className}
            title={props.contactName}
            avatar={
                <IconButton>
                    <ReturnIcon />
                </IconButton>
            }
        />
    );
};

export default chatHeader;
