const graphQL = require("graphql");
const { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
    GraphQLBoolean
} = graphQL;

module.exports = new GraphQLObjectType({
    name:"CustomerList",
    fields:()=>(
        {
            _id : { type: GraphQLID },
            Deletable : { type: GraphQLBoolean },
            Type : { type: new GraphQLNonNull(GraphQLString) },
            CompleteName : { type: GraphQLString },
            Phone : { type: GraphQLString },
            Email : { type: GraphQLString },
            DocumentId : { type: GraphQLString }
        }
    )
});