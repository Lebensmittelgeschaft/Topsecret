import { IBaseModel } from './../generic/generic.interface';
import { Model, ValidationError } from 'mongoose';

export const uniqueValidator = async (model: Model<IBaseModel>,
                                      idField: string,
                                      idValue: string) => {
  const modelCount = await model.count({ [idField]: idValue });
  return (modelCount === 1);
};
