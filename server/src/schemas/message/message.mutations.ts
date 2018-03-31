import {
  GraphQLString,
  GraphQLNonNull,
  Thunk,
  GraphQLFieldConfigMap,
  GraphQLInputType,
} from 'graphql';
import { MessageType } from './message.type';
import { message as MessageModel } from './../../message/message.model';
import { MessageController } from './../../message/message.controller';


const messageMutations: Thunk<GraphQLFieldConfigMap<any, any>> = {

  createMessage: {
    description: 'Create message object model',
    type: MessageType,
    args: {
      sender: {
        type: MessageType.getFields().sender.type as GraphQLInputType,
      },
      receiver: {
        type: MessageType.getFields().receiver.type as GraphQLInputType,
      },
      text: {
        type: MessageType.getFields().text.type as GraphQLInputType,
      },
    },
    resolve: async (root, args) => {
      const message = new MessageModel({ ...args });
      return await MessageController.save(message);      
    },
  },
};

export { messageMutations as MessageMutations };
