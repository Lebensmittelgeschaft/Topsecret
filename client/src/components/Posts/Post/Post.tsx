import * as React from 'react';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import ThumbDown from 'material-ui-icons/ThumbDown';
import ThumbUp from 'material-ui-icons/ThumbUp';
import ModeComment from 'material-ui-icons/ModeComment';
import AccessTime from 'material-ui-icons/AccessTime';
import { createFragmentContainer } from 'react-relay';
import { postFragment } from '../../../queries/FeedQuery';
import { FeedMutator } from '../../../mutations/Feed/FeedMutations';
import PostDialog from './PostDialog/PostDialog';

export interface PostProps {
  secret: {
    id: string;
    publisher: { id: string, nickname: string };
    text: string;
    comments: { postBy: string, text: string, timestamp: string }[];
    likes: string[];
    dislikes: string[];
    timestamp: string;
  };
}

export interface PostState {
  likeToggled: boolean;
  dislikeToggled: boolean;
  openDialog: boolean;
}

export interface PostStyleProps {
  post: React.CSSProperties;
  postContent: React.CSSProperties;
  postActions: React.CSSProperties;
  // dislikeOn: React.CSSProperties;
  // dislikeOff: React.CSSProperties;
  // likeOn: React.CSSProperties;
  // likeOff: React.CSSProperties;
}

const style = (theme: Theme) => ({
  post: {
    display: 'inline-block',
    margin: theme.spacing.unit * 2,
  },
  postContent: {
  },
  postActions: {
  },
} as PostStyleProps);

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

enum ToggleLikeType {
  LIKE,
  DISLIKE
}

class Post extends React.Component<PostProps & WithStyles<keyof PostStyleProps>, PostState> {

  constructor(props: PostProps & WithStyles<keyof PostStyleProps>) {
    super(props);
    this.state = {
      likeToggled: false,
      dislikeToggled: false,
      openDialog: false,
    };
  }

  componentWillMount() {
    this.setState(this.setLikeDislikeStatus(this.props.secret));
  }

  /* tslint:disable:no-console */
  setLikeDislikeStatus(
    secret: {
      likes: PostProps['secret']['likes'],
      dislikes: PostProps['secret']['dislikes']
    }) {
    return {
      ...this.state,
      likeToggled: secret.likes.indexOf(localStorage.getItem('userId') || '') !== -1,
      dislikeToggled: secret.dislikes.indexOf(localStorage.getItem('userId') || '') !== -1
    };
  }

  render() {
    return (
      <div>
        <Card className={this.props.classes.post}>
          <CardContent>
            <Typography align="center" variant="title" gutterBottom={true}>
              {this.props.secret.text}
            </Typography>
            <Grid container={true} direction="row" justify="space-between" alignItems="center">
              <Grid item={true}>
                <Typography align="left" variant="body1">
                  <AccessTime />
                  {new Date(+this.props.secret.timestamp).toLocaleString()}
                </Typography>
              </Grid>
              <Grid item={true}>
                <Typography align="right" variant="body2">
                  {this.props.secret.publisher.nickname}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions className={this.props.classes.postActions}>
            <Grid container={true} direction="column" justify="space-around" alignItems="center">
              <Grid container={true} direction="row" justify="space-around" alignItems="center">
                <Grid item={true}>
                  <Button size="small" onClick={this.toggleOpenDialog}>
                    <ModeComment />
                  </Button>
                </Grid>
                <Grid item={true}>
                  <Button
                    style={this.state.dislikeToggled ? actionStyle.dislikeOn : actionStyle.dislikeOff}
                    size="small"
                    onClick={this.handleToggleDislike}
                  ><ThumbDown />
                  </Button>
                </Grid>
                <Grid item={true}>
                  <Button
                    style={this.state.likeToggled ? actionStyle.likeOn : actionStyle.likeOff}
                    size="small"
                    onClick={this.handleToggleLike}
                  ><ThumbUp />
                  </Button>
                </Grid>
              </Grid>
              <Grid container={true} direction="row" justify="space-around" alignItems="center">
                <Grid item={true}>
                  <Typography variant="caption">
                    {this.props.secret.comments.length}
                  </Typography>
                </Grid>
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
        </Card>
        {this.state.openDialog ?         
        <PostDialog
          secret={this.props.secret}
          open={this.state.openDialog}
          toggleShow={this.toggleOpenDialog}
          handleLike={this.handleToggleLike}
          handleDislike={this.handleToggleDislike}          
        /> : null}
      </div>
    );
  }

  private toggleOpenDialog = () => {
    this.setState({ ...this.state, openDialog: !this.state.openDialog });
  }

  /* tslint:disable:no-console */
  private handleToggleLike = () => {
    FeedMutator.toggleLike(this.props.secret.id)({
      optimisticResponse: this.getToggleLikeOptimisticResponse(ToggleLikeType.LIKE),
      onError: (error) => console.log('Error Like'),
    });
  }

  private handleToggleDislike = () => {
    /* tslint:disable:no-console */
    FeedMutator.toggleDislike(this.props.secret.id)({
      optimisticResponse: this.getToggleLikeOptimisticResponse(ToggleLikeType.DISLIKE),
      onError: (error) => console.log('Error Dislike'),
    });
  }

  private getToggleLikeOptimisticResponse = (likeType: ToggleLikeType) => {
    const response = {
      toggleLike: {
        secret: {
          id: this.props.secret.id,
          likes: [...this.props.secret.likes],
          dislikes: [...this.props.secret.likes],
        }
      }
    };

    switch (likeType) {
      case (ToggleLikeType.LIKE):
        if (this.state.likeToggled) {
          response.toggleLike.secret.likes =
            response.toggleLike.secret.likes
              .splice(this.props.secret.likes.indexOf(localStorage.getItem('userId') || ''), 1);
        } else {
          if (this.state.dislikeToggled) {
            response.toggleLike.secret.dislikes =
              response.toggleLike.secret.dislikes
                .splice(this.props.secret.dislikes.indexOf(localStorage.getItem('userId') || ''), 1);
          }
          response.toggleLike.secret.likes.push(localStorage.getItem('userId') || '');
        }
        break;
      case (ToggleLikeType.DISLIKE):
        if (this.state.dislikeToggled) {
          response.toggleLike.secret.dislikes =
            response.toggleLike.secret.dislikes
              .splice(this.props.secret.dislikes.indexOf(localStorage.getItem('userId') || ''), 1);
        } else {
          if (this.state.likeToggled) {
            response.toggleLike.secret.likes =
              response.toggleLike.secret.likes
                .splice(this.props.secret.likes.indexOf(localStorage.getItem('userId') || ''), 1);
          }
          response.toggleLike.secret.dislikes.push(localStorage.getItem('userId') || '');
        }
        break;
      default:
    }

    this.setState(this.setLikeDislikeStatus(response.toggleLike.secret));
    return response;
  }

}

export default createFragmentContainer(
  withStyles(style)(Post),
  postFragment
);
