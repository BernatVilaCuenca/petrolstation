const { GraphQLInputObjectType } = require("graphql");
const ObjectFields = require("./ObjectFields");

module.exports = new GraphQLInputObjectType({
    name:"PersonDataInput",
    fields:()=>(ObjectFields)
});