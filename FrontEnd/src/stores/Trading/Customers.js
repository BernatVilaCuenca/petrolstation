const CustomersEvents = require('../../events/Trading/Customers');
const NotificatorEvents = require('../../events/Notificator');
const multipleResultSchema = `{
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
}`;
const singleResultSchema = `{
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
}`;

module.exports = class CustomersStore{

    getAll(){
        global.apiClient.query(
            `{ customers ${multipleResultSchema}}`,
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
            `query customer($id: ID){ customer (id: $id) ${singleResultSchema} }`,
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
        global.apiClient.query(
            `mutation insertCustomer(
                $customer: CustomerInput
            ){ 
                insertCustomer (
                    Customer: $customer
                )
                ${singleResultSchema}
            }`,
            { 
                customer: data
            },
            function(result){
                if(result && result.data && result.data.customer){
                    result = result.data.customer;
                    if(result.success)
                        global.eventManager.emit(CustomersEvents.Insert, result.data);
                    else
                        global.eventManager.emit(NotificatorEvents.Notificate, result.errors);
                }                
            },
            function(result){
                global.eventManager.emit(NotificatorEvents.Notificate, result.errors);
            }
        );
    }
    update(data){
        global.apiClient.query(
            `mutation updateCustomer(
                $customer: CustomerInput
            ){ 
                updateCustomer (
                    Customer: $customer
                )
                ${singleResultSchema}
            }`,
            { 
                customer: data
            },
            function(result){
                if(result && result.data && result.data.customer){
                    result = result.data.customer;
                    if(result.success)
                        global.eventManager.emit(CustomersEvents.Update, result.data);
                    else
                        global.eventManager.emit(NotificatorEvents.Notificate, result.errors);
                }                
            },
            function(result){
                global.eventManager.emit(NotificatorEvents.Notificate, result.errors);
            }
        );
    }
    delete(data){
    }
}