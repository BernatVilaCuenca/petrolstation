const graphQL = require("graphql");
const { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLID
} = graphQL;
const AccountObjectType = require("./Account/ObjectType");
const AddressObjectType = require("../../Shared/Address/ObjectType");

module.exports = new GraphQLObjectType({
    name:"OwnEnterprise",
    fields:()=>(
        {
            _id : { type: GraphQLID },
            CompleteName : { type: GraphQLString },
            TradingName : { type: GraphQLString },
            DocumentId : { type: GraphQLString },
            Phone : { type: GraphQLString },
            Email : { type: GraphQLString },
            Account : { type: AccountObjectType },
            Address : { type: AddressObjectType }
        }
    )
});