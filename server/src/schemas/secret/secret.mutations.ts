import {
    GraphQLString,
    GraphQLNonNull,
    Thunk,
    GraphQLFieldConfigMap
} from 'graphql';
import { SecretType } from './secret.type';
import { secret as SecretModel } from './../../secret/secret.model';
import { SecretController } from './../../secret/secret.controller';

const secretMutations: Thunk<GraphQLFieldConfigMap<any, any>> = {
    createSecret: {
      type: SecretType,
      description: 'Create secret object model',
      args: {
        publisher: {
            type: new GraphQLNonNull(GraphQLString)
        },
        text: {
            type: new GraphQLNonNull(GraphQLString)
        },
      },
      resolve: async (root, args) => {
          const secretModel = new SecretModel({ ...args });
          return await SecretController.save(secretModel);
      },
    },
};

export { secretMutations as SecretMutations };