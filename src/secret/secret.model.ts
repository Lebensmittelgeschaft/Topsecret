import { Schema, model } from 'mongoose';
import { IBaseModel } from '../generic/generic.interface';

export interface ISecret extends IBaseModel {  
  secretText: string;
  comments: { id: string, comment: string, timestamp: number }[];
  likes: number;
  dislikes: number;
  timestamp: number;
}

const secretSchema = new Schema({
  publisherNickname: {
    type: String,
    required: true,
  },
  secretText: {
    type: String,
    required: true,
  },
  comments: {
    type: [{ id: String, comment: String, timestamp: Number }],
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

// Used for avoid from client to modify the timestamp of the secret
secretSchema.pre('save', function (this: ISecret, next) {
  const currentDate = new Date().getTime();
  if (this.timestamp > currentDate) this.timestamp = currentDate;
  next();
});

export const secret = model<ISecret>('Secret', secretSchema);
