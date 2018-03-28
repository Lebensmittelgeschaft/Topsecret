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

const userMutations: Thunk<GraphQLFieldConfigMap<any, any>> =  {

  createUser: {
    description: 'Create new user in the db',    
    type: UserType,
    args: {
      id: {
        type: UserType.getFields().id.type as GraphQLInputType,
      },
      nickname: {
        type: UserType.getFields().nickname.type as GraphQLInputType,
      },
    },
    resolve: async (root, args) => {
      const user = new UserModel({ _id: args.id, nickname: args.nickname });
      return await UserController.save(user);
    },
  },

  updateUserNickname: {
    description: 'Update user nickname in the db',
    type: UserType,
    args: {
      id: {
        type: UserType.getFields().id.type as GraphQLInputType,
      },
      newNickname: {
        type: UserType.getFields().nickname.type as GraphQLInputType,
      },    
    },
    resolve: async (root, args) => {
      const updatedUser = { _id: args.id, nickname: args.newNickname };
      return await UserController.update(updatedUser);
    },
  },
};

export { userMutations as UserMutations };
