import * as React from 'react';
import Card from 'material-ui/Card';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatBody from './ChatBody/ChatBody';
import ChatFooter from './ChatFooter/ChatFooter';

export interface ChatConversationProps {

}

export interface ChatConversationState {

}

class ChatConversation extends React.Component<ChatConversationProps, ChatConversationState> {
    render() {
        return (
            <Card>
                <ChatHeader contactName="Anonymous" />
                <ChatBody
                    messages={{
                        sender: 'Anonymous',
                        receiver: 'Me',
                        messageText: 'SomeText',
                        timestamp: 123456789
                    }}
                />
                <ChatFooter />
            </Card>
        );
    }
}

export default ChatConversation;
