const Model = require("./Model").get();
const Errors = require("../../../Errors");
const Repository = require("../../Repository");

class DepartmentsRepository extends Repository{
    constructor(){
        super(Model, Errors.Geographics.Departments);
    }
}
module.exports = DepartmentsRepository;