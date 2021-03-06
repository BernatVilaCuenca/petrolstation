const Store = require('../../../stores/Trading/Customers');
const Actions = require('./Actions');

class CustomersDispatcher{
    constructor(){
        this.store = new Store();
    }
    dispatch(actionRequest){
        if(actionRequest == null)return;
        switch (actionRequest.action){
            case Actions.GetAll:
                this.store.getAll();
            break;
            case Actions.GetOne:
                this.store.getOne(actionRequest.data);
            break;
            case Actions.Insert:
                this.store.insert(actionRequest.data);
            break;
            case Actions.Update:
                this.store.update(actionRequest.data);
            break;
            case Actions.Delete:
                this.store.delete(actionRequest.data);
            break;
            default:
            break;
        }
    }
}
module.exports = CustomersDispatcher;