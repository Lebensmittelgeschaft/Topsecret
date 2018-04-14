import { model as getModel } from 'mongoose';

export const refValidator = async (modelName: string, idField: string, idValue: string) => {
  const modelExist = await getModel(modelName).findOne({ [idField]: idValue });
  return !!modelExist;
};  
