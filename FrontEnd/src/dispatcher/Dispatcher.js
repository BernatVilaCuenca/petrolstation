const EmployeesDispatcher = require('../dispatcher/humanResources/Employees/Dispatcher');
const Modules = require('./Modules');

class Dispatcher {
    constructor(){
        this.employeesDispatcher = new EmployeesDispatcher();
    }
    dispatch(actionRequest){
        if(actionRequest==null)return;
        switch(actionRequest.module){
            case Modules.Employees:
                this.employeesDispatcher.dispatch(actionRequest);
            break;
            default:
            break;
        }
    }
}
module.exports = Dispatcher;