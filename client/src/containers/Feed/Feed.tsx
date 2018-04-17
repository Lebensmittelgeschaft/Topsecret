import * as React from 'react';
import Posts from '../../components/Posts/Posts';
import Fab from '../../components/Fab/Fab';
import AddIcon from 'material-ui-icons/Add';
import { CircularProgress } from 'material-ui/Progress';
import enviroment from '../../relayEnviroment';
import { QueryRenderer } from 'react-relay';
import { feedQuery } from '../../queries/FeedQuery';

export interface FeedProps {

}

export interface FeedState {

}

class Feed extends React.Component<FeedProps, FeedState> {

    onAddPost = (event: React.MouseEvent<HTMLElement>) => {
        alert('Add post clicked!');
    }

    render() {
        return (
            <div>
                <QueryRenderer
                    environment={enviroment}
                    query={feedQuery}
                    variables={{ pageNum: 1 }}
                    render={(objResponse) => {
                        if (objResponse.error) {
                            return <div>{objResponse.error}</div>;
                        } else if (objResponse.props) {
                            /* tslint:disable:no-console */
                            console.log(objResponse);
                            /* tslint:disable:no-any */
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
            </div>
        );
    }
}

export default Feed;
