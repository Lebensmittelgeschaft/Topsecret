import { runMutation, bindParams } from '../utils';
import {
    AddLikeQL,
    AddDislikeQL,
} from './FeedMutationsQL';

// TODO: Add binding specific parameters to functions
export class FeedMutator {

    /**
     * Mutation for adding like to post
     * 
     * @param postId - Id of a post to like
     * @returns Mutation function contains the graphql needed for the mutation     
     */
    static addLike(postId: string) {
        const userId = localStorage.getItem('userId');        
        return runMutation.bind(null, AddLikeQL, { secretId: postId, userId });
    }

    /**
     * Mutation for adding dislike to post
     * 
     * @param postId - Id of a post to dislike     
     * @returns Mutation function contains the graphql needed for the mutation
     */
    static addDislike(postId: string) {
        const userId = localStorage.getItem('userId');
        return runMutation.bind(null, AddDislikeQL, { secretId: postId, userId });
    }

}