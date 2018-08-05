const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const Customers = require("./Trading/Customers/Mutation");
const OwnEnterprise = require("./Trading/OwnEnterprise/Mutation");

module.exports = new GraphQLObjectType({
    name: "Mutation",
    fields:{
      insertCustomer: Customers.insert,
      updateCustomer: Customers.update,
      deleteCustomer: Customers.delete,
      updateOwnEnterprise: OwnEnterprise.update
    }
  });