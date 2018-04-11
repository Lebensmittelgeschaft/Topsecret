// @flow
import * as React from 'react';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ModeComment from '@material-ui/icons/ModeComment';
import AccessTime from '@material-ui/icons/AccessTime';
import { createFragmentContainer, graphql } from 'react-relay';

type PostProps = {
  secret: {
    id: string;
    publisher: string;
    text: string;
    comments: { postBy: string, text: string, timestamp?: number }[];
    likes: number;
    dislikes: number;
    timestamp: number;
  }; 
}

type PostState = {

}

export interface PostStyleProps {
  post: typeof style.post;
  postContent: typeof style.postContent;
  postActions: typeof style.postActions;
}

const style = (theme) => ({
  post: {
    display: 'inline-block',
    margin: theme.spacing.unit * 2,
  },
  postContent: {
  },
  postActions: {
  }
});

class Post extends React.Component<PostProps & WithStyles<$Keys<PostStyleProps>>, PostState> {
  render() {
    return (
      <Card className={this.props.classes.post}>
        <CardContent>
          <Typography align="center" variant="title" gutterBottom={true}>
            {this.props.secret.text}
          </Typography>
          <Grid container={true} direction="row" justify="space-between" alignItems="center">
            <Grid item={true}>
              <Typography align="left" variant="body1">
                <AccessTime/>
                {new Date(this.props.secret.timestamp).toLocaleString()}
              </Typography>
            </Grid>
            <Grid item={true}>
              <Typography align="right" variant="body2">
                {this.props.secret.publisher} 
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions className={this.props.classes.postActions}>
          <Grid container={true} direction="column" justify="space-around" alignItems="center">
            <Grid container={true} direction="row" justify="space-around" alignItems="center">
              <Grid item={true}>
                <Button size="small"><ModeComment /></Button>
              </Grid>
              <Grid item={true}>
                <Button size="small"><ThumbDown /></Button>
              </Grid>
              <Grid item={true}>
                <Button size="small"><ThumbUp /></Button>
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
                  {this.props.secret.dislikes}
                </Typography>
              </Grid>
              <Grid item={true}>
                <Typography variant="caption">
                  {this.props.secret.likes}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    );
  }
}

export default createFragmentContainer(
  withStyles(style)(Post),
  graphql`
  fragment Post_secret on Secret {
    id
    publisher
    text
    comments {
      postBy
      text
      timestamp
    }
    likes
    dislikes
    timestamp
  }
  `
);
