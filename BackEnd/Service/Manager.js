const DepartmentsRepository = require("../Data/Geographics/Departments/Repository");
const TownsRepository = require("../Data/Geographics/Towns/Repository");
const CustomersRepository = require("../Data/Trading/Customers/Repository");

const DepartmentsService = require("./Geographics/Departments");
const TownsService = require("./Geographics/Towns");
const CustomersService = require("./Trading/Customers");

class ServiceManager{
    static Init(){
        const departmentsRepository = new DepartmentsRepository();
        const townsRepository = new TownsRepository();
        const customersRepository = new CustomersRepository();
        
        global.departmentsService = new DepartmentsService(departmentsRepository);
        global.townsService = new TownsService(townsRepository);
        global.customersService = new CustomersService(customersRepository);
    }
}
module.exports = ServiceManager;