import { Schema, model } from 'mongoose';
import { IBaseModel } from '../generic/generic.interface';
import * as crypto from 'crypto';
import * as uniqueValidator from 'mongoose-unique-validator';

export interface IUser extends IBaseModel {
  _id: string;
  nickname: string;
}

const userSchema = new Schema({
  _id: {
    type: String,
    unique: true,
    required: true,
  },
  nickname: {
    type: String,
    unique: true,        
    required: true,
  },       
});

// Utility method for generate hash for given string
export function generateHash(id: string): string {
  const hashAlgo = crypto.createHmac('sha256', 'Axe9LAAqAxEttiGq69aW');
  return hashAlgo.update(id).digest('hex');  
}

// Pre defined hook for hashing the id for the user for maximum anonymously
userSchema.pre('save', function save(this: IUser, next) {  
  this._id = generateHash(this._id);
  next();
});

// Add unique validator for unique field in model
// TODO - write own unique validator than using the npm package for it
userSchema.plugin(uniqueValidator);

export const user = model<IUser>('User', userSchema);
