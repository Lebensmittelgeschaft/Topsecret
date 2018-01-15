import { model, Model } from 'mongoose';
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

  protected async getAll(): Promise<IBaseModel[]> {
    return this.getByProps({});
  }

  protected async getByProps(props: Object): Promise<IBaseModel[]> {
    return this.model.find(props).exec();
  }

  protected async getOneByProps(props: Object): Promise<IBaseModel | null> {
    return this.model.findById(props).exec();
  }

  protected async deleteByProps(props: Object): Promise<IBaseModel | null> {
    return this.model.findByIdAndRemove(props).exec();
  }
}
