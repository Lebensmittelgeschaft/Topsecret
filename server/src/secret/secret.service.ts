import { secret as Secret, ISecret } from './secret.model';
import { BaseService } from '../generic/generic.service';

type SecretArrayType = 'like' | 'dislike';

export class SecretService extends BaseService<ISecret> {

  constructor() {
    super(Secret);
  }

  /**
   * Get secrets by page slices from the db
   * 
   * @param offset - number of secret to skip
   * @param count - number of secret to pull
   * @param props - props for filtering in the query
   */
  getSecretsPagination(offset: number, count: number, props?: Partial<ISecret>) {    
    return this.getByProps(props || {})
               .limit(count).skip(offset).populate('publisher likes dislikes comments.postBy');
  }

  /**
   * Add a comment to an existing secret in db
   * 
   * @param secretId - the secret id to add comment to 
   * @param postBy - the user id who comment
   * @param text - text of the comment
   */
  addComment(secretId: string, postBy: string, text: string) {
    return this.update({
      _id: secretId,
      $push: { comments: { postBy, text, timestamp: Date.now() } },
    }).populate('publisher likes dislikes comments.postBy');
  }

  /**
   * Add a user to secret's like/dislikes array
   * and delete him from the opposite array
   * 
   * @param secretId - the secret id to add into
   * @param userId - the user id to add
   * @param arrayType - like or dislike array
   */
  async toggleLike(secretId: string, userId: string, arrayType: SecretArrayType) {
    let query = {};    
    const secret = await this.getOneByProps({ _id: secretId });
    
    if (secret) {

      switch (arrayType) {
        case ('like'):                  
          if (secret.likes.indexOf(userId) != -1) {
            query = { $pull: { likes: userId } };
          } else {
            query = { $pull: { dislikes: userId }, $addToSet: { likes: userId } };
          }
          break;

        case ('dislike'):          
          if (secret.dislikes.indexOf(userId) != -1) {
            query = { $pull: { dislikes: userId } };
          } else {
            query = { $pull: { likes: userId }, $addToSet: { dislikes: userId } };
          }
          break;
        default:
      }     

      return this.update({
        _id: secretId,
        ...query,
      }).populate('publisher likes dislikes comments.postBy');
    }

    return null;
  }

}
