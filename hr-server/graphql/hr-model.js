import graphql from 'graphql';
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,

} = graphql;

export const regionType = new GraphQLObjectType({
    name: "regionType",
    fields: () => ({
        REGION_ID: {
            type: GraphQLNonNull(GraphQLInt)
        },
        REGION_NAME: {
            type: GraphQLNonNull(GraphQLString)
        }

    }),
});
