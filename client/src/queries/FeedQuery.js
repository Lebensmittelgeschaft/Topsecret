import { graphql } from 'react-relay';

export const postFragment = graphql`
fragment FeedQuery_secret on Secret {
  id 
  publisher
  text
  comments {
    postBy
    text
    timestamp
  }
  likes
  dislikes
  timestamp
}
`;

export const postsFragment = graphql`
fragment FeedQuery_posts on Query @argumentDefinitions(
    pageNum: { type: "Int" }
) {
    secrets(pageNum: $pageNum) {
        id
        ...FeedQuery_secret
    }
}
`;

export const feedQuery = graphql`
query FeedQuery($pageNum: Int) {
  ...FeedQuery_posts @arguments(pageNum: $pageNum)
}
`;