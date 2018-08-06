const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const Customers = require("./Trading/Customers/Mutation");
const OwnEnterprise = require("./Trading/OwnEnterprise/Mutation");
const Budgets = require("./Budgets/Budgets/Mutation");

module.exports = new GraphQLObjectType({
    name: "Mutation",
    fields:{
      insertCustomer: Customers.insert,
      updateCustomer: Customers.update,
      deleteCustomer: Customers.delete,
      updateOwnEnterprise: OwnEnterprise.update,
      insertBudget: Budgets.insert,
      updateBudget: Budgets.update,
      deleteBudget: Budgets.delete
    }
  });