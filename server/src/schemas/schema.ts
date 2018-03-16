import { GraphQLSchema } from 'graphql';
import { Queries } from './queries';
import { Mutations } from './mutations';

const schema = new GraphQLSchema({
  query: Queries,
  mutation: Mutations,
});

export { schema as GraphqlSchema };
