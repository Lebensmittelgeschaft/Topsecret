import {
  GraphQLEnumType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';

import { globalIdField } from 'graphql-relay';
import { UserType } from '../user/user.type';
import { notification as NotificationModel, NotificationType } from '../../notification/notification.model';
import { nodeInterface } from '../node/node';

const notificationTypeEnum = new GraphQLEnumType({
  name: 'NotificationType',
  values:
    Object.keys(NotificationType).reduce((fields: any, currVal) => {
      fields[currVal] = { value: currVal };
      return fields;
    }, {})
});

const notificationType = new GraphQLObjectType({
  name: 'Notification',
  description: 'Notification object model',
  isTypeOf: value => value instanceof NotificationModel,

  fields: {
    id: globalIdField('Notification', obj => obj._id),

    type: {
      type: new GraphQLNonNull(notificationTypeEnum),
      description: 'Type of the notification',
      resolve: (root) => root.type,
    },

    content: {
      type: GraphQLString,
      description: 'Text Content of the notification',
      resolve: (root) => root.content,
    },

    to: {
      type: new GraphQLList(UserType),
      description: 'Array references of users to send the notification to',
      resolve: (root) => root.to,
    },

    seen: {
      type: new GraphQLList(UserType),
      description: 'Array references of users who saw the notification',
      resolve: (root) => root.seen,
    },

    timestamp: {
      type: GraphQLString,
      description: 'Timestamp in milliseconds of date the notification published',
      resolve: (root) => +root.timestamp,
    },    
  },
  interfaces: () => [nodeInterface]
});

export { notificationType as NotificationType };