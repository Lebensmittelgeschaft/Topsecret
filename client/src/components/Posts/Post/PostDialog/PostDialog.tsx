import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Slide from 'material-ui/transitions/Slide';
import CloseIcon from 'material-ui-icons/Close';
import AccessTime from 'material-ui-icons/AccessTime';
import ThumbUp from 'material-ui-icons/ThumbUp';
import ThumbDown from 'material-ui-icons/ThumbDown';
import AccountCircle from 'material-ui-icons/AccountCircle';
import { PostProps } from '../Post';

export interface PostDialogProps {
    secret: PostProps['secret'];
    open: boolean;
    toggleShow: () => void;
    /* tslint:disable:no-any */
    handleLike: React.EventHandler<any>;
    handleDislike: React.EventHandler<any>;
    handleAddComment: React.EventHandler<any>;
    likeToggled: boolean;
    dislikeToggled: boolean;

}

export interface PostDialogState {
    currentShowing: boolean;
    text: string;
    messageSent: boolean;
}

const actionStyle = {
    dislikeOn: {
        opacity: 1,
    },
    likeOn: {
        opacity: 1,
    },
    dislikeOff: {
        opacity: 0.5,
    },
    likeOff: {
        opacity: 0.5
    }
};

class PostDialog extends React.Component<PostDialogProps, PostDialogState> {    

    constructor(props: PostDialogProps) {
        super(props);
        this.state = {
            currentShowing: props.open,
            text: '',
            messageSent: false,
        };
    }

    handleClose = (event: React.SyntheticEvent<any>) => {
        this.props.toggleShow();
    }    

    handleKeyChange = (event: React.KeyboardEvent<any>) => {
        /* tslint:disable:no-console */
        if (event.key === 'Enter') {
            if (event.shiftKey) {
                this.setState({ ...this.state, text: this.state.text + '\r\n' });
            } else {
                const textMessage = this.state.text;
                this.props.handleAddComment(textMessage);
                this.setState({ ...this.state, messageSent: true, text: '' });
            }
        } 
    }

    handleTextChange = (event: React.ChangeEvent<any>) => {
        if (event.target.value.charCodeAt(event.target.value.length - 1) !== '10') {
            this.setState({ ...this.state, text: event.target.value });
        }
    }

    shouldComponentUpdate(nextProps: PostDialogProps, nextState: PostDialogState) {        
        return (this.props.likeToggled !== nextProps.likeToggled ||
                this.props.dislikeToggled !== nextProps.dislikeToggled ||
                (this.props.secret.comments.length !== nextProps.secret.comments.length ||
                 nextState.messageSent === true));
    }

    componentDidUpdate(prevProps: PostDialogProps, prevState: PostDialogState) {
        this.setState({ ...this.state, messageSent: prevState.messageSent });
    }

    render() {
        const comments = this.props.secret.comments.map((comment, index) => (
            <ListItem key={index}>
                <Avatar>
                    <AccountCircle />
                </Avatar>
                <ListItemText primary={comment.postBy.nickname} secondary={comment.text} />
                <ListItemSecondaryAction>
                    {new Date(+comment.timestamp).toLocaleString()}
                </ListItemSecondaryAction>
            </ListItem>
        ));

        return (
            <Dialog
                open={this.state.currentShowing}
                fullScreen={true}
                onClose={this.handleClose}
                transition={(props) => <Slide direction="up" {...props} />}
            >
                <div>
                    <AppBar style={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit" >
                                Post Details
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Card>
                        <CardContent>
                            <Typography
                                align="center"
                                gutterBottom={true}
                                variant="display2"
                                component="h2"
                            >
                                {this.props.secret.text}
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <Grid
                                container={true}
                                direction="row"
                                justify="space-between"
                                alignItems="center"
                            >
                                <Grid item={true}>
                                    <Typography align="left" variant="body1">
                                        <AccessTime />
                                        {new Date(+this.props.secret.timestamp).toLocaleString()}
                                    </Typography>
                                </Grid>
                                <Grid item={true}>
                                    <Typography align="right" variant="headline">
                                        {this.props.secret.publisher.nickname}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Grid
                                container={true}
                                direction="row"
                                justify="space-around"
                                alignItems="center"
                            >
                                <Grid item={true}>
                                    <Button
                                        style={
                                            this.props.dislikeToggled ?
                                                actionStyle.dislikeOn : actionStyle.dislikeOff
                                        }
                                        size="small"
                                        onClick={this.props.handleDislike}
                                    >
                                        <ThumbDown />
                                    </Button>
                                </Grid>
                                <Grid item={true}>
                                    <Button
                                        style={
                                            this.props.likeToggled ?
                                                actionStyle.likeOn : actionStyle.likeOff
                                        }
                                        size="small"
                                        onClick={this.props.handleLike}
                                    >
                                        <ThumbUp />
                                    </Button>
                                </Grid>
                                <Grid
                                    container={true}
                                    direction="row"
                                    justify="space-around"
                                    alignItems="center"
                                >
                                    <Grid item={true}>
                                        <Typography variant="caption">
                                            {this.props.secret.dislikes.length}
                                        </Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="caption">
                                            {this.props.secret.likes.length}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardActions>
                        <Divider />
                        <List style={{ overflow: 'auto', maxHeight: 210 }}>
                            {comments.length ? comments : 'There\'s no comments for this post'}
                        </List>
                        <Grid container={true} alignItems="center">
                            <Grid item={true}>
                                <Avatar>
                                    <AccountCircle />
                                </Avatar>
                            </Grid>
                            <Grid item={true} lg={11} md={11} xl={11} xs={11} sm={11}>
                                <TextField
                                    multiline={true}
                                    fullWidth={true}
                                    InputProps={{ disableUnderline: true }}
                                    rowsMax={2}
                                    placeholder="Enter message..."
                                    margin="normal"
                                    onKeyPress={this.handleKeyChange}
                                    onChange={this.handleTextChange}
                                    {...(this.state.text ? { defaultValue: this.state.text } : null )}
                                />
                            </Grid>
                        </Grid>
                    </Card>
                </div>
            </Dialog>
        );
    }
}

export default PostDialog;