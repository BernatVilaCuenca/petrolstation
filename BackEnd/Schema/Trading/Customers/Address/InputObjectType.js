const { GraphQLID, GraphQLString, GraphQLBoolean, GraphQLInputObjectType } = require("graphql");

module.exports = new GraphQLInputObjectType({
    name:"AddressInput",
    fields:()=>({
        _id : { type: GraphQLID },
        Deletable: { type: GraphQLBoolean},
        DepartmentId: { type: GraphQLString },
        TownId: { type: GraphQLString },
        PostCode : { type: GraphQLString },
        StreetName : { type: GraphQLString },
        HouseNumber : { type: GraphQLString },
        FlatNumber : { type: GraphQLString },
        Door : { type: GraphQLString },
        Others : { type: GraphQLString }
    })
});