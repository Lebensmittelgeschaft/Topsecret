import { Schema, model } from 'mongoose';
import { IBaseModel } from '../generic/generic.interface';
import * as crypto from 'crypto';


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
  const hashAlgo = crypto.createHmac('sha512', 'Axe9LAAqAxEttiGq69aW');
  return hashAlgo.update(id).digest('hex');  
}

// Pre defined hooks for hashing the id for the user for maximum anonymously

userSchema.pre('save', function save(this: IUser, next) {
  // console.log(`In pre-save : this._id = ${this._id}, this.nickname= ${this.nickname}`);  
  this._id = generateHash(this._id);
  // console.log(`After pre-save : this._id = ${this._id}, this.nickname= ${this.nickname}`);    
  next();
});

userSchema.pre('find', function find(this: any, next) {  
  this._id = generateHash(this._id);
  next();
});

userSchema.pre('findOne', function findOne(this: any, next) {
  this._id = generateHash(this._id);
  next();
});

userSchema.pre('findOneAndRemove', function findOneAndRemove(this: any, next) {
  this._id = generateHash(this._id);
  next();
});

userSchema.pre('findOneAndUpdate', function findOneAndUpdate(this: any, next) {
  this._id = generateHash(this._id);
  next();
});

userSchema.pre('remove', function remove(this: any, next) {
  this._id = generateHash(this._id);
  next();
});

export const user = model<IUser>('User', userSchema);
