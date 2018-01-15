import { message as Message } from 'message/message.model';
import { BaseService } from 'generic/generic.service';

export class MessageService extends BaseService {  
  
  constructor() {
    super(Message);
  }
}
