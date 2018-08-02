const graphQL = require("graphql");
const { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} = graphQL;

const LegalPersonDataObjectType = require("./LegalPersonData/ObjectType");
const PersonDataObjectType = require("./PersonData/ObjectType");
const AddressObjectType = require("./Address/ObjectType");
const ContactObjectType = require("./Contact/ObjectType");

module.exports = new GraphQLObjectType({
    name:"Customer",
    fields:()=>(
        {
            _id : { type: GraphQLID },
            Deletable: { type: GraphQLBoolean},
            Type : { type: new GraphQLNonNull(GraphQLString) },
            PersonData : { type: PersonDataObjectType },
            LegalPersonData : { type: LegalPersonDataObjectType },
            Addresses : { type: new GraphQLList(AddressObjectType) },
            Contacts : { type: new GraphQLList(ContactObjectType) }
        }
    )
});