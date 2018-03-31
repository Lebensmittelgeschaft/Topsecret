import { user as UserModel } from './user.model';
import { uniqueValidator } from './../utils/uniqueValidator';
import { refValidator } from './../utils/refValidator';

export const userRefValidator = [
  refValidator.bind({}, UserModel, '_id'),
  'Reference Error - User {VALUE} does not exist',
];
export const userUniqueValidator = [
  uniqueValidator.bind({}, UserModel, '_id'),
  'Unique Error - User {VALUE} already exists',
];
export const userNicknameValidator = [
  uniqueValidator.bind({}, UserModel, 'nickname'),
  'Unique Error - Nickname {VALUE} already exists',
];
