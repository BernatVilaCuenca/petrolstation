const CustomersDispatcher = require('../dispatcher/Trading/Customers/Dispatcher');
const DepartmentsDispatcher = require('../dispatcher/Geographics/Departments/Dispatcher');
const OwnEnterpriseDispatcher = require('../dispatcher/Trading/OwnEnterprise/Dispatcher');
const Modules = require('./Modules');

class Dispatcher {
    constructor(){
        this.customersDispatcher = new CustomersDispatcher();
        this.departmentsDispatcher = new DepartmentsDispatcher();
        this.ownEnterpriseDispatcher = new OwnEnterpriseDispatcher();
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
            default:
            break;
        }
    }
}
module.exports = Dispatcher;