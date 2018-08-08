const { GraphQLString, GraphQLFloat } = require("graphql");

module.exports = Object.freeze({
    Description : { type: GraphQLString },
    Quantity : { type: GraphQLFloat }
});