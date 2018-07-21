const graphQL = require("graphql");
const { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLList,
    GraphQLBoolean
} = graphQL;

const CustomerObjectType = require("./ObjectType");

module.exports = new GraphQLObjectType({
    name:"SingleCustomerResult",
    fields:()=>(
        {
            success : { type: GraphQLBoolean },
            data : { type: CustomerObjectType },
            errors : { type: new GraphQLList(GraphQLString) }
          }
    )
});