const { 
    GraphQLInputObjectType, 
    GraphQLString,
    GraphQLID
} = require("graphql");

const AccountInputObjectType = require("./Account/InputObjectType");
const AddressInputObjectType = require("../../Shared/Address/InputObjectType");

module.exports = new GraphQLInputObjectType({
    name:"OwnEnterpriseInput",
    fields:()=>(
        {
            _id : { type: GraphQLID },
            CompleteName : { type: GraphQLString },
            TradingName : { type: GraphQLString },
            DocumentId : { type: GraphQLString },
            Phone : { type: GraphQLString },
            Email : { type: GraphQLString },
            Account : { type: AccountInputObjectType },
            Address : { type: AddressInputObjectType }
        }
    )
});