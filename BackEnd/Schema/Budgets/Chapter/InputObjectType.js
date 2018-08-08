const { GraphQLInputObjectType, GraphQLList, GraphQLString, GraphQLFloat } = require("graphql");
const LineInputObjectType = require("../Line/InputObjectType");

module.exports = new GraphQLInputObjectType({
    name:"ChapterInput",
    fields:()=>({
        Description : { type: GraphQLString },
        Quantity : { type: GraphQLFloat },
        Lines : { type: new GraphQLList(LineInputObjectType) }
    })
});