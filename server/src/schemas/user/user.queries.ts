import { 
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  Thunk,
  GraphQLFieldConfigMap
} from 'graphql';
import { UserType } from './user.type';
import { UserController } from '../../user/user.controller';

const queryFields: Thunk<GraphQLFieldConfigMap<any, any>> = {
  
  user: {
    description: 'Get user by id',
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (root, args) => {      
      return await UserController.getOneByProps({ _id: args.id });      
    },
  },

  users: {
    description: 'Get all users',
    type: new GraphQLList(UserType),
    resolve: async (root, args) => {
      return await UserController.getByProps({});    
    },
  },
};

export { queryFields as UserQueryFields };
