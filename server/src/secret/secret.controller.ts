import { SecretService } from './secret.service';
import { ISecret } from './secret.model';
import { controllerFactory } from '../generic/generic.controller';

const baseController = controllerFactory<ISecret>(new SecretService());

// TODO - implement secret controller used with static methods
export class SecretController extends baseController {

  // Hold the amount of documents to pull by the pagination
  private static readonly PAGE_SIZE = 3;

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
   * Add a like to an existing secret
   * 
   * @param secretId - the secret id to add like to
   * @param userId - the id of the user who liked the secret
   */
  static addLike(secretId: string, userId: string) {
    return (<SecretService>baseController.service).toggleLike(secretId, userId, 'like');
  }

  /**
   * Add a dislike to an existing secret
   * 
   * @param secretId - the secret id to add dislike to
   * @param userId - the id of the user who disliked the secret
   */
  static addDislike(secretId: string, userId: string) {
    return (<SecretService>baseController.service).toggleLike(secretId, userId, 'dislike');
  }

}
