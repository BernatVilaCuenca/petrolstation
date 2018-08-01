const Validator = require("../../../validator/Validator");
const DataTypes = require("../../../validator/DataTypes");
const RequirementTypes = require("../../../validator/RequirementTypes");
const Type = require("../../../entities/Trading/Customers/Type");

module.exports = class CustomerValidator {
    static Validate(item){
        let controls = [
            { id:'Type', dataType: DataTypes.String, requirementType: RequirementTypes.Required }
        ];
        if(item.Type === Type.Person)
            controls = controls.concat([
                { id:'PersonData_Name', dataType: DataTypes.String, requirementType: RequirementTypes.Required },
                { id:'PersonData_Surname', dataType: DataTypes.String, requirementType: RequirementTypes.Required },
                { id:'PersonData_Phone', dataType: DataTypes.Numeric, requirementType: RequirementTypes.Required },
                { id:'PersonData_DocumentId', dataType: DataTypes.String, requirementType: RequirementTypes.Required },
                { id:'PersonData_Email', dataType: DataTypes.Email, requirementType: RequirementTypes.Optional }
            ]);
        else if(item.Type === Type.LegalPerson)
            controls = controls.concat([
                { id:'LegalPersonData_BusinessName', dataType: DataTypes.String, requirementType: RequirementTypes.Required },
                { id:'LegalPersonData_Phone', dataType: DataTypes.Numeric, requirementType: RequirementTypes.Required },
                { id:'LegalPersonData_DocumentId', dataType: DataTypes.String, requirementType: RequirementTypes.Required },
                { id:'LegalPersonData_Email', dataType: DataTypes.Email, requirementType: RequirementTypes.Optional }
            ]);
        
        if(item.Addresses)
            for(let index in item.Addresses){
                controls = controls.concat([
                    { id:`Address_DepartmentId${index}`, dataType: DataTypes.String, requirementType: RequirementTypes.Required },
                    { id:`Address_TownId${index}`, dataType: DataTypes.String, requirementType: RequirementTypes.Required },
                    { id:`Address_PostCode${index}`, dataType: DataTypes.String, requirementType: RequirementTypes.Required },
                    { id:`Address_StreetName${index}`, dataType: DataTypes.String, requirementType: RequirementTypes.Required },
                    { id:`Address_HouseNumber${index}`, dataType: DataTypes.String, requirementType: RequirementTypes.Required }
                ]); 
            }

        if(item.Contacts)
            for(let index in item.Contacts){
                controls = controls.concat([
                    { id:`Contacts_Name${index}`, dataType: DataTypes.String, requirementType: RequirementTypes.Required },
                    { id:`Contacts_Surname${index}`, dataType: DataTypes.String, requirementType: RequirementTypes.Required },
                    { id:`Contacts_DocumentId${index}`, dataType: DataTypes.String, requirementType: RequirementTypes.Required },
                    { id:`Contacts_Phone${index}`, dataType: DataTypes.Numeric, requirementType: RequirementTypes.Required },
                    { id:`Contacts_Email${index}`, dataType: DataTypes.Email, requirementType: RequirementTypes.Optional }
                ]); 
            }
        let result = Validator.Validate(controls);
        return result;
    }
};