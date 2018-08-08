const { GraphQLList, GraphQLString, GraphQLFloat , GraphQLObjectType } = require("graphql");
const LineObjectType = require("../Line/ObjectType");

module.exports = new GraphQLObjectType({
    name:"Chapter",
    fields:()=>({
        Description : { type: GraphQLString },
        Quantity : { type: GraphQLFloat },
        Lines : { type: new GraphQLList(LineObjectType) }
    })
});