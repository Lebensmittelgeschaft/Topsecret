import { secret as Secret, ISecret } from 'secret/secret.model';
import { BaseService } from 'generic/generic.service';

export class SecretService extends BaseService<ISecret> {  
  
  constructor() {
    super(Secret);
  }
}
