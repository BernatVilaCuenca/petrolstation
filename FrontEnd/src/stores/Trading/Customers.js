const CustomersEvents = require('../../events/Trading/Customers');
const NotificatorEvents = require('../../events/Notificator');

class CustomersStore{
    getAll(){
        global.apiClient.query(
            `{ 
                customers {
                    success
                    errors
                    data {
                        _id
                        Type
                        PersonData {
                            Name
                            SurName
                            CompleteName
                            Phone
                            Email
                            DocumentId
                        }
                        LegalPersonData {
                            BusinessName
                            Phone
                            Email
                            DocumentId
                        }
                    }
                }
            }`,
            { },
            function(result){
                if(result && result.data && result.data.customers){
                    result = result.data.customers;
                    if(result.success)
                        global.eventManager.emit(CustomersEvents.GetAll, result.data);
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
module.exports = CustomersStore;
