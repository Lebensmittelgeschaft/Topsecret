import { Schema, model } from 'mongoose';
import { IBaseModel } from '../generic/generic.interface';
import * as bcrypt from 'bcrypt';

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
}, {_id: false});

// Save the id's as hashes for maximum protection from stealing identity
userSchema.pre('save', function (this: IUser, next) {  
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this._id, salt, (err, hash) => {
      this._id = hash;
      next();
    });
  });
});

export const user = model<IUser>('User', userSchema);
