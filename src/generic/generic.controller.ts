import { BaseService } from 'generic/generic.service';
import { IBaseModel } from 'generic/generic.interface';
import { Types, Model } from 'mongoose';



export function controllerFactory<T extends IBaseModel>(service : BaseService<T>) {
  class Controller{
    getUsersByProps(props: Partial<T>) {
      return service.getByProps(props);
    }
    saveUser(user: T) {
      return service.save(user);
    }
  
    updateUser(user: T) {
      return service.update(user);
    }
  
    deleteUser(id: string | number) {
      return service.deleteById(Types.ObjectId(id));
    }
  }
  return Controller;
}


export abstract class BaseController<T extends IBaseModel> {
  
  protected static baseService: BaseService<T>;

  constructor(baseService: BaseService<T>) {

  }
  getUsersByProps(props: Partial<T>) {
    return BaseController.baseService.getByProps(props);
  }

  saveUser(user: T) {
    return this.baseService.save(user);
  }

  updateUser(user: T) {
    return this.baseService.update(user);
  }

  deleteUser(id: string | number) {
    return this.baseService.deleteById(Types.ObjectId(id));
  }
}

