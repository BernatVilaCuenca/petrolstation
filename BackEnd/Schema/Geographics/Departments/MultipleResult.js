const graphQL = require("graphql");
const { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLList,
    GraphQLBoolean
} = graphQL;
const DepartmentObjectType = require("./ObjectType");

module.exports  = new GraphQLObjectType({
    name:"MultipleDepartmentResult",
    fields:()=>({
      success : { type: GraphQLBoolean },
      data : { type: new GraphQLList(DepartmentObjectType) },
      errors : { type: new GraphQLList(GraphQLString) }
    })
});