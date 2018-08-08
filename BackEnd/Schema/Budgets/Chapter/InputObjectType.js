const { GraphQLInputObjectType, GraphQLList } = require("graphql");
const LineInputObjectType = require("../Line/InputObjectType");

module.exports = new GraphQLInputObjectType({
    name:"ChapterInput",
    fields:()=>({
        Description : { type: GraphQLString },
        Amount : { type: GraphQLFloat },
        Lines : { type: new GraphQLList(LineInputObjectType) }
    })
});