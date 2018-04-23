import {
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    Thunk,
    GraphQLFieldConfigMap,
    GraphQLInputType,
} from 'graphql';

import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';
import { notification as NotificationModel } from '../../notification/notification.model';
import { NotificationController } from '../../notification/notification.controller';
import { NotificationType } from './notification.type';

const notificationMutations: Thunk<GraphQLFieldConfigMap<any, any>> = {

  createNotification: mutationWithClientMutationId({
    name: 'createNotification',
    inputFields: {
      type: {
        type: NotificationType.getFields().type.type as GraphQLInputType,
      },
      content: {
        type: NotificationType.getFields().content.type as GraphQLInputType,
      },
      to: {
        type: new GraphQLList(GraphQLString),
      },      
    },
    outputFields: {
      notification: { type: NotificationType },      
    },
    mutateAndGetPayload: async (inputArgs) => {
      const notificationModel = new NotificationModel({
        type: inputArgs.type,
        content: inputArgs.content,
        to: inputArgs.to.map((user: string) => fromGlobalId(user)),      
      });
      return {
        notification: await NotificationController.save(notificationModel),
      }
    },
  }),

  addUserSeen: mutationWithClientMutationId({
    name: 'addUserSeen',
    inputFields: {
      notificationId: { type: NotificationType.getFields().id.type as GraphQLInputType },
      userId: {
        type: (<GraphQLList<any>>NotificationType.getFields().seen.type).ofType.getFields().id.type as GraphQLInputType,
      },
    },
    outputFields: {
      notification: { type: NotificationType },
    },
    mutateAndGetPayload: async (inputArgs) => {
      return {
        notification: await NotificationController.addUserSeen(inputArgs.notificationId, inputArgs.userId),
      };
    },
  }),
};

export { notificationMutations as NotificationMutations };
