import { grpahql } from 'react-relay';

export const ToggleLikeQL = graphql`
    mutation FeedMutationsQL_AddLikeMutation(
        $input: toggleLikeInput!
    ) {
        toggleLike(input: $input) {
            secret {
                id
                likes
                dislikes 
            }
            clientMutationId
        }
    }
`;

export const ToggleDislikeQL = graphql`
    mutation FeedMutationsQL_AddDislikeMutation(
        $input: toggleDislikeInput!
    ) {
        toggleDislike(input: $input) {
            secret {
                id
                likes
                dislikes 
            }
            clientMutationId
        }
    }
`;