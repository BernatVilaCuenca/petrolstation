const { GraphQLObjectType } = require("graphql");

module.exports = new GraphQLObjectType({
    name:"Chapter",
    fields:()=>({
        Description : { type: GraphQLString },
        Amount : { type: GraphQLFloat },
        Lines
    })
});