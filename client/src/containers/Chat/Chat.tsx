import * as React from 'react';
import Grid from 'material-ui/Grid';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import AddIcon from 'material-ui-icons/Add';
import Contacts from '../../components/Contacts/Contacts';
import Contact from '../../components/Contacts/Contact/Contact';
import ChatPreview from '../../components/ChatsPreview/ChatPreview/ChatPreview';
import ChatsPreview from '../../components/ChatsPreview/ChatsPreview';
import Fab from '../../components/Fab/Fab';

export interface ChatProps {

}

export interface ChatStyleProps {
    chatContainer: React.CSSProperties;
}

export interface ChatState {

}

const style = (theme: Theme) => ({
    chatContainer: {
        marginTop: '10%',
    }
} as ChatStyleProps);

class Chat extends React.Component<ChatProps & WithStyles<keyof ChatStyleProps>, ChatState> {
    render() {
        return (
            <div>
                <Grid
                    className={this.props.classes.chatContainer}
                    container={true}
                    spacing={0}
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item={true}>
                        <Contacts>
                            <Contact name="someone" />
                            <Contact name="tester" />
                            <Contact name="some" />
                            <Contact name="anonymous" />
                        </Contacts>
                    </Grid>

                    <Grid item={true}>
                        <ChatsPreview>
                            <ChatPreview contactName="someone" lastMessage="hey wasup" />
                            <ChatPreview contactName="tester" lastMessage="are you here?" />
                            <ChatPreview contactName="some" lastMessage="hey wasup" />
                        </ChatsPreview>
                    </Grid>
                </Grid>
                <Fab action={(event) => alert('Clicked!')}>
                    <AddIcon />
                </Fab>
            </div>
        );
    }
}

export default withStyles(style)(Chat);
