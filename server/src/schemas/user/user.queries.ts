import { GraphQLObjectType, GraphQLString } from 'graphql';
import UserType from './user.type';
import { UserService } from '../../user/user.service';

export const queryFields = {
  user: {
    description: 'Get user by id',
    type: UserType,
    args: {
      id: { type: GraphQLString },
    },
    resolve: (root: any, args: any) => {
      return { _id: '1234', nickname: 'test' };
    }
  }
}

const queries = new GraphQLObjectType({
  name: 'UserQuery',
  description: 'Queries for user model',

  fields: {
    ...queryFields
  }
});

export default queries;