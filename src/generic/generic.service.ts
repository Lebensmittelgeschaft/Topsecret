import { Model } from 'mongoose';
import { IBaseModel } from './generic.interface';

// Generic class for quering mongoose models
export class BaseService<T extends IBaseModel> {

  private model: Model<T>;
  private primaryKey: any;

  /**
   * Contruct base service class
   * @param model - Mongoose model for queries   
   */
  constructor(model: Model<T>) {
    this.model = model;    
  }
  
  // Get Methods

  getByProps(props: Partial<T>) {
    const parsedProps = props ? props as Object : {} ;
    return this.model.find(parsedProps);
  }

  getOneByProps(props: Partial<T>) {
    const parsedProps = props ? props as Object : {};
    return this.model.findOne(parsedProps);
  }

  // Save Methods

  save(model: T) {
    return model.save();
  }

  // Delete Methods

  deleteById(id: string | number | Object) {
    return this.model.findByIdAndRemove(id);
  }
}
