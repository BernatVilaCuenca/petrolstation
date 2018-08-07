const { GraphQLID, GraphQLBoolean, GraphQLString, GraphQLObjectType } = require("graphql");
const DepartmentObjectType = require("../../Geographics/Departments/ObjectType");
const TownObjectType = require("../../Geographics/Towns/ObjectType");

module.exports = new GraphQLObjectType({
    name:"Address",
    fields:()=>({
        _id : { type: GraphQLID },
        Deletable: { type: GraphQLBoolean},
        DepartmentId: { type: GraphQLString },
        Department: { 
            type: DepartmentObjectType,
            resolve(parent, args){
                let globalResult = 
                    global.departmentsService.getOne(parent.DepartmentId)
                    .then(function(result){ return (result && result.success) ? result.data : null; })
                    .catch(function(result){ return null; });
                return globalResult;
            }
        },
        TownId: { type: GraphQLString },
        Town: { 
            type: TownObjectType,
            resolve(parent, args){
                let globalResult = 
                    global.townsService.getOne(parent.TownId)
                    .then(function(result){ return (result && result.success) ? result.data : null; })
                    .catch(function(result){ return null; });
                return globalResult;
            }
        },
        PostCode : { type: GraphQLString },
        StreetName : { type: GraphQLString },
        HouseNumber : { type: GraphQLString },
        FlatNumber : { type: GraphQLString },
        Door : { type: GraphQLString },
        Others : { type: GraphQLString },
        CompleteAddress : { type: GraphQLString }
    })
});