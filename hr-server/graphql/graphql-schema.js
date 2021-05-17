import { RootQueryType,RootMutationType} from './root-queries.js';
import graphql from 'graphql';
const {
    GraphQLSchema,
    GraphQLObjectType
} = graphql;

export const graphQlSchema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})