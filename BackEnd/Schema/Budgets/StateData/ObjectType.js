const { GraphQLString, GraphQLList, GraphQLObjectType } = require("graphql");
const StateStoryElement = require("../StateStoryElement/ObjectType");

module.exports = new GraphQLObjectType({
    name:"StateData",
    fields:()=>({
        StateName: { type: GraphQLString },
        StateStory: { type: new GraphQLList(StateStoryElement) }
    })
});