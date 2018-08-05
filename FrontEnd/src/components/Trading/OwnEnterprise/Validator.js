const Validator = require("../../../validator/Validator");
const DataTypes = require("../../../validator/DataTypes");
const RequirementTypes = require("../../../validator/RequirementTypes");

module.exports = class CustomerValidator {
    static Validate(){
        let addressIndex = 0;
        let controls = [
            { id:'CompleteName', dataType: DataTypes.String, requirementType: RequirementTypes.Required },
            { id:'TradingName', dataType: DataTypes.String, requirementType: RequirementTypes.Required },
            { id:'Phone', dataType: DataTypes.Numeric, requirementType: RequirementTypes.Required },
            { id:'DocumentId', dataType: DataTypes.String, requirementType: RequirementTypes.Required },
            { id:'Email', dataType: DataTypes.Email, requirementType: RequirementTypes.Required },
            { id:'Bank', dataType: DataTypes.String, requirementType: RequirementTypes.Required },            
            { id:`Address_DepartmentId_${addressIndex}`, dataType: DataTypes.String, requirementType: RequirementTypes.Required },
            { id:`Address_TownId_${addressIndex}`, dataType: DataTypes.String, requirementType: RequirementTypes.Required },
            { id:`Address_PostCode_${addressIndex}`, dataType: DataTypes.String, requirementType: RequirementTypes.Required },
            { id:`Address_StreetName_${addressIndex}`, dataType: DataTypes.String, requirementType: RequirementTypes.Required },
            { id:`Address_HouseNumber_${addressIndex}`, dataType: DataTypes.String, requirementType: RequirementTypes.Required }
        ];
        for(let i=0; i<6; i ++)
            controls.push({ 
                id:`DetailedNumber_${i}`, dataType: DataTypes.String, requirementType: RequirementTypes.Required }
            );
        let result = Validator.Validate(controls);
        return result;
    }
};