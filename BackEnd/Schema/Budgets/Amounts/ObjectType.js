const { GraphQLObjectType } = require("graphql");
const AmountObjectType = require("../Amount/ObjectType");

module.exports = new GraphQLObjectType({
    name:"Amounts",
    fields:()=>({
        Total : { type: AmountObjectType }
    })
});