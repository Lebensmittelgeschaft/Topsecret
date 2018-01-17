import { Model, Types } from 'mongoose';
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

  // Update Methods

  update(props: Partial<T>) {
    if (!props.id) throw new Error('Error updating model, id not defined');    
    const parsedProps = props ? props as Object : {};
    return this.model.findByIdAndUpdate(props.id, parsedProps, { new: true });
  }

  // Delete Methods

  deleteById(id: Types.ObjectId) {
    return this.model.findByIdAndRemove(id);
  }
}
