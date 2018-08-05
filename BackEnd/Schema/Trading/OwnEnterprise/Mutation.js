const SingleResult = require("./SingleResult");
const InputObjectType = require("./InputObjectType");

module.exports = {
    update:{
        type: SingleResult,
        args:{
            OwnEnterprise: {type: InputObjectType}
        },
        resolve(parent, args){            
            let item = args.OwnEnterprise;
            let globalResult = 
                global.ownEnterpriseService.update(item)
                .then(function(result){ return result; })
                .catch(function(result){ return result; });
            return globalResult;           
        }
    }
};