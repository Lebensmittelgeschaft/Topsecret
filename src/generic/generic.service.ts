import { Model } from 'mongoose';
import { IBaseModel } from './generic.interface';

// Generic class for quering mongoose models
export class BaseService {

  private model: Model<IBaseModel>;
  private primaryKey: any;

  /**
   * Contruct base service class
   * @param model - Mongoose model for queries   
   */
  constructor(model: Model<IBaseModel>) {
    this.model = model;    
  }
  
  // Get Methods

  protected getAll(): Promise<IBaseModel[]> {
    return this.getByProps({});
  }

  protected getByProps(props: Object): Promise<IBaseModel[]> {
    return this.model.find(props).exec();
  }

  protected getOneByProps(props: Object): Promise<IBaseModel | null> {
    return this.model.findById(props).exec();
  }

  // Save Methods

  protected save(model: IBaseModel): Promise<IBaseModel> {
    return model.save();
  }

  // Delete Methods

  protected deleteByProps(props: Object): Promise<IBaseModel | null> {
    return this.model.findByIdAndRemove(props).exec();
  }
}
