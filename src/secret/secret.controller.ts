import { SecretService } from './secret.service';
import { ISecret } from './secret.model';
import { controllerFactory } from '../generic/generic.controller';

const baseController = controllerFactory<ISecret>(new SecretService());

// TODO - implement secret controller used with static methods
export class SecretController extends baseController {

}
