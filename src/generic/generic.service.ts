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
    return this.model.find(parsedProps).then(result => result).catch(err => null);
  }

  getOneByProps(props: Partial<T>) {
    const parsedProps = props ? props as Object : {};
    return this.model.findOne(parsedProps).then(result => result).catch(err => null);
  }

  // Save Methods

  save(model: T) {
    // console.log(model);
    return model.save().then(result => result)
    .catch((err) => { 
      console.log(err);
      return null;
    });
  }

  // Update Methods

  update(props: Partial<T>) {
    if (!props._id) return null;    
    const parsedProps = props ? props as Object : {};    
    return this.model.findOneAndUpdate({ _id: props._id }, parsedProps, { new: true })
                     .then(result => result)
                     .catch(err => null);
  }

  // Delete Methods

  deleteById(id: string) {
    return this.model.findByIdAndRemove(id).then(result => result).catch(err => null);
  }
}
