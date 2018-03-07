import * as React from 'react';
import List from 'material-ui/List';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import { ContactProps } from './Contact/Contact';

export interface ContactsProps {
    children?: React.ReactElement<ContactProps> | React.ReactElement<ContactProps>[];    
}

export interface ContactsStyleProps {
    contactList: React.CSSProperties;
}

const style = (theme: Theme) => ({
    contactList: {
        borderRight: '2px solid grey'
    }
} as ContactsStyleProps); 

const contacts = (props: ContactsProps & WithStyles<keyof ContactsStyleProps>) => {
    return (
        <List component="nav" className={props.classes.contactList}>
            {props.children ? props.children : 'You didn\'t contact with anyone'}
        </List>
    );
};

export default withStyles(style)(contacts);
