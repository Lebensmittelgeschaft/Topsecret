import { notification as NotificationModel, INotification } from './notification.model';
import { BaseService } from '../generic/generic.service';

export class NotificationService extends BaseService<INotification> {

  constructor() {
    super(NotificationModel);
  }

  /**
   * Add user to seen list of a notification
   * 
   * @param notificationId - Id of the notification
   * @param userId - Id of the user
   */
  addUserSeen(notificationId: string, userId: string) {
    return this.update({
      _id: notificationId,
      $addToSet: { seen: userId },
    });
  }
  
}