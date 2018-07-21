const { GraphQLObjectType } = require("graphql");
const ObjectFields = require("./ObjectFields");

module.exports = new GraphQLObjectType({
    name:"LegalPersonData",
    fields:()=>(ObjectFields)
});