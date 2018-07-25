const graphQL = require("graphql");
const { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLList,
    GraphQLBoolean
} = graphQL;

const MultipleResultObjectType = require("./MultipleResultObjectType");

module.exports = new GraphQLObjectType({
    name:"MultipleCustomersResult",
    fields:()=>(
        {
            success : { type: GraphQLBoolean },
            data : { type: new GraphQLList(MultipleResultObjectType) },
            errors : { type: new GraphQLList(GraphQLString) }
        }
    )
});