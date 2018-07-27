const Store = require('../../../stores/Geographics/Departments');
const Actions = require('./Actions');

class DepartmentsDispatcher{
    constructor(){
        this.store = new Store();
    }
    dispatch(actionRequest){
        if(actionRequest == null)return;
        switch (actionRequest.action){
            case Actions.GetAll:
                this.store.getAll();
            break;
            default:
            break;
        }
    }
}
module.exports = DepartmentsDispatcher;