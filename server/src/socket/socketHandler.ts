import { Application } from 'express';
import * as io from 'socket.io';
import { NotificationListenerManager } from './notification/notification.listeners';

export class SocketHandler {

  private serverSocket: io.Server;

  constructor(appServer: Application) {
    this.serverSocket = io(appServer);
    new NotificationListenerManager(this.serverSocket);
  }  

}
