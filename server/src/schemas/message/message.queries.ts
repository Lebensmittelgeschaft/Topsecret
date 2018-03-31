import {
  Thunk,
  GraphQLFieldConfigMap,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputType,  
} from 'graphql';
import { MessageType, LastMessageType } from './message.type';
import { MessageController } from './../../message/message.controller';

const queryFields: Thunk<GraphQLFieldConfigMap<any, any>> = {
  messages: {
    description: 'Get conversation messages of user with pagination',
    type: new GraphQLList(MessageType),
    args: {
      userOne: {
        type: MessageType.getFields().sender.type as GraphQLInputType,
      },
      userTwo: {
        type: MessageType.getFields().receiver.type as GraphQLInputType,
      },
      pageNum: {
        type: new GraphQLNonNull(GraphQLInt),
      },
    },
    resolve: async (root, args) => {
      return await MessageController
                  .getConversationPagination(args.userOne, args.userTwo, args.pageNum);
    },
  },
  lastMessages: {
    description: 'Get last message from all user\'s conversations',
    type: new GraphQLList(LastMessageType),
    args: {
      userId: {
        type: MessageType.getFields().sender.type as GraphQLInputType,
      },      
    },
    resolve: async (root, args) => {
      return await MessageController.getUserLastMessageConversations(args.userId);      
    },
  },
};

export { queryFields as MessageQueryFields };
