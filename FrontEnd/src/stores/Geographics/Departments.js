const DepartmentsEvents = require('../../events/Geographics/Departments');
const NotificatorEvents = require('../../events/Notificator');

class DepartmentsStore{
    getAll(){
        global.apiClient.request(
            `{ 
                departments {
                    success
                    errors
                    data {
                        _id
                        Name
                        Towns{
                            _id
                            Name
                        }
                    }
                }
            }`,
            { },
            function(result){
                if(result && result.data && result.data.departments){
                    result = result.data.departments;
                    if(result.success)
                        global.eventManager.emit(DepartmentsEvents.GetAll, result.data);
                    else
                        global.eventManager.emit(NotificatorEvents.Notificate, result.errors);
                }                                
            },
            function(result){
                global.eventManager.emit(NotificatorEvents.Notificate, result.errors);
            }
        );        
    }
}
module.exports = DepartmentsStore;
