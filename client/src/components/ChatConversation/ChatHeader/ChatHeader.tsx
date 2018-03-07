import * as React from 'react';
import { CardHeader } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ReturnIcon from 'material-ui-icons/KeyboardArrowLeft';

export interface ChatHeaderProps {
    contactName: string;
}

const chatHeader = (props: ChatHeaderProps) => {
    return (
        <CardHeader 
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
