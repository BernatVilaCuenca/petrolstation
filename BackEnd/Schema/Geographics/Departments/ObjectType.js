const graphQL = require("graphql");
const { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLID,
    GraphQLList
} = graphQL;
const TownObjectType = require("../Towns/ObjectType");

module.exports = new GraphQLObjectType({
    name:"Department",
    fields:()=>({
      _id : { type: GraphQLID },
      Name : { type: GraphQLString },
      Towns: {
        type: new GraphQLList(TownObjectType),
        resolve(parent, args){
            let globalResult = 
                global.townsService.getAll({Department: parent._id})
                .then(function(result){ return (result && result.success) ? result.data : null; })
                .catch(function(result){ return null; });
            return globalResult;
        }
      }
    })
});