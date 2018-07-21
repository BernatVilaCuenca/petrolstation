const { 
    GraphQLInputObjectType, 
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = require("graphql");

const LegalPersonDataInputObjectType = require("./LegalPersonData/InputObjectType");
const PersonDataInputObjectType = require("./PersonData/InputObjectType");
const AddressInputObjectType = require("./Address/InputObjectType");
const ContactInputObjectType = require("./Contact/InputObjectType");

module.exports = new GraphQLInputObjectType({
    name:"CustomerInput",
    fields:()=>(
        {
            _id : { type: GraphQLID },
            Type : { type: new GraphQLNonNull(GraphQLString) },
            PersonData : { type: PersonDataInputObjectType },
            LegalPersonData : { type: LegalPersonDataInputObjectType },
            Addresses : { type: new GraphQLList(AddressInputObjectType) },
            Contacts : { type: new GraphQLList(ContactInputObjectType) }
        }
    )
});