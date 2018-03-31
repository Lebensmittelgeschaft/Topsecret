import { BaseService } from './generic.service';
import { IBaseModel } from './generic.interface';
import { Types } from 'mongoose';

// Controller factory for attaching services to controller with basic methods
export function controllerFactory<T extends IBaseModel>(service : BaseService<T>) {

  abstract class BaseController {

    protected static service = service;

    static getByProps(props: any) {
      return BaseController.service.getByProps(props);
    }

    static getOneByProps(props: Partial<T>) {
      return BaseController.service.getOneByProps(props);
    }
    
    static save(model: T) {
      return BaseController.service.save(model);
    }
  
    static update(props: any) {
      return BaseController.service.update(props);
    }
  
    static deleteById(id: string) {
      return BaseController.service.deleteById(id);
    }
  }

  return BaseController;
}
