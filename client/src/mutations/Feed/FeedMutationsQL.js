import { grpahql } from 'react-relay';

const PostStructure = `
    id
    publisher {
      id
      nickname
    }
    text
    comments {
      timestamp
    }
    likes
    dislikes
    timestamp
        
}`;

export const AddLikeQL = graphql`
    mutation AddLikeMutation(
        $input: AddLikeInput
    ) {
        AddLike(input: $input) {
            ${PostStructure}
        }
    }
`;

export const AddDislikeQL = graphql`
    mutation AddDislikeMutation(
        $input: AddDislikeInput
    ) {
        AddDislike(input: $input) {
            ${PostStructure}
        }
    }
`;