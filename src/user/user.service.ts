import { user as User } from 'user/user.model';
import { BaseService } from 'generic/generic.service';

export class UserService extends BaseService {  
  
  constructor() {
    super(User);
  }
}
