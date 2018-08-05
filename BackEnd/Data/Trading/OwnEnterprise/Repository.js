const Model = require("./Model").get();
const Errors = require("../../../Errors");
const Repository = require("../../Repository");

class OwnEnterpriseRepository extends Repository{
    constructor(){
        super(Model, Errors.Trading.OwnEnterprise);
    }
}
module.exports = OwnEnterpriseRepository;