import { Schema, model } from 'mongoose';
import { IBaseModel } from '../generic/generic.interface';
import { userRefValidator } from './../user/user.validator';

export interface ISecret extends IBaseModel {
  publisher: string;
  text: string;
  comments: { postBy: string, text: string, timestamp?: number }[];
  likes: string[];
  dislikes: string[];
  timestamp: number;
}

const secretSchema: Schema = new Schema({
  publisher: {
    type: String,
    ref: 'User',
    required: true,
    validator: userRefValidator,
  },
  text: {
    type: String,
    required: true,
  },
  comments: {
    type: [{
      postBy: { type: String, ref: 'User', required: true, validator: userRefValidator },
      text: { type: String, required: true },
      timestamp: { type: Number, default: new Date().getTime() },
    }],
    default: [],
  },
  likes: {
    type: [{
      type: String,
      ref: 'User', 
      required: true,
      validator: userRefValidator,      
      unique: true,
    }],
    default: [],
  },
  dislikes: {
    type: [{
      type: String,
      ref: 'User',
      required: true,
      validator: userRefValidator,
      unique: true,
    }],
    default: [],
  },
  timestamp: {
    type: Number,
    default: new Date().getTime(),
  },
});

// Used for avoid from client to modify the timestamp, likes, dislikes and comments of the secret
secretSchema.pre('save', function (this: ISecret, next) {
  this.timestamp = new Date().getTime();
  this.likes = [];
  this.dislikes = [];
  this.comments = [];
  next();
});

export const secret = model<ISecret>('Secret', secretSchema);
