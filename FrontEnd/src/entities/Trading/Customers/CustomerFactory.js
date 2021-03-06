const Type = require("./Type");
const LegalPersonDataFactory = require("./LegalPersonDataFactory");
const PersonDataFactory = require("./PersonDataFactory");

module.exports = class CustomerFactory {
    static create(){
        return{
            _id: null,
            Deletable: true,
            Type: Type.Person,
            PersonData: PersonDataFactory.create(),
            LegalPersonData: LegalPersonDataFactory.create(),
            Addresses:[],
            Contacts:[]
        };
    }
}