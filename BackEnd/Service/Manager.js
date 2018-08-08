const DepartmentsRepository = require("../Data/Geographics/Departments/Repository");
const TownsRepository = require("../Data/Geographics/Towns/Repository");
const CustomersRepository = require("../Data/Trading/Customers/Repository");
const CustomersListRepository = require("../Data/Trading/CustomersList/Repository");
const OwnEnterpriseRepository = require("../Data/Trading/OwnEnterprise/Repository");
const BudgetsRepository = require("../Data/Budgets/Budgets/Repository");
const BudgetsListRepository = require("../Data/Budgets/BudgetsList/Repository");

const DepartmentsService = require("./Geographics/Departments");
const TownsService = require("./Geographics/Towns");
const CustomersService = require("./Trading/Customers");
const OwnEnterpriseService = require("./Trading/OwnEnterprise");
const BudgetsService = require("./Budgets/Budgets");

class ServiceManager{
    static Init(){
        const departmentsRepository = new DepartmentsRepository();
        const townsRepository = new TownsRepository();
        const customersRepository = new CustomersRepository();
        const customersListRepository = new CustomersListRepository();
        const ownEnterpriseRepository = new OwnEnterpriseRepository();
        const budgetsRepository = new BudgetsRepository();
        const budgetsListRepository = new BudgetsListRepository();
        
        global.departmentsService = new DepartmentsService(departmentsRepository);
        global.townsService = new TownsService(townsRepository);
        global.customersService = new CustomersService(customersRepository, customersListRepository);
        global.ownEnterpriseService = new OwnEnterpriseService(ownEnterpriseRepository);
        global.budgetsService = new BudgetsService(budgetsRepository, budgetsListRepository, customersRepository);
    }
}
module.exports = ServiceManager;