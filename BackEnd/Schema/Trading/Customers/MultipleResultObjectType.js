const graphQL = require("graphql");
const { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLID,
    GraphQLNonNull
} = graphQL;

module.exports = new GraphQLObjectType({
    name:"CustomerList",
    fields:()=>(
        {
            _id : { type: GraphQLID },
            Type : { type: new GraphQLNonNull(GraphQLString) },
            CompleteName : { type: GraphQLString },
            Phone : { type: GraphQLString },
            Email : { type: GraphQLString },
            DocumentId : { type: GraphQLString }
        }
    )
});