import { MessageService } from './message.service';
import { IMessage } from './message.model';
import { controllerFactory } from '../generic/generic.controller';

const baseController = controllerFactory<IMessage>(new MessageService());

// TODO - implement message controller used with static methods
export class MessageController extends baseController {

  // Hold the amount of documents to pull by the pagination
  private static readonly PAGE_SIZE = 50;
  
  /**
   * Get conversation messages by page slices from the db
   * 
   * @param userOne - User id of a recipient of the conversation
   * @param userTwo - The other user recipient of the conversation
   * @param page - Number of page slice to get     
   */  
  static getConversationPagination(userOne: string, userTwo: string, page: number) {
    const skippedDocuments = (page - 1) * MessageController.PAGE_SIZE;
    return (<MessageService>baseController.service)
           .getConversation(userOne, userTwo)
           .sort({ timestamp: -1 }).limit(MessageController.PAGE_SIZE).skip(skippedDocuments);
  }

  /**
   * Get all last message conversation by user
   * 
   * @param userId - The user id to get all conversation's last message
   */
  static getUserLastMessageConversations(userId: string) {
    return (<MessageService>baseController.service).getUserLastMessageConversations(userId);
  }

}
