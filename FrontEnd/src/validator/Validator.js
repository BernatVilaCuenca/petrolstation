const DataTypes = require("./DataTypes");
const RequirementTypes = require("./RequirementTypes");
const StringUtils = require("../utils/String");
const DateUtils = require("../utils/Date");

module.exports = class Validator {
    static Validate(controls){
        let isValid=true;
        if(controls){
            for(let i=0; i<controls.length; i++){            
                let control = controls[i];
                let value = document.getElementById(control.id).value;
                let controlValid=true;
                if(StringUtils.IsNullOrEmpty(value)){
                    controlValid = (control.requirementType == RequirementTypes.OPTIONAL);
                }else{
                    switch(control.dataType) {
                        case DataTypes.NUMERIC:                    
                            value = parseFloat(value);
                            controlValid = (!isNaN(value));
                        break;
                        case DataTypes.STRING:
                            controlValid = true;
                        break;
                        case DataTypes.DATE:
                            let parts = value.split("/");
                            let year = parseInt(parts[2], 10);
                            let month = parseInt(parts[1], 10) - 1;
                            let day = parseInt(parts[0], 10);
                            controlValid = DateUtils.isValidDate(day, month, year);
                        break;
                        case DataTypes.EMAIL:
                            let regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            controlValid = regularExpression.test(value);
                        break;
                    }
                }
                if(controlValid){
                    document.getElementById(control.id).style.backgroundColor ="#FFFFFF"
                } else {
                    document.getElementById(control.id).style.backgroundColor ="#F2D8D8"
                }
                isValid = isValid && controlValid;
            }
        }
        return isValid;
    };
};