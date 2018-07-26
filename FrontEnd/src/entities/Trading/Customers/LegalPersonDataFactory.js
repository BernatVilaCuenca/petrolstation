const StringUtils = require("../../../utils/String");

module.exports = class LegalPersonDataFactory {
    static create(){
        return {
            BusinessName: StringUtils.Empty,
            Phone: StringUtils.Empty,
            Email: StringUtils.Empty,
            DocumentId: StringUtils.Empty
        };
    }
};