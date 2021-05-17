import { dbService } from '../db/dbService.js';
import { regionType } from './hr-model.js';
import graphql from 'graphql';
const {
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLList

} = graphql;

export const RootQueryType = new GraphQLObjectType({
    name: 'rootQueries',
    fields: () => ({
        regions: {
            type: new GraphQLList(regionType),
            description: 'Get all the books',
            resolve: async (root, args, context) => {
                // return regioArry;
                const result = await dbService.fetchData(`select region_id,region_name 
                                    from regions`, 1);
                return result;
            }
        },
        region: {
            type: regionType,
            description: 'Get the book based on Id',
            args: {
                id: {
                    type: GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: async (root, args, context) => {
                // return regioArry;
                const result = await dbService.fetchData(`select region_id,region_name 
                                    from regions where region_id = :region_id and rownum =1`, args.id);
                return result[0];
            }
        }
    })
}
)

export const RootMutationType = new GraphQLObjectType({
    name: 'mutation',
    description: 'creataionupdation mutation',
    fields: () => ({
        addRegion: {
            type: regionType,
            description: 'Add A region',
            args: {

                REGION_NAME: { type: GraphQLNonNull(GraphQLString) },
                REGION_ID: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: async (parent, args) => {
                var region = { "REGION_ID": args.REGION_ID, "REGION_NAME": args.REGION_NAME };
                const result = await dbService.createData(region);
                return region;
            }

        },
        deleteRegion:{
                type: GraphQLNonNull(GraphQLInt),
                args: {
                    id:{type: GraphQLNonNull(GraphQLInt)}
                },
                resolve: async (parent,args)=>{
                    const result = await dbService.deleteData(args.id);
                    return args.id
                }
        },
        updateRegion:{
            type: GraphQLNonNull(GraphQLInt),
            args: {
                REGION_NAME: { type: GraphQLNonNull(GraphQLString) },
                REGION_ID: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: async (parent,args)=>{
                
                var region = { "REGION_ID": args.REGION_ID, "REGION_NAME": args.REGION_NAME };
                const result = await dbService.updateData(region);
                return args.REGION_ID
            }
    },
        

    })
})



    ;