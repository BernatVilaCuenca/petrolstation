const Store = require('../../../stores/Trading/Customers');
const Actions = require('./Actions');

class CustomersDispatcher{
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
module.exports = CustomersDispatcher;