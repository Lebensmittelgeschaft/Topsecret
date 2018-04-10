// @flow
import * as React from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

export type ChatPreviewProps = {
    contactName: string;
    lastMessage: string;
}

const chatPreview = (props: ChatPreviewProps) => {
    return (
        <ListItem button={true}>
            <ListItemText primary={props.contactName} secondary={props.lastMessage} />
            <ListItemSecondaryAction>
                <IconButton>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default chatPreview;
