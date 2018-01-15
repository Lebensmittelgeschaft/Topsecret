import { secret as Secret } from 'secret/secret.model';
import { BaseService } from 'generic/generic.service';

class SecretService extends BaseService {  
  
  constructor() {
    super(Secret);
  }
}
