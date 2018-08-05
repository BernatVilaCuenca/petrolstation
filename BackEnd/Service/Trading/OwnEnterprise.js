const ItemService = require("../ItemService");
const Errors = require("../../Errors");

class OwnEnterpriseService extends ItemService{
    constructor(repository){
        super(repository, Errors.Trading.OwnEnterprise);
    }
}
module.exports = OwnEnterpriseService;