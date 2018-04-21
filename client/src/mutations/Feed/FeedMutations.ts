import { runMutation } from '../utils';
import {
    ToggleLikeQL,
    ToggleDislikeQL,
    addCommentQL,
    createPostQL,
} from './FeedMutationsQL';

export class FeedMutator {

    /**
     * Mutation for adding like to post
     * 
     * @param postId - Id of a post to like
     * @returns Curry Mutation function contains the graphql code and variables for the mutation          
     */
    static toggleLike(postId: string) {
        const userId = localStorage.getItem('userId');        
        return runMutation({
            mutation: ToggleLikeQL,
            variables: { input: { secretId: postId, userId } },               
        });
    }

    /**
     * Mutation for adding dislike to post
     * 
     * @param postId - Id of a post to dislike     
     * @returns Curry Mutation function contains the graphql code and variables for the mutation
     */
    static toggleDislike(postId: string) {
        const userId = localStorage.getItem('userId');
        return runMutation({
            mutation: ToggleDislikeQL,
            variables: { input: { secretId: postId, userId } },
        });
    }

    /**
     * Mutation for adding comment to post
     * 
     * @param postId - Id of a post to add comment
     * @param text - Text of the comment
     * @returns Curry Mutation function contains the graphql code and variables for the mutation
     */
    static addComment(postId: string, text: string) {
        const userId = localStorage.getItem('userId');
        return runMutation({
            mutation: addCommentQL,
            variables: { input: { secretId: postId, postBy: userId, text}}
        });
    }

    /**
     * Mutation for creating new post
     * 
     * @param text - Text of the post to publish
     * @returns Curry Mutation function contains the graphql code and variables for the mutation
     */
    static createPost(text: string) {
        const userId = localStorage.getItem('userId');
        return runMutation({
            mutation: createPostQL,
            variables: { input: { publisher: userId, text } }
        });
    }

}