const { GraphQLString } = require("graphql");

module.exports = Object.freeze({
    BusinessName : { type: GraphQLString },
    Phone : { type: GraphQLString },
    Email : { type: GraphQLString },
    DocumentId : { type: GraphQLString }
});