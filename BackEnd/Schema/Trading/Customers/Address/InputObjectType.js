const { GraphQLString, GraphQLInputObjectType } = require("graphql");

module.exports = new GraphQLInputObjectType({
    name:"AddressInput",
    fields:()=>({
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