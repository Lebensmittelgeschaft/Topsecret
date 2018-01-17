import { user as User, IUser } from 'user/user.model';
import { BaseService } from 'generic/generic.service';


export class UserService extends BaseService<IUser> {  
  
  constructor() {
    super(User);
  }
}
