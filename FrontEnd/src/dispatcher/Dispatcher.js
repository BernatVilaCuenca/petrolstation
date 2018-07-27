const CustomersDispatcher = require('../dispatcher/Trading/Customers/Dispatcher');
const DepartmentsDispatcher = require('../dispatcher/Geographics/Departments/Dispatcher');
const Modules = require('./Modules');

class Dispatcher {
    constructor(){
        this.customersDispatcher = new CustomersDispatcher();
        this.departmentsDispatcher = new DepartmentsDispatcher();
    }
    dispatch(actionRequest){
        if(actionRequest==null)return;
        switch(actionRequest.module){
            case Modules.Customers:
                this.customersDispatcher.dispatch(actionRequest);
            break;
            case Modules.Departments:
                this.departmentsDispatcher.dispatch(actionRequest);
            break;
            default:
            break;
        }
    }
}
module.exports = Dispatcher;