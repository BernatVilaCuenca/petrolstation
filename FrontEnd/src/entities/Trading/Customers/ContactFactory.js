const StringUtils = require("../../../utils/String");

module.exports = class ContactFactory {
    static create(){
        return{
            Name: StringUtils.Empty,
            Surname: StringUtils.Empty,
            CompleteName: StringUtils.Empty,
            Phone: StringUtils.Empty,
            Email: StringUtils.Empty,
            DocumentId: StringUtils.Empty
        };
    }
}