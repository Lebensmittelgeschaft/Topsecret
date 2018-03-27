import { secret as Secret, ISecret } from './secret.model';
import { BaseService } from '../generic/generic.service';

export class SecretService extends BaseService<ISecret> {

  constructor() {
    super(Secret);
  }

  addComment(secretId: string, postBy: string, text: string) {
    return this.update({
      _id: secretId,
      $push: { comments: { postBy: postBy, text: text, timestamp: Date.now() } }
    });
  }
}
