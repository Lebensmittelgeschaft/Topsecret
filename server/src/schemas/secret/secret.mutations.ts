import {
    GraphQLString,
    GraphQLNonNull,
    Thunk,
    GraphQLFieldConfigMap
} from 'graphql';
import { SecretType, CommentType } from './secret.type';
import { secret as SecretModel } from './../../secret/secret.model';
import { SecretController } from './../../secret/secret.controller';

const secretMutations: Thunk<GraphQLFieldConfigMap<any, any>> = {

    createSecret: {
      type: SecretType,
      description: 'Create secret object model',
      args: {
        publisher: {
            type: SecretType.getFields().publisher.type,
        },
        text: {
            type: SecretType.getFields().text.type,
        },
      },
      resolve: async (root, args) => {
          const secretModel = new SecretModel({ ...args });
          return await SecretController.save(secretModel);
      },
    },
    addComment: {
        type: SecretType,
        description: 'Add comment to secret',
        args: {
            secretId: {
              type: SecretType.getFields().id.type,
            },
            postBy: {
              type: CommentType.getFields().postBy.type,
            },
            text: { 
              type: CommentType.getFields().text.type,
            },
        },
        resolve: async (root, args) => {
           return await SecretController.addComment(args.secretId, args.postBy, args.text);
        }
    },
};

export { secretMutations as SecretMutations };