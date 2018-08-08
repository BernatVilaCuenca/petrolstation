const { GraphQLObjectType } = require("graphql");
const LineObjectType = require("../Line/ObjectType");

module.exports = new GraphQLObjectType({
    name:"Chapter",
    fields:()=>({
        Description : { type: GraphQLString },
        Amount : { type: GraphQLFloat },
        Lines : { type: new GraphQLList(LineObjectType) }
    })
});