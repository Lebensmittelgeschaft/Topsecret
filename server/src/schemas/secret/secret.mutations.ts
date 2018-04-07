// Before graphql-relay
// import {
//     GraphQLString,
//     GraphQLNonNull,
//     Thunk,
//     GraphQLFieldConfigMap,
//     GraphQLInputType,
// } from 'graphql';
// import { SecretType, CommentType } from './secret.type';
// import { secret as SecretModel } from './../../secret/secret.model';
// import { SecretController } from './../../secret/secret.controller';

// const secretMutations: Thunk<GraphQLFieldConfigMap<any,any>> = {

//   createSecret: {
//     description: 'Create secret object model',
//     type: SecretType,
//     args: {
//       publisher: {
//         type: SecretType.getFields().publisher.type as GraphQLInputType,
//       },
//       text: {
//         type: SecretType.getFields().text.type as GraphQLInputType,
//       },
//     },
//     resolve: async (root, args) => {
//       const secretModel = new SecretModel({ ...args });
//       return await SecretController.save(secretModel);
//     },
//   },

//   addComment: {
//     description: 'Add comment to secret',
//     type: SecretType,
//     args: {
//       secretId: {
//         type: SecretType.getFields().id.type as GraphQLInputType,
//       },
//       postBy: {
//         type: CommentType.getFields().postBy.type as GraphQLInputType,
//       },
//       text: {
//         type: CommentType.getFields().text.type as GraphQLInputType,
//       },
//     },
//     resolve: async (root, args) => {
//       return await SecretController.addComment(args.secretId, args.postBy, args.text);
//     },
//   },

//   addLike: {
//     description: 'Add like to secret',
//     type: SecretType,
//     args: {
//       secretId: {
//         type: SecretType.getFields().id.type as GraphQLInputType,
//       },
//       userId: {
//         type: SecretType.getFields().publisher.type as GraphQLInputType,
//       },
//     },
//     resolve: async (root, args) => {
//       return await SecretController.addLike(args.secretId, args.userId);      
//     },
//   },

//   addDislike: {
//     description: 'Add dislike to secret',
//     type: SecretType,
//     args: {
//       secretId: {
//         type: SecretType.getFields().id.type as GraphQLInputType,
//       },
//       userId: {
//         type: SecretType.getFields().publisher.type as GraphQLInputType,
//       },
//     },
//     resolve: async (root, args) => {
//       return await SecretController.addDislike(args.secretId, args.userId);
//     },
//   },
// };

// export { secretMutations as SecretMutations };

// After graphql-relay

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
import { mutationWithClientMutationId } from 'graphql-relay';

const secretMutations: Thunk<GraphQLFieldConfigMap<any, any>> = {

  createSecret: mutationWithClientMutationId({
    name: 'createSecret',
    inputFields: {
      publisher: {
        type: SecretType.getFields().publisher.type as GraphQLInputType,
      },
      text: {
        type: SecretType.getFields().text.type as GraphQLInputType,
      },
    },
    outputFields: {
      secret: { type: SecretType },
    },
    mutateAndGetPayload: async (inputArgs) => {
      const secretModel = new SecretModel({ publisher: inputArgs.publisher, text: inputArgs.text });
      return { secret: await SecretController.save(secretModel) };
    },
  }),
  
  addComment: mutationWithClientMutationId({
    name: 'addComment',
    inputFields: {
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
    outputFields: {
      secret: { type: SecretType },
    },
    mutateAndGetPayload: async (inputArgs) => {
      return {
        secret: await SecretController.addComment(inputArgs.secretId,
                                                  inputArgs.postBy,
                                                  inputArgs.text),
      };
    },
  }),

  addLike: mutationWithClientMutationId({
    name: 'addLike',
    inputFields: {
      secretId: {
        type: SecretType.getFields().id.type as GraphQLInputType,
      },
      userId: {
        type: SecretType.getFields().publisher.type as GraphQLInputType,
      },
    },
    outputFields: {
      secret: { type: SecretType },
    },
    mutateAndGetPayload: async (inputArgs) => {
      return {
        secret: await SecretController.addLike(inputArgs.secretId, inputArgs.userId),
      };
    },
  }),

  addDislike: mutationWithClientMutationId({
    name: 'addDislike',
    inputFields: {
      secretId: {
        type: SecretType.getFields().id.type as GraphQLInputType,
      },
      userId: {
        type: SecretType.getFields().publisher.type as GraphQLInputType,
      },
    },
    outputFields: {
      secret: { type: SecretType },
    },
    mutateAndGetPayload: async (inputArgs) => {
      return {
        secret: await SecretController.addDislike(inputArgs.secretId, inputArgs.userId),
      };
    },
  }),  
};

export { secretMutations as SecretMutations };
