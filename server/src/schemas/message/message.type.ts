import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,  
  GraphQLNonNull,
} from 'graphql';

const messageType = new GraphQLObjectType({
  name: 'Message',
  description: 'Message object model',
  fields: {
    sender: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'User id of the sender of the message',
      resolve: root => root.sender,
    },
    receiver: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'User id of the receiver of the message',
      resolve: root => root.receiver,      
    },
    text: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Text of the message',
      resolve: root => root.text,
    },
    timestamp: {
      type: GraphQLString,
      description: 'Timestamp of the message',
      resolve: root => +root.timestamp,
    },
  },
});

const lastMessageType = new GraphQLObjectType({
  name: 'LastMessage',
  description: 'Last message model of conversation between 2 users',  
  fields: {
    contact: {
      type: messageType.getFields().sender.type,
      description: 'User id of the contact in the conversation',
      resolve: root => root.contact,      
    },
    message: {
      type: messageType,
      description: 'Message object model of the last message in the conversation',
      resolve: root => root.message,
    },
  },
});

export { messageType as MessageType, lastMessageType as LastMessageType };
