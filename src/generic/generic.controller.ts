import { BaseService } from './generic.service';
import { IBaseModel } from './generic.interface';
import { Types } from 'mongoose';

// Controller factory for attaching services to controller with basic methods
export function controllerFactory<T extends IBaseModel>(service : BaseService<T>) {

  abstract class BaseController {

    protected static service = service;

    static getByProps(props: Partial<T>) {
      return BaseController.service.getByProps(props);
    }

    static getOneByProps(props: Partial<T>) {
      return BaseController.service.getOneByProps(props);
    }
    
    static save(user: T) {
      return BaseController.service.save(user);
    }
  
    static update(user: T) {
      return BaseController.service.update(user);
    }
  
    static deleteById(id: string | number) {
      return BaseController.service.deleteById(Types.ObjectId(id));
    }
  }

  return BaseController;
}
