const _ = require('lodash');

const graphQL = require("graphql");
const { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = graphQL;
const { GraphQLDate } = require('graphql-iso-date');

const ChapterObjectType = require("./Chapter/ObjectType");
const AmountsObjectType = require("./Amounts/ObjectType");
const StateStoryElementObjectType = require("./StateStoryElement/ObjectType");
const CustomerObjectType = require("../Trading/Customers/SingleResultObjectType");
const AddressObjectType = require("../Shared/Address/ObjectType");

module.exports = new GraphQLObjectType({
    name:"Budget",
    fields:()=>(
        {
            _id : { type: GraphQLID },
            BudgetNumber: { type: new GraphQLNonNull(GraphQLString) },
            BudgetDate: { type: new GraphQLNonNull(GraphQLDate) },
            CustomerId: { type: new GraphQLNonNull(GraphQLID) },
            AddressId: { type: new GraphQLNonNull(GraphQLID) },
            Title: { type: GraphQLString },
            Description: { type: GraphQLString },
            Footer: { type: GraphQLString },
            Chapters: { type: new GraphQLList(ChapterObjectType) },
            Amounts: { type: AmountsObjectType },
            StateStory: { type: new GraphQLList(StateStoryElementObjectType) },

            Customer: {
                type: CustomerObjectType,
                resolve(parent, args){
                    let globalResult = 
                        global.customersService.getOne(parent.CustomerId)
                        .then(function(result){ return (result && result.success) ? result.data : null; })
                        .catch(function(){ return null; });
                    return globalResult;
                }
            },
            Address: {
                type: AddressObjectType,
                resolve(parent, args){
                    let globalResult = 
                        global.customersService.getOne(parent.CustomerId)
                        .then(
                            function(result){                             
                                if (result && result.success) {
                                    let customer = result.data;
                                    let address = _.find (
                                        customer.Addresses, 
                                        function(address) {
                                            return address._id.toString() == parent.AddressId.toString();
                                        }
                                    );
                                    return address ? address : null;
                                } else 
                                    return null;
                            }
                        )
                        .catch(function(){ return null; });
                    return globalResult;
                }
            }
        }
    )
});