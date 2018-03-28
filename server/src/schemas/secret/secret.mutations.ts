import {
    GraphQLString,
    GraphQLNonNull,
    Thunk,
    GraphQLFieldConfigMap,
    GraphQLInputType,
} from 'graphql';
import { SecretType, CommentType } from './secret.type';
import { secret as SecretModel } from './../../secret/secret.model';
import { SecretController } from './../../secret/secret.controller';

const secretMutations: Thunk<GraphQLFieldConfigMap<any,any>> = {

  createSecret: {
    description: 'Create secret object model',
    type: SecretType,
    args: {
      publisher: {
        type: SecretType.getFields().publisher.type as GraphQLInputType,
      },
      text: {
        type: SecretType.getFields().text.type as GraphQLInputType,
      },
    },
    resolve: async (root, args) => {
      const secretModel = new SecretModel({ ...args });
      return await SecretController.save(secretModel);
    },
  },
    
  addComment: {
    description: 'Add comment to secret',
    type: SecretType,
    args: {
      secretId: {
        type: SecretType.getFields().id.type as GraphQLInputType,
      },
      postBy: {
        type: CommentType.getFields().postBy.type as GraphQLInputType,
      },
      text: {
        type: CommentType.getFields().text.type as GraphQLInputType,
      },
    },
    resolve: async (root, args) => {
      return await SecretController.addComment(args.secretId, args.postBy, args.text);
    },
  },
};

export { secretMutations as SecretMutations };
