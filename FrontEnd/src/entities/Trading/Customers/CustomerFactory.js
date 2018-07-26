const Type = require("./Type");
const StringUtils = require("../../../utils/String");

module.exports = class CustomerFactory {
    static create(){
        return{
            _id: null,
            Type: Type.Person,
            PersonData: {
                Name: StringUtils.Empty,
                Surname: StringUtils.Empty,
                CompleteName: StringUtils.Empty,
                Phone: StringUtils.Empty,
                Email: StringUtils.Empty,
                DocumentId: StringUtils.Empty
            },
            LegalPersonData: {
                BusinessName: StringUtils.Empty,
                Phone: StringUtils.Empty,
                Email: StringUtils.Empty,
                DocumentId: StringUtils.Empty
            },
            Addresses:[],
            Contacts:[]
        };
    }
}