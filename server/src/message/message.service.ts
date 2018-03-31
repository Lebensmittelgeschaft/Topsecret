import { message as Message, IMessage } from './message.model';
import { BaseService } from '../generic/generic.service';

export class MessageService extends BaseService<IMessage> {  
  
  constructor() {
    super(Message);
  }

  /**
   * Get conversation between 2 users
   * 
   * @param userOne - User id of a recipient of the conversation
   * @param userTwo - The other user recipient of the conversation
   */
  getConversation(userOne: string, userTwo: string) {
    return this.getByProps({
      sender: { $in: [userOne, userTwo] },
      receiver: { $in: [userOne, userTwo] },       
    }).sort({ timestamp: -1 });
  }

  /**
   * Get all last message conversation by user
   * 
   * @param userId - The user id to get all conversation's last message
   * @return - List of objects in the structure below:
   *           - contact: the user id of the contact
   *           - message: the last message was sent in the conversation
   */
  getUserLastMessageConversations(userId: string) {
    return this.aggregator([
      { $match: { $or: [{ sender: userId }, { receiver: userId }] } },
      { $sort: { timestamp: -1 } },
      { $group: { 
        _id: {
          contact: {
            $cond: {
              if: {
                $eq: ['$sender', userId],
              },
              then: '$receiver',
              else: '$sender',             
            },       
          },
        },
        message: { $first: '$$ROOT' },
      }},
      { $project: {
        contact: '$_id.contact',
        message: '$message',
      }},
    ]);
  }
}
