import * as React from 'react';
import AddIcon from 'material-ui-icons/Add';
import { CircularProgress } from 'material-ui/Progress';
import Posts, { PostsProps } from '../../components/Posts/Posts';
import Fab from '../../components/Fab/Fab';
import AddPostDialog from './AddPostDialog/AddPostDialog';
import enviroment from '../../relayEnviroment';
import { QueryRenderer } from 'react-relay';
import { feedQuery } from '../../queries/FeedQuery';
import { FeedMutator } from '../../mutations/Feed/FeedMutations';

export interface FeedProps {

}

export interface FeedState {
    openDialog: boolean;
    pageNum: number;
    posts: PostsProps['posts'];
}

class Feed extends React.Component<FeedProps, FeedState> {

    constructor(props: FeedProps) {
        super(props);
        this.state = {
            openDialog: false,
            pageNum: 1,
            posts: { secrets: [] },
        };
    }

    onAddPost = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({ ...this.state, openDialog: true });
    }

    closeDialog = () => {
        this.setState({ ...this.state, openDialog: false });
    }

    // TODO: Make the posts list know that new post added with prettier way
    createNewPost = (text: string) => {
        /* tslint:disable:no-console */
        if (text) {
            FeedMutator.createPost(text)({
                onCompleted: (response, errors) => window.dispatchEvent(
                    new CustomEvent('createNewPost', { detail: response.createSecret.secret })
                ),
                onError: (error) => console.log('Create post error: ' + error),
            });
        }
        this.closeDialog();
    }

    render() {
        return (
            <div>
                <QueryRenderer
                    environment={enviroment}
                    query={feedQuery}
                    variables={{ pageNum: this.state.pageNum }}
                    render={(objResponse) => {
                        if (objResponse.error) {
                            return <div>{objResponse.error}</div>;

                        } else if (objResponse.props) {
                            /* tslint:disable:no-any */
                            console.log(objResponse.props);                            
                            return <Posts posts={objResponse.props as any} />;
                        }

                        return (
                            <CircularProgress 
                                style={{ display: 'block', marginRight: 'auto', marginLeft: 'auto' }}
                                size={250}
                                thickness={3}
                            />
                        );
                    }}
                />
                <Fab action={this.onAddPost}>
                    <AddIcon />
                </Fab>
                <AddPostDialog 
                    open={this.state.openDialog}
                    onPostCreate={this.createNewPost}
                    onClose={this.closeDialog}
                />
            </div>
        );
    }
}

export default Feed;
