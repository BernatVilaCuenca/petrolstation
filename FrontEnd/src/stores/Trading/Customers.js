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
                        CompleteName
                        Phone
                        Email
                        DocumentId
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
    getOne(data){
        global.apiClient.query(
            `query customer($id: ID){ 
                customer (id: $id){
                    success
                    errors
                    data {
                        _id
                        Type
                      PersonData {
                        Name
                        Surname
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
                      Addresses {
                        IsDefault
                        DepartmentId
                        TownId
                        PostCode
                        StreetName
                        HouseNumber
                        FlatNumber
                        Door
                        Others
                      }
                      Contacts {
                        Name
                        Surname
                        Phone
                        Email
                        DocumentId
                      }
                    }
                }
            }`,
            { id: data },
            function(result){
                if(result && result.data && result.data.customer){
                    result = result.data.customer;
                    if(result.success)
                        global.eventManager.emit(CustomersEvents.GetOne, result.data);
                    else
                        global.eventManager.emit(NotificatorEvents.Notificate, result.errors);
                }                
            },
            function(result){
                global.eventManager.emit(NotificatorEvents.Notificate, result.errors);
            }
        );
    }
    insert(data){

    }
    update(data){

    }
    delete(data){

    }
}
module.exports = CustomersStore;
