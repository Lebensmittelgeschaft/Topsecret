import {
  Thunk,
  GraphQLFieldConfigMap,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull  
} from 'graphql';
import { SecretType } from './secret.type';
import { SecretController } from './../../secret/secret.controller';


const queryFields: Thunk<GraphQLFieldConfigMap<any,any>> = {
  secert: {
    type: SecretType,
    description: 'Get specific secret by secret id',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      },
    },
    resolve: async (root, args) => {
      return await SecretController.getOneByProps({ _id: args.id });        
    },
  },

  secrets: {
    type: new GraphQLList(SecretType),
    description: 'Get secrets by pagination',
    args: {
      pageNum: {
        type: GraphQLInt
      },
    },
    resolve: async (root, args) => {
      return await SecretController.getSecretsPagination(args.pageNum);
    },

  },
};

export { queryFields as SecretQueriesFields };