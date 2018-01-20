import { Document, Schema, model } from 'mongoose';
import { IBaseModel } from '../generic/generic.interface';

// Used require because this package don't have types declared
const pluginRefValidator = require('mongoose-id-validator');

export interface IMessage extends Document {
  sender: string;
  receiver: string;
  messageText: string;
  timestamp: number;
}

const messageSchema = new Schema({
  sender: {
    type: String,
    ref: 'User',
    required: true,
  },
  receiver: {
    type: String,
    ref: 'User',
    required: true,
  },
  messageText: {
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

messageSchema.plugin(pluginRefValidator);

export const message = model<IMessage>('Message', messageSchema);
