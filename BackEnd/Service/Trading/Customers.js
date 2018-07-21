const Service = require("../Service");
const Errors = require("../../Errors");

class CustomersService extends Service{
    constructor(repository){
        super(repository, Errors.Trading.Customers);
    }
}
module.exports = CustomersService;