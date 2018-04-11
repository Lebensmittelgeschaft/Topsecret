// @flow
import * as React from 'react';
import List, { ListSubheader } from 'material-ui/List';
import ChatPreview from './ChatPreview/ChatPreview';

type ChatsPreviewProps = {    
    children?: React.ChildrenArray<React.Element<typeof ChatPreview>>;
}

const chatsPreview = (props: ChatsPreviewProps) => {
    return (
       <List subheader={<ListSubheader> Chats </ListSubheader>}>
        {props.children ? props.children : 'You don\'t have any conversations'}
       </List>
    );
};

export default chatsPreview;
