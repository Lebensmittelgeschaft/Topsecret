import { SecretService } from 'secret/secret.service';
import { ISecret } from 'secret/secret.model';
import { controllerFactory } from 'generic/generic.controller';

const baseController = controllerFactory<ISecret>(new SecretService());

// TODO - implement secret controller used with static methods
export class SecretController extends baseController {

}
