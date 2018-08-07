const { GraphQLInputObjectType } = require("graphql");

module.exports = new GraphQLInputObjectType({
    name:"ChapterInput",
    fields:()=>({
        Description : { type: GraphQLString },
        Amount : { type: GraphQLFloat },
        Lines
    })
});