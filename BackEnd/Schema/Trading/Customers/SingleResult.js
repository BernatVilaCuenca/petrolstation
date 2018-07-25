const graphQL = require("graphql");
const { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLList,
    GraphQLBoolean
} = graphQL;

const SingleResultObjectType = require("./SingleResultObjectType");

module.exports = new GraphQLObjectType({
    name:"SingleCustomerResult",
    fields:()=>(
        {
            success : { type: GraphQLBoolean },
            data : { type: SingleResultObjectType },
            errors : { type: new GraphQLList(GraphQLString) }
          }
    )
});