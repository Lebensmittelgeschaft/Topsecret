import { UserService } from './user.service';
import { IUser } from './user.model';
import { controllerFactory } from '../generic/generic.controller';
 
const baseUserController = controllerFactory<IUser>(new UserService());

// TODO - implement user controller used with static methods
export class UserController extends baseUserController {  
  
}
