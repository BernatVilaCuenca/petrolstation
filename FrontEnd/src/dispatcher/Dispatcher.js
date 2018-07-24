const CustomersDispatcher = require('../dispatcher/Trading/Customers/Dispatcher');
const Modules = require('./Modules');

class Dispatcher {
    constructor(){
        this.customersDispatcher = new CustomersDispatcher();
    }
    dispatch(actionRequest){
        if(actionRequest==null)return;
        switch(actionRequest.module){
            case Modules.Customers:
                this.customersDispatcher.dispatch(actionRequest);
            break;
            default:
            break;
        }
    }
}
module.exports = Dispatcher;