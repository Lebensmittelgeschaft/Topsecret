import * as Events from './notification.events';
import * as io from 'socket.io';
import { NotificationSerializer } from './notification.serializer';

export class NotificationListenerManager {
  
  private static readonly NAMESPACE = '/Notification';
  private namespaceSocket: io.Namespace;

  constructor(server: io.Server) {
    this.namespaceSocket = server.of(NotificationListenerManager.NAMESPACE);
    this.namespaceSocket.on('connection', (socket) => {
      // TODO: need to join the socket to the rooms it belongs - by the rooms fields in the user
      this.loadEvents(socket);
    });
  }

  private loadEvents(socket: io.Socket) {
    socket.on(Events.EVENT_ADD_LIKE, (args) => {
      this.newLikeEvent(args);
    });
    socket.on(Events.EVENT_ADD_DISLIKE, (args) => {
      this.newDislikeEvent(args);
    });
    socket.on(Events.EVENT_ADD_COMMENT, (args) => {
      this.newCommentEvent(args);
    })
  }

  // TODO: save notification in db, notify other users about that. 
  private newLikeEvent(args: { postId: string, userId: string }) {
    this.namespaceSocket.in(args.postId).emit(Events.EVENT_LIKE, {
      userId: args.userId,
      timestamp: new Date().getTime(),
    });
      
    NotificationSerializer.createNotification(Events.EVENT_LIKE, {
      userId: args.userId,
      postId: args.postId,
    });    
  }

  // TODO: save notification in db, notify other users about that. 
  private newDislikeEvent(args: { postId: string, userId: string }) {
    this.namespaceSocket.in(args.postId).emit(Events.EVENT_DISLIKE, {
      userId: args.userId,
      timestamp: new Date().getTime(),
    });

    NotificationSerializer.createNotification(Events.EVENT_DISLIKE, {
      userId: args.userId,
      postId: args.postId,
    });
  }

  // TODO: save notification in db, notify other users about that.   
  private newCommentEvent(args: { postId: string, userId: string, text: string }) {
    this.namespaceSocket.in(args.postId).emit(Events.EVENT_COMMENT, {
      userId: args.userId,
      text: args.text,
      timestamp: new Date().getTime(),
    });

    NotificationSerializer.createNotification(Events.EVENT_COMMENT, {
      userId: args.userId,
      postId: args.postId,
      text: args.text,
    });
  }

}