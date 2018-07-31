const Validator = require("../../../validator/Validator");
const DataTypes = require("../../../validator/DataTypes");
const RequirementTypes = require("../../../validator/RequirementTypes");

module.exports = class CustomerValidator {
    static Validate(){
        let controls = [
            { id:'Type', dataType: DataTypes.String, requirementType: RequirementTypes.Required }
        ];
        let result = Validator.Validate(controls);
        return result;
    }
};