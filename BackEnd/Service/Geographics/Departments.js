const ItemService = require("../ItemService");
const Errors = require("../../Errors");

class DepartmentsService extends ItemService{
    constructor(repository){
        super(repository, Errors.Geographics.Departments);
    }
}
module.exports = DepartmentsService;