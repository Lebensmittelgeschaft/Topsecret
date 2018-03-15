import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'User object model',

  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Hashed id of the user',
      resolve: (root) => {
        return root._id;
      },
    },

    nickname: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Nickname of the user',
      resolve: (root) => {
        return root.nickname;
      },
    },
  },
});

export { userType as UserType };
