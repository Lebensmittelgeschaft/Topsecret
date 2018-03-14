import { GraphQLObjectType, GraphQLString } from 'graphql';

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'User object model',

  fields: {

    id: {
      type: GraphQLString,
      description: 'Hashed id of the user',
      resolve: (root) => {
        return root._id;
      }
    },

    nickname: {
      type: GraphQLString,
      description: 'Nickname of the user',
      resolve: (root) => {
        return root.nickname;
      }
    }
  }
});

export default userType;
