const graphQL = require("graphql");
const { 
    GraphQLID,
} = graphQL;

const MultipleResult = require("./MultipleResult");
const SingleResult = require("./SingleResult");

module.exports = {
  getAll:{
    type: MultipleResult,
    resolve(parent, args){
      let globalResult = 
          global.customersService.getAll({})
          .then(function(result){ return result; })
          .catch(function(result){ return result; });
      return globalResult;
    }
  },
  getOne:{
    type: SingleResult,
    args: {id: {type: GraphQLID}},
    resolve(parent,args){
      let globalResult = 
          global.customersService.getOne(args.id)
          .then(function(result){ return result; })
          .catch(function(result){ return result; });
      return globalResult;
    }
  }
};