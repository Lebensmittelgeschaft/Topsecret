import { runMutation } from '../utils';
import {
    ToggleLikeQL,
    ToggleDislikeQL,
} from './FeedMutationsQL';

export class FeedMutator {

    /**
     * Mutation for adding like to post
     * 
     * @param postId - Id of a post to like
     * @returns Mutation function contains the graphql needed for the mutation     
     */
    static toggleLike(postId: string): typeof runMutation {
        const userId = localStorage.getItem('userId');        
        return runMutation.bind(null, {
            mutation: ToggleLikeQL,
            variables: { input: { secretId: postId, userId } },               
        });
    }

    /**
     * Mutation for adding dislike to post
     * 
     * @param postId - Id of a post to dislike     
     * @returns Mutation function contains the graphql needed for the mutation
     */
    static toggleDislike(postId: string): typeof runMutation {
        const userId = localStorage.getItem('userId');
        return runMutation.bind(null, {
            mutation: ToggleDislikeQL,
            variables: { input: { secretId: postId, userId } },
        });
    }

}