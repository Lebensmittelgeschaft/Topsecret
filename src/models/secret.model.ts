import { Document, Schema, model } from 'mongoose';

export interface ISecret extends Document {
  id: string;
  secretText: string;
  comments: { id: String, comment: String }[];
  likes: number;
  dislikes: number;
}

const secretSchema = new Schema({
  id: String,
  secretText: String,
  comments: [{ id: String, comment: String }],  
  likes: Number,
  dislikes: Number,
});

export const secret = model<ISecret>('Secret', secretSchema);
