import { Schema, model } from 'mongoose';
import { IBaseModel } from '../generic/generic.interface';
import { userUniqueValidator, userNicknameValidator } from './user.validator';
import * as crypto from 'crypto';

export interface IUser extends IBaseModel {
  _id: string;
  nickname: string;
}

const userSchema: Schema = new Schema({
  _id: {
    type: String,
    unique: true,
    required: true,
    validator: userUniqueValidator,
  },
  nickname: {
    type: String,
    unique: true,        
    required: true,
    validator: userNicknameValidator,
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

export const user = model<IUser>('User', userSchema);
