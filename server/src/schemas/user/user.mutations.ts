import { 
  GraphQLNonNull,
  GraphQLString,
  Thunk,
  GraphQLFieldConfigMap 
} from 'graphql';
import { UserType } from './user.type';
import { UserController } from '../../user/user.controller';
import { user as UserModel } from '../../user/user.model';

const userMutations: Thunk<GraphQLFieldConfigMap<any, any>> = {

  createUser: {
    type: UserType,
    description: "Create new user in the db",    
    args: {
      id: {
        type: UserType.getFields().id.type
      },
      nickname: {
        type: UserType.getFields().nickname.type
      },
    },
    resolve: async (root, args) => {
      const user = new UserModel({ _id: args.id, nickname: args.nickname });
      return await UserController.save(user);
    },
  },

  updateUserNickname: {
    type: UserType,
    description: "Update user nickname in the db",
    args: {
      id: {
        type: UserType.getFields().id.type,
      },
      newNickname: {
        type: UserType.getFields().nickname.type,
      },    
    },
    resolve: async (root, args) => {
      const updatedUser = new UserModel({ _id: args.id, nickname: args.newNickname});
      return await UserController.update(updatedUser);
    },
  },
};

export { userMutations as UserMutations };
