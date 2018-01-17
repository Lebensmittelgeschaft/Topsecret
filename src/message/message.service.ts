import { message as Message, IMessage } from 'message/message.model';
import { BaseService } from 'generic/generic.service';

export class MessageService extends BaseService<IMessage> {  
  
  constructor() {
    super(Message);
  }
}
