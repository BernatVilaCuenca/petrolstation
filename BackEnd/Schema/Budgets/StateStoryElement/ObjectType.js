const { GraphQLString, GraphQLObjectType } = require("graphql");
const { GraphQLDate } = require('graphql-iso-date');

const SendMailData = require("../SendMailData/ObjectType");

module.exports = new GraphQLObjectType({
    name:"StateStoryElement",
    fields:()=>({
        StateName: { type: GraphQLString },
        StateDate: { type: GraphQLDate },
        SendMailData: { type: SendMailData }
    })
});