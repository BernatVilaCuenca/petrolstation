const Type = require("./Type");
const LegalPersonDataFactory = require("./LegalPersonDataFactory");
const PersonDataFactory = require("./PersonDataFactory");
const StringUtils = require("../../../utils/String")

module.exports = class CustomerFactory {
    static create(){
        return{
            _id: null,
            Type: Type.Person,
            PersonData: PersonDataFactory.create(),
            LegalPersonData: LegalPersonDataFactory.create(),
            Addresses:[],
            Contacts:[]
        };
    }
}