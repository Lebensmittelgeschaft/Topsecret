import { GraphQLObjectType } from 'graphql';
import { UserQueryFields } from './user/user.queries';
import { SecretQueryFields } from './secret/secret.queries';
import { MessageQueryFields } from './message/message.queries';


const query = new GraphQLObjectType({
  name: 'Query',
  description: 'Main query contains all models queries',

  fields: {
    ...UserQueryFields,
    ...SecretQueryFields,
    ...MessageQueryFields,
  },

});

export { query as Queries };
