// @flow
import * as React from 'react';
import Grid from 'material-ui/Grid';
import { withStyles, WithStyles } from 'material-ui/styles';
import Post from './Post/Post';
import { createFragmentContainer, graphql } from 'react-relay';

// TODO: Use pagination for showing only number of posts and when scrolling
//       down will make http request for more posts - lazy loading posts by pagination
type PostsProps = {
    // posts: {
    //     secrets: {
    //         id: string;
    //         publisher: string;
    //         text: string;
    //         comments: { postBy: string, text: string, timestamp?: number }[];
    //         likes: number;
    //         dislikes: number;
    //         timestamp: number;
    //     }[];
    // };
}

type PostsState = {
    loaded: boolean;
}

const style = (theme) => ({
    root: {
        flexGrow: 1
    }
});

export interface PostsStyleProps {
    root: typeof style.root;
}

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

class Posts extends React.Component<PostsProps & WithStyles<$Keys<PostsStyleProps>>, PostsState> {
    render() {        
        return (
            <Grid
                className={this.props.classes.root}
                container={true}
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                {this.props.posts.secrets.map((secret) => (
                    <Grid item={true} key={secret.id}>
                        <Post secret={secret} />
                    </Grid>
                ))}
            </Grid>
        );
    }

}

export default createFragmentContainer(
    withStyles(style)(Posts),
    graphql`
    fragment Posts_posts on Query @argumentDefinitions(
        pageNum: { type: "Int" }
    ) {
        secrets(pageNum: $pageNum) {
            ...Post_secret
        }
    }
    `
);
