import * as React from 'react';
import Grid from 'material-ui/Grid';
import Card from 'material-ui/Card';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatBody from './ChatBody/ChatBody';
import ChatFooter from './ChatFooter/ChatFooter';

export interface ChatConversationProps {

}

export interface ChatConversationState {

}

export interface ChatConversationStyleProps {
    chatContainer: React.CSSProperties;
    chatHeader: React.CSSProperties;
    chatBody: React.CSSProperties;
    chatFooter: React.CSSProperties;
}

const style = (theme: Theme) => ({
    chatContainer: {   
        marginTop: '10%'
    },
    chatHeader: {        
        borderBottom: '1px solid #e0e0e0',
    },
    chatBody: {
        borderBottom: '1px solid #e0e0e0'
    }
} as ChatConversationStyleProps);

class ChatConversation extends React.Component<ChatConversationProps & WithStyles<keyof ChatConversationStyleProps>,
    ChatConversationState> {
    render() {
        return (
            <Grid 
                container={true}
                className={this.props.classes.chatContainer}
                direction="column"
                justify="space-between"
                alignItems="center"
            >
                <Card raised={true}>
                    <Grid item={true}>
                        <ChatHeader className={this.props.classes.chatHeader} contactName="Anonymous" />
                    </Grid>
                    <Grid item={true}>
                        <ChatBody
                            className={this.props.classes.chatBody}
                            messages={{
                                sender: 'Anonymous',
                                receiver: 'Me',
                                messageText: 'SomeText',
                                timestamp: 123456789
                            }}
                        />
                    </Grid>
                    <Grid item={true}>
                        <ChatFooter />
                    </Grid>
                </Card>
            </Grid>
        );
    }
}

export default withStyles(style)(ChatConversation);
