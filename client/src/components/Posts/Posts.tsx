// import * as React from 'react';
// import Grid from 'material-ui/Grid';
// // import { Theme, withStyles, WithStyles } from 'material-ui/styles';
// import Post, { PostProps } from './Post/Post';
// import { createFragmentContainer } from 'react-relay';
// import { postsFragment } from '../../queries/FeedQuery';

// // TODO: Use pagination for showing only number of posts and when scrolling
// //       down will make http request for more posts - lazy loading posts by pagination
// export interface PostsProps {
//     posts: {
//         secrets: PostProps['secret'][];
//     };
// }

// export interface PostsState {
//     loaded: boolean;
// }

// export interface PostsStyleProps {
//     root: React.CSSProperties;
// }

// class Posts extends React.Component<PostsProps /*& WithStyles<keyof PostsStyleProps> */, PostsState> {

//     render() {        
//         return (
//             <Grid
//                 container={true}
//                 direction="row"
//                 justify="center"
//                 alignItems="center"
//             >
//                 {this.props.posts.secrets.map((secret) => {                    
//                     return (<Grid item={true} key={secret.id}>
//                                 <Post secret={secret} />
//                             </Grid>);
//                 })}
//             </Grid>
//         );
//     }

// }

// export default createFragmentContainer(
//     Posts,
//     postsFragment
// );

import * as React from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';
// import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import Post, { PostProps } from './Post/Post';
import { createRefetchContainer, RelayRefetchProp } from 'react-relay';
import { postsFragment, postsRefetchQuery } from '../../queries/FeedQuery';

export interface PostsProps {
    relay: RelayRefetchProp;
    posts: {
        secrets: PostProps['secret'][];
    };    
}

export interface PostsState {
    doneFetching: boolean;
    loading: boolean;
    pageNum: number;
    posts: PostsProps['posts'];
}

export interface PostsStyleProps {
    root: React.CSSProperties;
}
/* tslint:disable:no-console */
class Posts extends React.Component<PostsProps /*& WithStyles<keyof PostsStyleProps> */, PostsState> {

    constructor(props: PostsProps) {
        super(props);
        this.state = {
            doneFetching: false,
            loading: false,
            pageNum: 1,
            posts: props.posts,
        };
    }

    componentDidMount() {
        console.log('Adding event listener for scrolling');
        window.addEventListener('scroll', this.onScroll, false);
        window.addEventListener('createNewPost', this.addNewPost, false);
    }

    componentWillUnmount() {
        console.log('Removing event listener for scrolling');
        window.removeEventListener('scroll', this.onScroll, false);
    }

    componentWillReceiveProps(nextProps: PostsProps) {
        if (nextProps.posts.secrets.length === 0) {
            console.log('Ending posts, no more posts to fetch');
            this.setState({
                ...this.state,
                doneFetching: true,
            });
        } else if (nextProps.posts.secrets[0].id !== this.state.posts.secrets[0].id) {
            console.log('Adding posts to state');
            this.setState({
                ...this.state,
                posts: {
                    secrets: [...this.state.posts.secrets, ...nextProps.posts.secrets]
                },
            });
        }
    }

    onScroll = () => {
        if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 100) &&
            (!this.state.doneFetching) && (!this.state.loading)) {
            /* tslint:disable:no-console */
            console.log('Refetching more posts...');
            this.props.relay.refetch(
                { pageNum: this.state.pageNum + 1 },
                undefined,
                this.doneRefetch,
            );
            this.setState({ ...this.state, loading: true });
        }
    }

    doneRefetch = (error?: Error) => {
        if (error) {
            console.log('Error on refetching: ' + error);
            this.setState({ ...this.state, doneFetching: true, loading: false });
        } else {
            console.log('Removing loading status');
            this.setState({ ...this.state, loading: false, pageNum: this.state.pageNum + 1 });
        }
    }

    // TODO: make the posts lists know that new post added with prettier way
    addNewPost = (event: CustomEventInit) => {        
        this.setState({ ...this.state, posts: { secrets: [ event.detail, ...this.state.posts.secrets ] } } );
    }

    render() {
        return (
            <div>
                <Grid
                    container={true}
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    {this.state.posts.secrets.map((secret) => {
                        return (<Grid item={true} key={secret.id}>
                                    <Post secret={secret} />
                                </Grid>);
                    })}                    
                </Grid>
                {this.state.loading ?
                        <CircularProgress
                            style={{ display: 'block', marginRight: 'auto', marginLeft: 'auto' }}
                            size={150}
                            thickness={3}
                        /> : null}
                {this.state.doneFetching ?
                    <Typography
                        style={{ display: 'block', textAlign: 'center' }}
                        variant="title"
                        gutterBottom={true}
                    >
                        There's no more posts to load...
                    </Typography> : null}
            </div>
        );
    }

}

export default createRefetchContainer(
    Posts,
    postsFragment,
    postsRefetchQuery,
);
