import * as React from 'react';
import Card, { CardContent, CardActions } from 'material-ui/Card';
// import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import ThumbDown from 'material-ui-icons/ThumbDown';
import ThumbUp from 'material-ui-icons/ThumbUp';
import ModeComment from 'material-ui-icons/ModeComment';

export interface PostProps {
  publisher: string;
  secretText: string;
  // comments: { postBy: string, comment: string, timestamp?: number }[];
  // likes: number;
  // dislikes: number;
  // timestamp: number;
}

export interface PostState {

}

export interface PostStyleProps {

}

class Post extends React.Component<PostProps, PostState> {
  render() {
    return (
      <Card>
        <CardContent>
          <Typography component="div" variant="title">
            {this.props.secretText}
          </Typography>
          <Typography component="div" variant="caption">
            {this.props.publisher}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small"><ThumbUp/></Button>
          <Button size="small"><ThumbDown/></Button>
          <Button size="small"><ModeComment/></Button>
        </CardActions>
      </Card>
    );
  }
}

export default Post;
