const graphQL = require("graphql");
const { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLID
} = graphQL;

module.exports = new GraphQLObjectType({
    name:"Town",
    fields:()=>({
      _id: { type: GraphQLID },
      Name: { type: GraphQLString }      
    })
});