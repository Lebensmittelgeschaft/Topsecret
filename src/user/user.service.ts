import { user as User } from 'user/user.model';
import { BaseService } from 'generic/generic.service';

class UserService extends BaseService {  
  
  constructor() {
    super(User);
  }
}
