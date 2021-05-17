import express from 'express';
import expressgraphql from 'express-graphql';
import {graphQlSchema} from '../graphql/graphql-schema.js';
import { dbService } from '../db/dbService.js';
import  graphql from 'graphql';
const {
GraphQLObjectType,
GraphQLString,
GraphQLInt,
GraphQLNonNull,
GraphQLSchema
 } = graphql;
export const routes = (app)=>{
//     const schema = 
// new GraphQLSchema({
// query : new GraphQLObjectType({
//     name : 'helloWorld',
//     fields : ()=>({
//             message:
//              {type : GraphQLString,
//              resolve : ()=>  'Hello World'
//             }
//     })
   
   

// })});
    app.use('/graphql', expressgraphql.graphqlHTTP({
        schema: graphQlSchema,
        graphiql: true,
    }))
    app.use(express.static('./public'));
    app.use(express.urlencoded(
        { extended: true }
    ));
    app.get('/', function (req, res) {
        res.sendFile('index.html');
    });
    app.get('/getData', async function (req, res) {
      var result = await dbService.fetchData(`select 
        region_id,region_name 
        from regions`,'',1)
        console.log("result" + result)
        res.send(result);
    });
    
    app.post('/submit-student-data', function (req, res) {
      
        res.send(req.body);
    });
    
    app.put('/update-data', function (req, res) {
        res.send('PUT Request');
    });
    
    app.delete('/delete-data', function (req, res) {
        res.send('DELETE Request');
    });

}