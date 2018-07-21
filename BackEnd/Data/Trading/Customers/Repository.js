const Model = require("./Model").get();
const Errors = require("../../../Errors");
const Repository = require("../../Repository");

class CustomersRepository extends Repository{
    constructor(){
        super(Model, Errors.Trading.Customers);
    }
}
module.exports = CustomersRepository;