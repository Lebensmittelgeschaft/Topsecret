import { Schema, model } from 'mongoose';
import { IBaseModel } from '../generic/generic.interface';
import { userRefValidator } from './../user/user.validator';

export interface IMessage extends IBaseModel {
  sender: string;
  receiver: string;
  text: string;
  timestamp: number;
}

const messageSchema: Schema = new Schema({
  sender: {
    type: String,
    ref: 'User',
    required: true,
    validator: userRefValidator,
  },
  receiver: {
    type: String,
    ref: 'User',
    required: true,
    validator: userRefValidator,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Number,
    default: new Date().getTime(),
  },
});

// Used for avoid from client to modify the timestamp of the message
messageSchema.pre('save', function (this: IMessage, next) {
  this.timestamp = new Date().getTime();
  next();
});

export const message = model<IMessage>('Message', messageSchema);
