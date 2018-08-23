const BudgetsEvents = require('../../events/Budgets/Budgets');
const NotificatorEvents = require('../../events/Notificator');
const multipleResultSchema = `{
    success
    errors
    data {
        _id
        BudgetNumber
        BudgetDate
        CustomerCompleteName
        CompleteAddress
        Title
        Amounts {
            Total {
                Quantity
            }
        }
        StateData {
            StateName
            StateStory {
                StateName
                StateDate
                SendMailData {
                    Destinations
                }
            }
        }
        Actions {
            Edit
            Delete
            Lock
            Reopen
            SendMail
        }
    }        
}`;
const singleResultSchema = `{
    success
    errors
    data {
        _id
        
    }
}`;

module.exports = class BudgetsStore{

    getAll(){
        global.apiClient.request(
            `{ budgets ${multipleResultSchema}}`,
            { },
            function(result){
                if(result && result.data && result.data.budgets){
                    result = result.data.budgets;
                    if(result.success)
                        global.eventManager.emit(BudgetsEvents.GetAll, result.data);
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
        global.apiClient.request(
            `query budget($id: ID){ budget (id: $id) ${singleResultSchema} }`,
            { id: data },
            function(result){
                if(result && result.data && result.data.budget){
                    result = result.data.budget;
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
        global.apiClient.request(
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
                if(result && result.data && result.data.insertCustomer){
                    result = result.data.insertCustomer;
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
        global.apiClient.request(
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
                if(result && result.data && result.data.updateCustomer){
                    result = result.data.updateCustomer;
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
        global.apiClient.request(
            `mutation deleteCustomer(
                $id: ID
            ){ 
                deleteCustomer (
                    id: $id
                )
                ${singleResultSchema}
            }`,
            { 
                id: data
            },
            function(result){
                if(result && result.data && result.data.deleteCustomer){
                    result = result.data.deleteCustomer;
                    if(result.success)
                        global.eventManager.emit(CustomersEvents.Delete, result.data);
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