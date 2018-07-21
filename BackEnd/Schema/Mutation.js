const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const Customers = require("./Trading/Customers/Mutation");

module.exports = new GraphQLObjectType({
    name: "Mutation",
    fields:{
      insertCustomer: Customers.insert,
      updateCustomer: Customers.update,
      deleteCustomer: Customers.delete
    }
  });