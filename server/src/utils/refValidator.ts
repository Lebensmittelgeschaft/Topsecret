import { Model } from 'mongoose';
import { IBaseModel } from './../generic/generic.interface';

export const refValidator = async (model: Model<IBaseModel>, idField: string, idValue: string) => {
  const modelExist = await model.findOne({ [idField]: idValue });
  return (modelExist) ? true : false;
};  
