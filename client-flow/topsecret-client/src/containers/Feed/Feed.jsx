// @flow
import * as React from 'react';
import Posts from '../../components/Posts/Posts';
import Fab from '../../components/Fab/Fab';
import AddIcon from '@material-ui/icons/Add';
import enviroment from '../../relayEnviroment';
import { QueryRenderer, graphql } from 'react-relay';


type FeedProps = {

}

type FeedState = {

}

const getSecrets = graphql`
    query FeedQuery($pageNum: Int) {
        ...Posts_posts @arguments(pageNum: $pageNum)
    }
`;

class Feed extends React.Component<FeedProps, FeedState> {

    onAddPost = (event: SyntheticMouseEvent<HTMLElement>) => {
        alert('Add post clicked!');
    }

    render() {        
        return (
            <div>
            <QueryRenderer
                environment={enviroment}
                query={getSecrets}
                variables={{pageNum: 1}}
                render={(objResponse) => {
                    if (objResponse.error) {
                        return <div>{objResponse.error}</div>;
                    } else if (objResponse.props) {
                        /* tslint:disable:no-console */        
                        console.log(objResponse);
                        return <Posts posts={objResponse.props} />; 
                    }
                    return <div>Loading...</div>;
                }}
            />           
            <Fab action={this.onAddPost}>
                <AddIcon/>
            </Fab>
            </div>
        );
    }
}

export default Feed;
