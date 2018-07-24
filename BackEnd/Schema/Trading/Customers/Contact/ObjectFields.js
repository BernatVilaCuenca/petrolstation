const { GraphQLString } = require("graphql");

module.exports = Object.freeze({
    Name : { type: GraphQLString },
    Surname : { type: GraphQLString },
    Phone : { type: GraphQLString },
    Email : { type: GraphQLString },
    DocumentId : { type: GraphQLString }
});