import * as React from 'react';
import Grid from 'material-ui/Grid';
// import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import Post, { PostProps } from './Post/Post';
import { createFragmentContainer } from 'react-relay';
import { postsFragment } from '../../queries/FeedQuery';

// TODO: Use pagination for showing only number of posts and when scrolling
//       down will make http request for more posts - lazy loading posts by pagination
export interface PostsProps {
    posts: {
        secrets: PostProps['secret'][];
    };
}

export interface PostsState {
    loaded: boolean;
}

export interface PostsStyleProps {
    root: React.CSSProperties;
}

// const style = (theme: Theme) => ({
//     root: {
//         flexGrow: 1
//     }
// } as PostsStyleProps);

// const posts =
//     [
//         (
//             <Post
//                 key={1}
//                 secret={{
//                     id: '242432222',
//                     publisher: 'Shaked',
//                     text: 'Text for the post for testing',
//                     comments: [],
//                     likes: 22,
//                     dislikes: 13,
//                     timestamp: new Date().getTime(),
//                 }}
//             />),
//         (
//             <Post
//                 key={2}
//                 secret={{
//                     id: '32222',
//                     publisher: 'Shaked',
//                     text: 'Text for the post for testing',
//                     comments: [],
//                     likes: 22,
//                     dislikes: 13,
//                     timestamp: new Date().getTime(),
//                 }}
//             />),
//         (
//             <Post
//                 key={3}
//                 secret={{
//                     id: '24242',
//                     publisher: 'Shaked',
//                     text: 'Text for the post for testing',
//                     comments: [],
//                     likes: 22,
//                     dislikes: 13,
//                     timestamp: new Date().getTime(),
//                 }}
//             />)
//     ];

class Posts extends React.Component<PostsProps /*& WithStyles<keyof PostsStyleProps> */, PostsState> {
    render() {        
        return (
            <Grid
                /*className={this.props.classes.root} */
                container={true}
                direction="row"
                justify="center"
                alignItems="center"
            >
                {this.props.posts.secrets.map((secret) => {
                    /* tslint:disable:no-console */
                    console.log(secret.id);
                    return (<Grid item={true} key={secret.id}>
                                <Post secret={secret} />
                            </Grid>);
                })}
            </Grid>
        );
    }

}

export default createFragmentContainer(
    Posts,
    postsFragment
);
