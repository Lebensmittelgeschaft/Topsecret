import { GraphQLObjectType } from 'graphql';
import { UserMutations } from './user/user.mutations';
import { SecretMutations } from './secret/secret.mutations';
import { MessageMutations } from './message/message.mutations';

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Main mutation contains all models mutations',

  fields: {
    ...UserMutations,
    ...SecretMutations,
    ...MessageMutations,
  },

});

export { mutation as Mutations };
