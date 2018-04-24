import { refValidator } from './../utils/refValidator';

export const notificationRefValidator = [
  refValidator.bind({}, 'Notification', '_id'),
  'Reference Error - Notification {VALUE} does not exist',
];