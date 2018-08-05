const StringUtils = require("../../../utils/String");

module.exports = class OwnEnterpriseFactory {
    static create(){
        return {
            _id: null,
            CompleteName: StringUtils.Empty,
            TradingName: StringUtils.Empty,
            Phone: StringUtils.Empty,
            Email: StringUtils.Empty,
            DocumentId: StringUtils.Empty,
            Account: {
                Bank: StringUtils.Empty,
                DetailedNumber: [
                    StringUtils.Empty, StringUtils.Empty, StringUtils.Empty,
                    StringUtils.Empty, StringUtils.Empty, StringUtils.Empty
                ]
            },
            Address: {
                DepartmentId: StringUtils.Empty,
                TownId: StringUtils.Empty,
                PostCode: StringUtils.Empty,
                StreetName: StringUtils.Empty,
                HouseNumber: StringUtils.Empty,
                FlatNumber: StringUtils.Empty,
                Door: StringUtils.Empty,
                Others: StringUtils.Empty
            }
        };
    }
};