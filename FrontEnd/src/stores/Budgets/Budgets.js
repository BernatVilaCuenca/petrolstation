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
        BudgetNumber
        BudgetDate
        CustomerId
        AddressId
        Title
        Description
        Footer
        Chapters{
            Description
            Quantity
            Lines{
                Description
                Quantity
            }
        }
        Amounts{
            Total{
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
        Customer{            
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
        }
        Address { 
            Department{
                _id
                Name
            }
            Town{
                _id
                Name
            }
            PostCode
            StreetName
            HouseNumber
            FlatNumber
            Door
            Others
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
                        global.eventManager.emit(BudgetsEvents.GetOne, result.data);
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
            `mutation insertBudget(
                $budget: BudgetInput
            ){ 
                insertBudget (
                    Budget: $budget
                )
                ${singleResultSchema}
            }`,
            { 
                budget: data
            },
            function(result){
                if(result && result.data && result.data.insertBudget){
                    result = result.data.insertBudget;
                    if(result.success)
                        global.eventManager.emit(BudgetsEvents.Insert, result.data);
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
            `mutation updateBudget(
                $budget: BudgetInput
            ){ 
                updateBudget (
                    Budget: $budget
                )
                ${singleResultSchema}
            }`,
            { 
                budget: data
            },
            function(result){
                if(result && result.data && result.data.updateBudget){
                    result = result.data.updateBudget;
                    if(result.success)
                        global.eventManager.emit(BudgetsEvents.Update, result.data);
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
            `mutation deleteBudget(
                $id: ID
            ){ 
                deleteBudget (
                    id: $id
                )
                ${singleResultSchema}
            }`,
            { 
                id: data
            },
            function(result){
                if(result && result.data && result.data.deleteBudget){
                    result = result.data.deleteBudget;
                    if(result.success)
                        global.eventManager.emit(BudgetsEvents.Delete, result.data);
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