const ItemService = require("../ItemService");
const Errors = require("../../Errors");

class TownsService extends ItemService{
    constructor(repository){
        super(repository, Errors.Geographics.Towns);
    }
}
module.exports = TownsService;