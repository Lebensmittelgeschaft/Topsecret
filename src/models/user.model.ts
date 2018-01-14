import { Document, Schema, model } from 'mongoose';
import * as bcrypt from 'bcrypt';

export interface IUser extends Document {
  id: string;
  nickname: string;
}

const userSchema = new Schema({
  id: String,
  nickname: String,
});

// Save the id's as hashes for maximum protection from stealing identity
userSchema.pre('save', function (this: IUser, next) {  
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.id, salt, (err, hash) => {
      this.id = hash;
      next();
    });
  });
});

export const user = model<IUser>('User', userSchema);
