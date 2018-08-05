const Store = require('../../../stores/Trading/OwnEnterprise');
const Actions = require('./Actions');

class OwnEnterpriseDispatcher{
    constructor(){
        this.store = new Store();
    }
    dispatch(actionRequest){
        if(actionRequest == null)return;
        switch (actionRequest.action){
            case Actions.GetOne:
                this.store.getOne();
            break;
            case Actions.Update:
                this.store.update(actionRequest.data);
            break;
            default:
            break;
        }
    }
}
module.exports = OwnEnterpriseDispatcher;