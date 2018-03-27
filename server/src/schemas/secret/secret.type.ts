import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';

const commentType = new GraphQLObjectType({
  name: 'Comment',
  description: 'Comment on secret model',

  fields: {      
    postBy: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Id of the user who post the comment',
      resolve: root => root.postBy,
    },
    text: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Actual text of the comment',
      resolve: root => root.text,
    },
    timestamp: {
      type: GraphQLString,
      description: 'Timestamp of the date the comment published',
      resolve: root => +root.timestamp,
    },    
  },
});

const secretType = new GraphQLObjectType({
  name: 'Secret',
  description: 'Secret object model',

  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Secret id in the db',
      resolve: root => root._id,      
    },

    publisher: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The user id who publish the secret',
      resolve: root => root.publisher,     
    },
    
    text: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The text of the secret',
      resolve: root => root.text,      
    },

    comments: {
      type: new GraphQLList(commentType),
      description: 'Array of the comment published on secret',
      resolve: root => root.comments,      
    },

    likes: {
      type: GraphQLInt,
      description: 'Number of likes of the secret',
      resolve: root => root.likes,
    },

    dislikes: {
      type: GraphQLInt,
      description: 'Number of dislikes of the secret',
      resolve: root => root.dislikes,
    },

    timestamp: {
      type: GraphQLString,
      description: 'Timestamp in milliseconds of date the secret published',
      resolve: root => +root.timestamp,
    },

  },
});

export { secretType as SecretType, commentType as CommentType };
