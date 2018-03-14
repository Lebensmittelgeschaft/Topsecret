import { GraphQLSchema } from 'graphql';
import Queries from './queries';

const schema = new GraphQLSchema({
  query: Queries

});

export default schema;
