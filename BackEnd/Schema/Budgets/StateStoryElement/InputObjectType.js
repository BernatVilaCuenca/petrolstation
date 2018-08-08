const { GraphQLString, GraphQLInputObjectType } = require("graphql");
const SendMailDataInput = require("../SendMailData/InputObjectType");

module.exports = new GraphQLInputObjectType({
    name:"StateStoryElementInput",
    fields:()=>({
        StateName: { type: GraphQLString },
        StateDate: { type: GraphQLString },
        SendMailData: { type: SendMailDataInput }
    })
});