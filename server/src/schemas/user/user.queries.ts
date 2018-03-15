import { GraphQLNonNull, GraphQLString, GraphQLList } from 'graphql';
import { UserType } from './user.type';
import { UserController } from '../../user/user.controller';

const queryFields = {
  
  user: {
    description: 'Get user by id',
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (root: any, args: any) => {      
      return await UserController.getOneByProps({ _id: args.id });      
    },
  },

  users: {
    description: 'Get all users',
    type: new GraphQLList(UserType),
    resolve: async (root: any, args: any) => {
      return await UserController.getByProps({});    
    },
  },
};

export { queryFields as UserQueryFields };
