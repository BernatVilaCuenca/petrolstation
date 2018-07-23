const Store = require('../../../stores/humanResources/Employees');
const Actions = require('./Actions');

class EmployeesDispatcher{
    constructor(){
        this.store = new Store();
    }
    dispatch(actionRequest){
        if(actionRequest==null)return;
        switch (actionRequest.action){
            case Actions.GetAll:
                this.store.getAll();
            break;
            case Actions.GetOne:
            break;
            case Actions.Insert:
            break;
            case Actions.Update:
            break;
            case Actions.Delete:
            break;
            default:
            break;
        }
    }
}
module.exports = EmployeesDispatcher;