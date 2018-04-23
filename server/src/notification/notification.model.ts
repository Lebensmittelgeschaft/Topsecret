import { Schema, model } from 'mongoose';
import { IBaseModel } from '../generic/generic.interface';
import { userRefValidator } from '../user/user.validator';

export enum NotificationType {
  LIKE = 'LIKE',
  DISLIKE = 'DISLIKE',
  COMMENT = 'COMMENT',
};

/* TODO: add link (maybe the post id) to notification refering the actual operation 
               (link to show the client which post someone liked) */
export interface INotification extends IBaseModel {
  type: NotificationType;
  content: string;
  to: string[];
  seen: string[];
  timestamp: number;
}

const notificationSchema: Schema = new Schema({
  type: {
    type: String,
    enum: Object.keys(NotificationType),
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  to: {
    type: [{ type: String, ref: 'User' }],
    required: true,
    validate: userRefValidator,
  },
  seen: {
    type: [{ type: String, ref: 'User' }],
    required: true,
    default: [],
    validate: userRefValidator,
  },
  timestamp: {
    type: Number,
    required: true,
    default: new Date().getTime(),
  },
});

// Used for avoid from client to modify the timestamp and seen fields
notificationSchema.pre('save', function(next) {
  setPredefined(this as INotification);
  next();
})

// Used for force predefined values when first creating secret to avoid validation fails
notificationSchema.pre('validate', function(next) {
  if (this.isNew) {
    setPredefined(this as INotification);
  }
  next();
});

// Helper function to set predefined values on model
const setPredefined = (obj: INotification) => {
  obj.timestamp = new Date().getTime();
  obj.seen = [];  
}

export const notification = model<INotification>( 'Notification', notificationSchema);