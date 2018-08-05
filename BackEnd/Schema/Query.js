const { GraphQLObjectType } = require("graphql");
const Departments = require("./Geographics/Departments/Query");
const Customers = require("./Trading/Customers/Query");
const OwnEnterprise = require("./Trading/OwnEnterprise/Query");

module.exports = new GraphQLObjectType({
    name: "Query",
    fields:{
      departments: Departments.getAll,
      department: Departments.getOne,
      customers: Customers.getAll,
      customer: Customers.getOne,
      ownEnterprise: OwnEnterprise.getOne
    }
  });