import { graphql } from 'react-relay';

export const postsFragment = graphql`
fragment FeedQuery_posts on Query @argumentDefinitions(
    pageNum: { type: "Int" }
) {
    secrets(pageNum: $pageNum) {
        ...FeedQuery_secret
    }
}
`;

export const feedQuery = graphql`
query FeedQuery($pageNum: Int) {
  ...FeedQuery_posts @arguments(pageNum: $pageNum)
}
`;