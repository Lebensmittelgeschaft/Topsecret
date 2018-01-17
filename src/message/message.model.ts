import { Document, Schema, model } from 'mongoose';
import { IBaseModel } from 'generic/generic.interface';
export interface IMessage extends Document {
  sender: string;
  receiver: string;
  timestamp: number;
}

const messageSchema = new Schema({
  sender: {
    type: String,
    required: true,
  },
  receiver: {
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
  const currentDate = new Date().getTime();
  if (this.timestamp > currentDate) this.timestamp = currentDate;
  next();
});

export const message = model<IMessage>('Message', messageSchema);
