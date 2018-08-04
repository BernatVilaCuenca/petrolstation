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
                    { id:`Address_DepartmentId_${index}`, dataType: DataTypes.String, requirementType: RequirementTypes.Required },
                    { id:`Address_TownId_${index}`, dataType: DataTypes.String, requirementType: RequirementTypes.Required },
                    { id:`Address_PostCode_${index}`, dataType: DataTypes.String, requirementType: RequirementTypes.Required },
                    { id:`Address_StreetName_${index}`, dataType: DataTypes.String, requirementType: RequirementTypes.Required },
                    { id:`Address_HouseNumber_${index}`, dataType: DataTypes.String, requirementType: RequirementTypes.Required }
                ]); 
            }

        if(item.Contacts)
            for(let index in item.Contacts){
                controls = controls.concat([
                    { id:`Contacts_Name_${index}`, dataType: DataTypes.String, requirementType: RequirementTypes.Required },
                    { id:`Contacts_Surname_${index}`, dataType: DataTypes.String, requirementType: RequirementTypes.Required },
                    { id:`Contacts_DocumentId_${index}`, dataType: DataTypes.String, requirementType: RequirementTypes.Required },
                    { id:`Contacts_Phone_${index}`, dataType: DataTypes.Numeric, requirementType: RequirementTypes.Required },
                    { id:`Contacts_Email_${index}`, dataType: DataTypes.Email, requirementType: RequirementTypes.Optional }
                ]); 
            }
        let result = Validator.Validate(controls);
        return result;
    }
};