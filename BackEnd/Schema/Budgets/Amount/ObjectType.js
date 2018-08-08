const { GraphQLObjectType } = require("graphql");
const ObjectFields = require("./ObjectFields");

module.exports = new GraphQLObjectType({
    name:"Amount",
    fields:()=>(ObjectFields)
});