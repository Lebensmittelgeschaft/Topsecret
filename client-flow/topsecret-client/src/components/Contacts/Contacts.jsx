// @flow
import * as React from 'react';
import List, { ListSubheader } from 'material-ui/List';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import type { ContactProps } from './Contact/Contact';

type ContactsProps = {
    children?: React.ChildrenArray<ContactProps>;
}

export interface ContactsStyleProps {
    contactList: typeof style.contactList;
}

const style = {
    contactList: {
        borderRight: '2px solid grey'
    }
};

const contacts = (props: ContactsProps & WithStyles<$Keys<ContactsStyleProps>>) => {
    return (
        <List
            component="nav"
            className={props.classes.contactList}
            subheader={<ListSubheader > Contacts </ListSubheader>}
        >
            {props.children ? props.children : 'You didn\'t contact with anyone'}
        </List>
    );
};

export default withStyles(style)(contacts);
