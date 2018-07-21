const Service = require("../Service");
const Errors = require("../../Errors");

class DepartmentsService extends Service{
    constructor(repository){
        super(repository, Errors.Geographics.Departments);
    }
}
module.exports = DepartmentsService;