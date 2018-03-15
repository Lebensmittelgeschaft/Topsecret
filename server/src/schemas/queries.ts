import { GraphQLObjectType } from 'graphql';
import { UserQueryFields } from './user/user.queries';

const query = new GraphQLObjectType({
  name: 'Query',
  description: 'Main query contains all models queries',

  fields: {
    ...UserQueryFields,
  },

});

export { query as Queries };
