const Model = require("./Model").get();
const Errors = require("../../../Errors");
const Repository = require("../../Repository");

class TownsRepository extends Repository{
    constructor(){
        super(Model, Errors.Geographics.Towns);
    }
}
module.exports = TownsRepository;