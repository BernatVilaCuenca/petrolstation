const { GraphQLID } = require("graphql");
const SingleResult = require("./SingleResult");
const BudgetInputObjectType = require("./InputObjectType");

module.exports = {
    insert:{
        type: SingleResult,
        args:{
            Budget: {type: BudgetInputObjectType}
        },
        resolve(parent, args){            
            let item = args.Budget;
            let globalResult = 
                global.budgetsService.insert(item)
                .then(function(result){ return result; })
                .catch(function(result){ return result; });
            return globalResult;           
        }
    },
    update:{
        type: SingleResult,
        args:{
            Budget: {type: BudgetInputObjectType}
        },
        resolve(parent, args){            
            let item = args.Budget;
            let globalResult = 
                global.budgetsService.update(item)
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
                global.budgetsService.delete(args.id)
                .then(function(result){ return result; })
                .catch(function(result){ return result; });
            return globalResult;           
        }
    }
};