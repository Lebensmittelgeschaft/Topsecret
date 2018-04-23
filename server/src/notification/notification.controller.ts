import { NotificationService } from './notification.service';
import { INotification } from './notification.model';
import { controllerFactory } from '../generic/generic.controller';

const baseController = controllerFactory<INotification>(new NotificationService());

export class NotificationController extends baseController {

  /**
   * Add user to seen list of a notification
   * 
   * @param notificationId - Id of the notification
   * @param userId - Id of the user
   */
  static addUserSeen(notificationId: string, userId: string) {
    return (<NotificationService>this.service).addUserSeen(notificationId, userId);
  }

}