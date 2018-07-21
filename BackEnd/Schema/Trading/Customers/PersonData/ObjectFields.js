const { GraphQLString } = require("graphql");

module.exports = Object.freeze({
    Name : { type: GraphQLString },
    SurName : { type: GraphQLString },
    CompleteName : { type: GraphQLString },
    Phone : { type: GraphQLString },
    Email : { type: GraphQLString },
    DocumentId : { type: GraphQLString }
});