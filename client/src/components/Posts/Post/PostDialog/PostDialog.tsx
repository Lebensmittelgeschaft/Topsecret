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
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Slide from 'material-ui/transitions/Slide';
import CloseIcon from 'material-ui-icons/Close';
import AccessTime from 'material-ui-icons/AccessTime';
import ThumbUp from 'material-ui-icons/ThumbUp';
import ThumbDown from 'material-ui-icons/ThumbDown';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Dialog from 'material-ui/Dialog';
import { PostProps } from '../Post';

export interface PostDialogProps {
    secret: PostProps['secret'];
    open: boolean;
    toggleShow: () => void;
    /* tslint:disable:no-any */
    handleLike: React.EventHandler<any>;
    handleDislike: React.EventHandler<any>;
}

export interface PostDialogState {
    currentShowing: boolean;
}

class PostDialog extends React.Component<PostDialogProps, PostDialogState> {

    constructor(props: PostDialogProps) {
        super(props);
        this.state = {
            currentShowing: props.open,
        };
    }

    handleClose = (event: React.SyntheticEvent<any>) => {
        this.props.toggleShow();
    }

    render() {

        const comments = this.props.secret.comments.map((comment, index) => (
            <ListItem key={index}>
                <Avatar>
                    <AccountCircle />
                </Avatar>
                <ListItemText primary={comment.postBy} secondary={comment.text} />
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
                                    <Button size="small" onClick={this.props.handleLike}>
                                        <ThumbDown />
                                    </Button>
                                </Grid>
                                <Grid item={true}>
                                    <Button size="small" onClick={this.props.handleDislike}>
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
                        <List style={{ overflow: 'auto', maxHeight: 250 }}>                            
                            {comments.length ? comments : 'There\'s no comments for this post'}
                        </List>
                        <TextField                            
                            multiline={true}
                            fullWidth={true}
                            InputProps={{ disableUnderline: true }}
                            rowsMax={2}
                            placeholder="Message"
                            margin="normal"
                        />
                    </Card>
                </div>
            </Dialog>
        );
    }
}

export default PostDialog;