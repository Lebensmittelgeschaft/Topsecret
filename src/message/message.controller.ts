import { MessageService } from './message.service';
import { IMessage } from './message.model';
import { controllerFactory } from '../generic/generic.controller';

const baseController = controllerFactory<IMessage>(new MessageService());

// TODO - implement message controller used with static methods
export class MessageController extends baseController {

}
