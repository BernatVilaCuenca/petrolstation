const Service = require("../Service");
const Errors = require("../../Errors");

class TownsService extends Service{
    constructor(repository){
        super(repository, Errors.Geographics.Towns);
    }
}
module.exports = TownsService;