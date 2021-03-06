const StringUtils = require("../../utils/String");

module.exports = class AddressFactory {
    static create(){
        return{
            Deletable: true,
            DepartmentId: StringUtils.Empty,
            TownId: StringUtils.Empty,
            PostCode: StringUtils.Empty,
            StreetName: StringUtils.Empty,
            HouseNumber: StringUtils.Empty,
            FlatNumber: StringUtils.Empty,
            Door: StringUtils.Empty,
            Others: StringUtils.Empty
        };
    }
}