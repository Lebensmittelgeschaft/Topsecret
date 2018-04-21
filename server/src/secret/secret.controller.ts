import { SecretService } from './secret.service';
import { ISecret } from './secret.model';
import { controllerFactory } from '../generic/generic.controller';

const baseController = controllerFactory<ISecret>(new SecretService());

// TODO - implement secret controller used with static methods
export class SecretController extends baseController {

  // Hold the amount of documents to pull by the pagination
  private static readonly PAGE_SIZE = 10;

  /**
   * Get secrets by page slices from the db
   * 
   * @param page - Number of page slice to get
   * @param props? - Properties of the secrets to find (Optional)
   */  
  static getSecretsPagination(page: number, props?: Partial<ISecret>) {
    const skippedDocuments = (page - 1) * SecretController.PAGE_SIZE;
    return (<SecretService>baseController.service).getSecretsPagination(skippedDocuments,
                                                                        SecretController.PAGE_SIZE,
                                                                        props ? props : {});
                                                 
  }

  static save(model: ISecret) {
    return baseController.save(model).then(value => value.populate('publisher').execPopulate());
  }

  /**
   * Add a comment to an existing secret
   * 
   * @param secretId - the secret id to add comment to 
   * @param postBy - the user id who comment
   * @param text - text of the comment
   */
  static addComment(secretId: string, postBy: string, text: string) {
    return (<SecretService>baseController.service).addComment(secretId, postBy, text);
  }

  /**
   * Add/Remove a like to/from an existing secret
   * 
   * @param secretId - the secret id to add/remove like to/from
   * @param userId - the id of the user who liked the secret
   */
  static toggleLike(secretId: string, userId: string) {
    return (<SecretService>baseController.service).toggleLike(secretId, userId, 'like');
  }

  /**
   * Add/Remove a dislike to/from an existing secret
   * 
   * @param secretId - the secret id to add/remove dislike to/from
   * @param userId - the id of the user who disliked the secret
   */
  static toggleDislike(secretId: string, userId: string) {
    return (<SecretService>baseController.service).toggleLike(secretId, userId, 'dislike');
  }

}
