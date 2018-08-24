const CustomersDispatcher = require('../dispatcher/Trading/Customers/Dispatcher');
const DepartmentsDispatcher = require('../dispatcher/Geographics/Departments/Dispatcher');
const OwnEnterpriseDispatcher = require('../dispatcher/Trading/OwnEnterprise/Dispatcher');
const BudgetsDispatcher = require('../dispatcher/Budgets/Budgets/Dispatcher');
const Modules = require('./Modules');

class Dispatcher {
    constructor(){
        this.customersDispatcher = new CustomersDispatcher();
        this.departmentsDispatcher = new DepartmentsDispatcher();
        this.ownEnterpriseDispatcher = new OwnEnterpriseDispatcher();
        this.budgetsDispatcher = new BudgetsDispatcher();
    }
    dispatch(actionRequest){
        if(actionRequest == null) return;
        switch(actionRequest.module){
            case Modules.Customers:
                this.customersDispatcher.dispatch(actionRequest);
            break;
            case Modules.Departments:
                this.departmentsDispatcher.dispatch(actionRequest);
            break;
            case Modules.OwnEnterprise:
                this.ownEnterpriseDispatcher.dispatch(actionRequest);
            break;
            case Modules.Budgets:
                this.budgetsDispatcher.dispatch(actionRequest);
            break;
            default:
            break;
        }
    }
}
module.exports = Dispatcher;