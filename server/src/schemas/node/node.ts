import {
  nodeDefinitions,  
  fromGlobalId,
} from 'graphql-relay';

import { MessageController } from './../../message/message.controller';
import { SecretController } from './../../secret/secret.controller';
import { UserController } from './../../user/user.controller';

import { user as UserModel } from './../../user/user.model';
import { secret as SecretModel } from './../../secret/secret.model';
import { message as MessageModel } from './../../message/message.model';

import { UserType } from '../user/user.type';
import { SecretType } from '../secret/secret.type';
import { MessageType } from '../message/message.type';



export const NODE_TYPES = {
  USER: 'User',
  SECRET: 'Secret',
};


export const { nodeInterface, nodeField } = nodeDefinitions(
  async (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    const props = { _id: id };
    switch (type) {
      case (NODE_TYPES.USER): 
        return await UserController.getOneByProps(props);
      case (NODE_TYPES.SECRET):
        return await SecretController.getOneByProps(props);
      default:
        return null;
    }
  },
  (obj) => {
    if (obj instanceof UserModel) {
      return UserType;
    } else if (obj instanceof SecretModel) {
      return SecretType;
    }     
    return null as any;
  },
);
