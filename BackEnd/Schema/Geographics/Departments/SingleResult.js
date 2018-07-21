const graphQL = require("graphql");
const { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLList,
    GraphQLBoolean
} = graphQL;
const DepartmentObjectType = require("./ObjectType");

module.exports = new GraphQLObjectType({
    name:"SingleDepartmentResult",
    fields:()=>({
      success : { type: GraphQLBoolean },
      data : { type: DepartmentObjectType },
      errors : { type: new GraphQLList(GraphQLString) }
    })
});