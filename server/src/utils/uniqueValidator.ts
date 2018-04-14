import { model as getModel } from 'mongoose';

export const uniqueValidator = async (modelName: string,
                                      idField: string,
                                      idValue: string) => {
  const modelCount = await getModel(modelName).count({ [idField]: idValue });
  return (modelCount === 0);
};
