import { Schema, model } from 'mongoose';
import { IBaseModel } from '../generic/generic.interface';
import { userRefValidator } from './../user/user.validator';

export interface ISecret extends IBaseModel {
  publisher: string;
  text: string;
  comments: { _id: string, postBy: string, text: string, timestamp?: number }[];
  likes: string[];
  dislikes: string[];
  timestamp: number;
}

const secretSchema: Schema = new Schema({
  publisher: {
    type: String,
    ref: 'User',
    required: true,
    validate: userRefValidator,
  },
  text: {
    type: String,
    required: true,
  },
  comments: {
    type: [{
      postBy: { type: String, ref: 'User', required: true, validate: userRefValidator },
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
      validate: userRefValidator,      
    }],
    default: [],
    
  },
  dislikes: {
    type: [{
      type: String,
      ref: 'User',
      required: true,
      validate: userRefValidator,
    }],
    default: [],
  },
  timestamp: {
    type: Number,
    default: new Date().getTime(),
  },
});

// Used for avoid from client to modify the timestamp, likes, dislikes and comments of the secret
secretSchema.pre('save', function (next) {
  setPredefined(this as ISecret);
  next();
});

// Used for force predefined values when first creating secret to avoid validation fails
secretSchema.pre('validate', function (next) {
  if (this.isNew) {
    setPredefined(this as ISecret);
  } 
  next();    
});

// Helper function to set predefined value on model
const setPredefined = (obj: ISecret) => {
  obj.timestamp = new Date().getTime();
  obj.likes = [];
  obj.dislikes = [];
  obj.comments = [];
}

export const secret = model<ISecret>('Secret', secretSchema);
