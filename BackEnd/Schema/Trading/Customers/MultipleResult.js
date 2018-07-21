const graphQL = require("graphql");
const { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLList,
    GraphQLBoolean
} = graphQL;

const CustomerObjectType = require("./ObjectType");

module.exports = new GraphQLObjectType({
    name:"MultipleCustomersResult",
    fields:()=>(
        {
            success : { type: GraphQLBoolean },
            data : { type: new GraphQLList(CustomerObjectType) },
            errors : { type: new GraphQLList(GraphQLString) }
        }
    )
});