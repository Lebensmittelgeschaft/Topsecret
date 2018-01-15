import { secret as Secret } from 'secret/secret.model';
import { BaseService } from 'generic/generic.service';

export class SecretService extends BaseService {  
  
  constructor() {
    super(Secret);
  }
}
