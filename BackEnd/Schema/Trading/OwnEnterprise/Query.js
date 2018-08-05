const graphQL = require("graphql");
const { 
    GraphQLID,
} = graphQL;

const SingleResult = require("./SingleResult");

module.exports = {
  getOne:{
    type: SingleResult,
    resolve(parent,args){
      let globalResult = 
          global.ownEnterpriseService.getAll({})
          .then(function(result){ 
            result.data = 
              Array.isArray(result.data) && result.data.length > 0 ?
              result.data[0]:
              null;
            return result; 
          })
          .catch(function(result){ return result; });
      return globalResult;
    }
  }
};