import { SecretController } from './../secret/secret.controller';
import { GraphQLObjectType, GraphQLFieldConfigArgumentMap } from 'graphql';
import { UserQueryFields } from './user/user.queries';
import { SecretQueryFields } from './secret/secret.queries';
import { MessageQueryFields } from './message/message.queries';
import { nodeField } from './node/node';

const query = new GraphQLObjectType({
  name: 'Query',
  description: 'Main query contains all models queries',

  fields: {
    node: nodeField,
    ...UserQueryFields,
    ...SecretQueryFields,
    ...MessageQueryFields,
  },

});

export { query as Queries };
