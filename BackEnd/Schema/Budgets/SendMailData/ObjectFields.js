const { GraphQLString, GraphQLList } = require("graphql");

module.exports = Object.freeze({
    Destinations : { type: new GraphQLList(GraphQLString) }
});