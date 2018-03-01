import * as React from 'react';
import Grid from 'material-ui/Grid';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import Post from './Post/Post';

// TODO: Use pagination for showing only number of posts and when scrolling
//       down will make http request for more posts - lazy loading posts by pagination
export interface PostsProps {
    pagination: number;
}

export interface PostsState {
    loaded: boolean;
}

export interface PostsStyleProps {
    root: React.CSSProperties;
}

const style = (theme: Theme) => ({
    root: {
        flexGrow: 1
    }
} as PostsStyleProps);

const posts =
    [
        (
            <Post
                key={1}
                publisher="Shaked"
                secretText="Text for the post for testing"
                comments={[]}
                likes={22}
                dislikes={13}
                timestamp={new Date().getTime()}
            />),
        (
            <Post
                key={2}
                publisher="Shaked"
                secretText="Text for the post for testing"
                comments={[]}
                likes={22}
                dislikes={13}
                timestamp={new Date().getTime()}
            />),
        (
            <Post
                key={3}
                publisher="Shaked"
                secretText="Text for the post for testing"
                comments={[]}
                likes={22}
                dislikes={13}
                timestamp={new Date().getTime()}
            />)
    ];

class Posts extends React.Component<PostsProps & WithStyles<keyof PostsStyleProps>, PostsState> {
    render() {
        return (
            <Grid
              className={this.props.classes.root}
              container={true}
              direction="row"
              justify="space-between"
              alignItems="center"
            >
                {posts.map((post, index) => (
                    <Grid item={true} key={index}>
                        {post}
                    </Grid>
                ))}
            </Grid>
        );
    }

}

export default withStyles(style)(Posts);
