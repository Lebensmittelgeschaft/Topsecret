import { GraphQLObjectType, Thunk } from 'graphql';
import { queryFields as UserQueryFields } from './user/user.queries';

const query = new GraphQLObjectType({
  name: 'Query',
  description: 'Main query contains all models queries',

  fields: {
    ...UserQueryFields,
  }
});

export default query;
