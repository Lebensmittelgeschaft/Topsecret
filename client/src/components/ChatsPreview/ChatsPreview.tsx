import * as React from 'react';
import List, { ListSubheader } from 'material-ui/List';
import { ChatPreviewProps } from './ChatPreview/ChatPreview';

export interface ChatsPreviewProps {
    children?: React.ReactElement<ChatPreviewProps> | React.ReactElement<ChatPreviewProps>[];
}

const chatsPreview = (props: ChatsPreviewProps) => {
    return (
       <List subheader={<ListSubheader> Chats </ListSubheader>}>
        {props.children ? props.children : 'You don\'t have any conversations'}
       </List>
    );
};

export default chatsPreview;
