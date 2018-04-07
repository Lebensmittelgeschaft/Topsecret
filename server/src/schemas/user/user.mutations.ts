// Before graphql-relay
// import { 
//   GraphQLNonNull,
//   GraphQLString,
//   Thunk,
//   GraphQLFieldConfigMap,
//   GraphQLInputType,
// } from 'graphql';
// import { UserType } from './user.type';
// import { UserController } from '../../user/user.controller';
// import { user as UserModel } from '../../user/user.model';

// const userMutations: Thunk<GraphQLFieldConfigMap<any, any>> =  {

//   createUser: {
//     description: 'Create new user in the db',    
//     type: UserType,
//     args: {
//       id: {
//         type: UserType.getFields().id.type as GraphQLInputType,
//       },
//       nickname: {
//         type: UserType.getFields().nickname.type as GraphQLInputType,
//       },
//     },
//     resolve: async (root, args) => {
//       const user = new UserModel({ _id: args.id, nickname: args.nickname });
//       return await UserController.save(user);
//     },
//   },

//   updateUserNickname: {
//     description: 'Update user nickname in the db',
//     type: UserType,
//     args: {
//       id: {
//         type: UserType.getFields().id.type as GraphQLInputType,
//       },
//       newNickname: {
//         type: UserType.getFields().nickname.type as GraphQLInputType,
//       },    
//     },
//     resolve: async (root, args) => {
//       const updatedUser = { _id: args.id, nickname: args.newNickname };
//       return await UserController.update(updatedUser);
//     },
//   },
// };

// export { userMutations as UserMutations };

// After graphql-relay

import { 
  GraphQLNonNull,
  GraphQLString,
  Thunk,
  GraphQLFieldConfigMap,
  GraphQLInputType,
} from 'graphql';
import { UserType } from './user.type';
import { UserController } from '../../user/user.controller';
import { user as UserModel } from '../../user/user.model';
import { mutationWithClientMutationId } from 'graphql-relay';

const userMutations: Thunk<GraphQLFieldConfigMap<any, any>> =  {

  createUser: mutationWithClientMutationId({
    name: 'createUser',
    inputFields: {
      id: {
        type: UserType.getFields().id.type as GraphQLInputType,
      },
      nickname: {
        type: UserType.getFields().nickname.type as GraphQLInputType,
      },
    },
    outputFields: {
      user: { type: UserType },
    },
    mutateAndGetPayload: async (inputArgs) => {
      console.log(inputArgs);
      const user = new UserModel({ _id: inputArgs.id, nickname: inputArgs.nickname });
      return { user: await UserController.save(user) };
    },

  }),
    
  updateUserNickname: mutationWithClientMutationId({
    name: 'updateUserNickname',
    inputFields: {
      id: {
        type: UserType.getFields().id.type as GraphQLInputType,
      },
      newNickname: {
        type: UserType.getFields().nickname.type as GraphQLInputType,
      },
    },
    outputFields: {
      user: { type: UserType },
    },
    mutateAndGetPayload: async (inputArgs) => {
      const updatedUser = { _id: inputArgs.id, nickname: inputArgs.newNickname };
      return { user: await UserController.update(updatedUser) };
    },
  }),  
};

export { userMutations as UserMutations };
