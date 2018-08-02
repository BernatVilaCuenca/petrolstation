const ActionRequest = require('./dispatcher/ActionRequest');
const Modules = require('./dispatcher/Modules');
const Actions = require('./dispatcher/Geographics/Departments/Actions');
const Events = {
    Departments: require('./events/Geographics/Departments')
};

module.exports = class CommonDataLoader {
    static load(){
        global.departments = [];

        global.eventManager.on(
            Events.Departments.GetAll,
            function(result){
                global.departments = result;
            }
        );
        global.dispatcher.dispatch(new ActionRequest(Modules.Departments, Actions.GetAll));
    }
};