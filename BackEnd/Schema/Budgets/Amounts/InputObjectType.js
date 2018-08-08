const { GraphQLInputObjectType } = require("graphql");
const AmountInputObjectType = require("../Amount/InputObjectType")

module.exports = new GraphQLInputObjectType({
    name:"AmountsInput",
    fields:()=>({
        Total : { type: AmountInputObjectType }
    })
});