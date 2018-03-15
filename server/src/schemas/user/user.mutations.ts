import { GraphQLNonNull, GraphQLString } from 'graphql';
import { UserType } from './user.type';
import { UserController } from '../../user/user.controller';

const userMutations = {
  createUser: {
    type: UserType,
    args: {
      id: new GraphQLNonNull(GraphQLString),
      nickname: new GraphQLNonNull(GraphQLString),
    },
    resolve: async (root: any, args: any) => {
        
    },
  },
};

export { userMutations as userMutations };
