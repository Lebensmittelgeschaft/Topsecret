// Before graphql-relay

// import {
//   GraphQLObjectType,
//   GraphQLString,
//   GraphQLNonNull,
// } from 'graphql';

// const userType = new GraphQLObjectType({
//   name: 'User',
//   description: 'User object model',

//   fields: {
//     id: {
//       type: new GraphQLNonNull(GraphQLString),
//       description: 'Hashed id of the user',
//       resolve: root => root._id,      
//     },

//     nickname: {
//       type: new GraphQLNonNull(GraphQLString),
//       description: 'Nickname of the user',
//       resolve: root => root.nickname,      
//     },
//   },
// });

// export { userType as UserType };


// After graphql relay

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';

import { globalIdField } from 'graphql-relay';
import { nodeInterface } from '../node/node';

const userType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  description: 'User object model',

  fields: {
    id: globalIdField('User', obj => obj._id),
    nickname: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Nickname of the user',
      resolve: root => root.nickname,      
    },
  },
  interfaces: () => [nodeInterface],
});

export { userType as UserType };
