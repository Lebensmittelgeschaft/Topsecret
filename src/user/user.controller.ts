import { UserService } from 'user/user.service';
import { IUser } from 'user/user.model';
import { Types } from 'mongoose';
import { controllerFactory, BaseController } from 'generic/generic.controller';
 
const baseUserController = controllerFactory(new UserService());

// TODO - implement user controller used with factory / abstract
class UserController extends baseUserController {

}


/*
export class UserController {
  
  private static userService: UserService = new UserService();

  static getUsersByProps(props: Partial<IUser>) {
    return UserController.userService.getByProps(props);
  }

  static saveUser(user: IUser) {
    return UserController.userService.save(user);
  }

  static updateUser(user: IUser) {
    return UserController.userService.update(user);
  }

  static deleteUser(id: string | number) {
    return UserController.userService.deleteById(Types.ObjectId(id));
  }
}
*/
