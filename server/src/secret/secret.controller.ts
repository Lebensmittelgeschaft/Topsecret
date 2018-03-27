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
        const documents_skipped = (page - 1) * SecretController.PAGE_SIZE;
        return baseController.getByProps(props || {}).limit(SecretController.PAGE_SIZE).skip(documents_skipped);
    }

    static addComment(secretId: string, postBy: string, text: string) {
        return baseController.service.addComment(secretId, postBy, text);
    }
}
