const graphQL = require("graphql");
const { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLID,
    GraphQLNonNull
} = graphQL;

const AmountsObjectType = require("./Amounts/ObjectType");
const StateStoryElementObjectType = require("./StateStoryElement/ObjectType");

module.exports = new GraphQLObjectType({
    name:"BudgetList",
    fields:()=>(
        {
            _id : { type: GraphQLID },
            BudgetNumber: { type: new GraphQLNonNull(GraphQLString) },
            BudgetDate: { type: new GraphQLNonNull(GraphQLString) },
            CustomerCompleteName: { type: GraphQLString },
            CompleteAddress: { type: GraphQLString },
            Title: { type: GraphQLString },
            Amounts: { type: AmountsObjectType },
            StateStory: { type: new GraphQLList(StateStoryElementObjectType) }
        }
    )
});