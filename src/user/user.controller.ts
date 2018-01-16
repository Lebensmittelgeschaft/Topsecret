import { UserService } from 'user/user.service';
import { IUser } from 'user/user.model';

export class UserController {
  
  private static userService: UserService = new UserService();

  static getUsersByProps(props: Partial<IUser>) {
    return UserController.userService.getByProps(props);
  }

  static saveUser(user: IUser) {
    return UserController.userService.save(user);
  }
}
