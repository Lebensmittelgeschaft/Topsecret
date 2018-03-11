import { SecretService } from './secret.service';
import { ISecret } from './secret.model';
import { controllerFactory } from '../generic/generic.controller';

const baseController = controllerFactory<ISecret>(new SecretService());

// TODO - implement secret controller used with static methods
export class SecretController extends baseController {

    // Hold the amount of documents to pull by the pagination
    private static readonly PAGE_SIZE = 30;

    /**
     * Get secrets by page slices from the db
     * 
     * @param props - Properties of the secrets to find
     * @param page - Number of page slice to get
     */
    static getSecretsPagination(props: Partial<ISecret>, page: number) {
        const documents_skipped = (page - 1) * SecretController.PAGE_SIZE;
        return baseController.getByProps(props).limit(documents_skipped).skip(page);
    }
}
