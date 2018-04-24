import * as Events from './notification.events';

import { notification as NotificationModel, NotificationType } from '../../notification/notification.model';
import { NotificationController } from '../../notification/notification.controller';
import { SecretController } from '../../secret/secret.controller';
import { UserController } from '../../user/user.controller';

export class NotificationSerializer {
  
  static async createNotification(eventName: string, params: { userId: string, postId: string, text?: string}) {
    let content = '';
    
    const post = await SecretController.getOneByProps({ _id: params.postId }).populate('publisher');

    if (!post) {
      return;
    }    

    let to = [(post.publisher as any) .id];

    switch (eventName) {
      case (Events.EVENT_LIKE): 
        content = `${ (post.publisher as any).nickname } liked the post '${ post.text }' }`;
        break;
      case (Events.EVENT_ADD_DISLIKE): 
        content = `${ (post.publisher as any).nickname } disliked the post '${ post.text }' }`;
        break;
      case (Events.EVENT_ADD_COMMENT): 
        content = `${ (post.publisher as any).nickname } add a comment: '${ params.text }' on
                          the post '${ post.text }' }`;        
        break;
      default:
        return;
    }
    
    // TODO: add subscribers option for other people to watch notifications
    return await NotificationController.save(new NotificationModel({
      type: eventName,
      content,
      to,
      timestamp: new Date().getTime(),      
    }));
  }

  
}