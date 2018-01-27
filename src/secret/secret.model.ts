import { Schema, model } from 'mongoose';
import { IBaseModel } from '../generic/generic.interface';

// Used require because this package don't have types declared
const pluginRefValidator = require('mongoose-id-validator');

export interface ISecret extends IBaseModel {
  publisher: string;
  secretText: string;
  comments: { postBy: string, comment: string, timestamp?: number }[];
  likes: number;
  dislikes: number;
  timestamp: number;
}

const secretSchema = new Schema({
  publisher: {
    type: String,
    ref: 'User',
    required: true,
  },
  secretText: {
    type: String,
    required: true,
  },
  comments: {
    type: [{
      postBy: { type: String, ref: 'User' },
      comment: String,
      timestamp: { type: Number, default: new Date().getTime() },
    }],
    default: [],
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  timestamp: {
    type: Number,
    default: new Date().getTime(),
  },
});

// Used for avoid from client to modify the timestamp, likes, dislikes and comments of the secret
secretSchema.pre('save', function (this: ISecret, next) {
  this.timestamp = new Date().getTime();
  this.likes = 0;
  this.dislikes = 0;
  this.comments = [];
  next();
});

// Add plugin for validating the existance of referenced values
secretSchema.plugin(pluginRefValidator);

export const secret = model<ISecret>('Secret', secretSchema);
