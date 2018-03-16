import { GraphQLObjectType } from 'graphql';
import { UserQueryFields } from './user/user.queries';
import { SecretQueriesFields } from './secret/secret.queries';


const query = new GraphQLObjectType({
  name: 'Query',
  description: 'Main query contains all models queries',

  fields: {
    ...UserQueryFields,
    ...SecretQueriesFields,
  },

});

export { query as Queries };
