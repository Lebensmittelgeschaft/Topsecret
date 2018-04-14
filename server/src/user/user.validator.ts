import { uniqueValidator } from './../utils/uniqueValidator';
import { refValidator } from './../utils/refValidator';

export const userRefValidator = [
  refValidator.bind({}, 'User', '_id'),
  'Reference Error - User {VALUE} does not exist',
];
export const userUniqueValidator = [
  uniqueValidator.bind({}, 'User', '_id'),
  'Unique Error - User {VALUE} already exists',
];
export const userNicknameValidator = [
  uniqueValidator.bind({}, 'User', 'nickname'),
  'Unique Error - Nickname {VALUE} already exists',
];
