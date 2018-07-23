class ActionRequest{
    constructor(module, action, data){
        this.module = module;
        this.action = action;
        this.data = data;
    }
}
module.exports = ActionRequest;