import * as React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import PersonIcon from 'material-ui-icons/Person';

export interface ContactProps {
    name: string;
}

const contact = (props: ContactProps) => {
    return (
        <ListItem button={true}>
            <ListItemIcon>
                <PersonIcon />
            </ListItemIcon>
            <ListItemText inset={true} primary={props.name} />
        </ListItem>
    );
};

export default contact;
