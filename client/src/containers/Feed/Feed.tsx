import * as React from 'react';
import Posts from '../../components/Posts/Posts';
import Fab from '../../components/Fab/Fab';
import AddIcon from 'material-ui-icons/Add';

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
            <Posts pagination={3}/>
            <Fab action={this.onAddPost}>
                <AddIcon/>
            </Fab>
            </div>
        );
    }
}

export default Feed;
