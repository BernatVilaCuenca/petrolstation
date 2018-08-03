const { GraphQLID } = require("graphql");
const SingleResult = require("./SingleResult");
const CustomerInputObjectType = require("./InputObjectType");

module.exports = {
    insert:{
        type: SingleResult,
        args:{
            Customer: {type: CustomerInputObjectType}
        },
        resolve(parent, args){            
            let item = args.Customer;
            let globalResult = 
                global.customersService.insert(item)
                .then(function(result){ return result; })
                .catch(function(result){ return result; });
            return globalResult;           
        }
    },
    update:{
        type: SingleResult,
        args:{
            Customer: {type: CustomerInputObjectType}
        },
        resolve(parent, args){            
            let item = args.Customer;
            let globalResult = 
                global.customersService.update(item)
                .then(function(result){ return result; })
                .catch(function(result){ return result; });
            return globalResult;           
        }
    },
    delete:{
        type: SingleResult,
        args:{
            id : { type: GraphQLID }
        },
        resolve(parent, args){            
            let globalResult = 
                global.customersService.delete(args.id)
                .then(function(result){ return result; })
                .catch(function(result){ return result; });
            return globalResult;           
        }
    }
};