import { graphql } from 'react-relay';

export const postFragment = graphql`
fragment FeedQuery_secret on Secret {
  id 
  publisher {
    id
    nickname
  }
  text
  comments {
    postBy {
      id
      nickname
    }
    text
    timestamp
  }
  likes {
    id
    nickname
  }
  dislikes {
    id
    nickname
  }
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