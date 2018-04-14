import {
  nodeDefinitions,  
  fromGlobalId,
} from 'graphql-relay';

import { SecretController } from './../../secret/secret.controller';
import { UserController } from './../../user/user.controller';

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
);
