import { Document, Schema, model } from 'mongoose';
import { IBaseModel } from 'generic/generic.interface';
export interface IMessage extends Document {
  sender: string;
  receiver: string;
  timestamp: number;
}

const messageSchema = new Schema({
  sender: String,
  receiver: String,
  timestamp: Number,
});

export const message = model<IMessage>('Message', messageSchema);
