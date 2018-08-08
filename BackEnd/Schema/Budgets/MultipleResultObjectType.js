const graphQL = require("graphql");
const { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
    GraphQLList
} = graphQL;
const { GraphQLDate } = require('graphql-iso-date');

const AmountsObjectType = require("./Amounts/ObjectType");
const StateStoryElementObjectType = require("./StateStoryElement/ObjectType");

module.exports = new GraphQLObjectType({
    name:"BudgetList",
    fields:()=>(
        {
            _id : { type: GraphQLID },
            BudgetNumber: { type: new GraphQLNonNull(GraphQLString) },
            BudgetDate: { type: new GraphQLNonNull(GraphQLDate) },
            CustomerCompleteName: { type: GraphQLString },
            CompleteAddress: { type: GraphQLString },
            Title: { type: GraphQLString },
            Amounts: { type: AmountsObjectType },
            StateStory: { type: new GraphQLList(StateStoryElementObjectType) }
        }
    )
});