import { Schema, model } from 'mongoose';
import { IBaseModel } from '../generic/generic.interface';

// Used require because this package don't have types declared
const pluginRefValidator = require('mongoose-id-validator');

export interface ISecret extends IBaseModel {
  publisher: string;
  text: string;
  comments: { postBy: string, text: string, timestamp?: number }[];
  likes: string[];
  dislikes: string[];
  timestamp: number;
}

const secretSchema = new Schema({
  publisher: {
    type: String,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  comments: {
    type: [{
      postBy: { type: String, ref: 'User', required: true },
      text: { type: String, required: true },
      timestamp: { type: Number, default: new Date().getTime() },
    }],
    default: [],
  },
  likes: {
    type: [{ type: String, ref: 'User', required: true }],
    default: [],
  },
  dislikes: {
    type: [{ type: String, ref: 'User', required: true }],
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

// Add plugin for validating the existance of referenced values
secretSchema.plugin(pluginRefValidator);

export const secret = model<ISecret>('Secret', secretSchema);
