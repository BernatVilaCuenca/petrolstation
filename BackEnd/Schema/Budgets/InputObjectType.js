const { 
    GraphQLInputObjectType, 
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull    
} = require("graphql");

const ChapterInputObjectType = require("./Chapter/InputObjectType");
const AmountsInputObjectType = require("./Amounts/InputObjectType");
const StateStoryElementInputObjectType = require("./StateStoryElement/InputObjectType");

module.exports = new GraphQLInputObjectType({
    name:"BudgetInput",
    fields:()=>(
        {
            _id : { type: GraphQLID },
            BudgetNumber: { type: new GraphQLNonNull(GraphQLString) },
            BudgetDate: { type: new GraphQLNonNull(GraphQLString) },
            CustomerId: { type: new GraphQLNonNull(GraphQLID) },
            AddressId: { type: new GraphQLNonNull(GraphQLID) },
            Title: { type: GraphQLString },
            Description: { type: GraphQLString },
            Footer: { type: GraphQLString },
            Chapters: { type: new GraphQLList(ChapterInputObjectType) },
            Amounts: { type: AmountsInputObjectType },
            StateStory: { type: new GraphQLList(StateStoryElementInputObjectType) }
        }
    )
});