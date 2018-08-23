const { GraphQLObjectType, GraphQLBoolean } = require("graphql");

module.exports = new GraphQLObjectType({
    name:"Actions",
    fields:()=>({
        Edit : { type: GraphQLBoolean },
        Delete : { type: GraphQLBoolean },
        Lock : { type: GraphQLBoolean },
        Reopen : { type: GraphQLBoolean },
        SendMail : { type: GraphQLBoolean }
    })
});