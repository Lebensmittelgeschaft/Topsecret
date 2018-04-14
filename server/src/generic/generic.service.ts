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

  getByProps(props: any) {
    const parsedProps = props ? props as Object : {} ;
    return this.model.find(parsedProps);    
  }

  getOneByProps(props: Partial<T>) {
    const parsedProps = props ? props as Object : {};
    return this.model.findOne(parsedProps);    
  }

  aggregator(props: any) {
    return this.model.aggregate(props);
  }

  // Save Methods

  save(model: T) {    
    return model.save();    
  }

  // Update Methods

  update(props: { [key: string]: any, _id: string }) {    
    const { _id, ...parsedProps } = props;    
    return this.model.findOneAndUpdate(
      { _id },
      parsedProps,
      { new: true, runValidators: true },
    );
  }

  // Delete Methods

  deleteById(id: string) {
    return this.model.findByIdAndRemove(id);    
  }
}
