import { message as Message } from 'message/message.model';
import { BaseService } from 'generic/generic.service';

class MessageService extends BaseService {  
  
  constructor() {
    super(Message);
  }
}