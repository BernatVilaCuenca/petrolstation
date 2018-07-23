const Events = require('../../events/humanResources/Employees');

class EmployeesStore{
    constructor(){
        this.data = [
            { 
                id:6,
                name:'Bernat', 
                surname:'Vila', 
                age:35
            },{ 
                id:7,
                name:'Alex', 
                surname:'Mas', 
                age:36
            },{ 
                id:8,
                name:'David', 
                surname:'Garcia', 
                age:42
            }
        ];
    }
    getAll(){
        global.eventManager.emit(Events.GetAll, this.data);
    }
}
module.exports = EmployeesStore;