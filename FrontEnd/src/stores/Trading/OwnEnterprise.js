const OwnEnterpriseEvents = require('../../events/Trading/OwnEnterprise');
const NotificatorEvents = require('../../events/Notificator');
const singleResultSchema = `{
    success
    errors
    data {
        _id
        CompleteName
        TradingName
        Phone
        Email
        DocumentId
        Account {
            Bank
            CompleteNumber
        }
        Address { 
            _id
            DepartmentId
            TownId
            PostCode
            StreetName
            HouseNumber
            FlatNumber
            Door
            Others
        }
    }
}`;
module.exports = class OwnEnterpriseStore{

    getOne(){
        global.apiClient.request(
            `{ ownEnterprise ${singleResultSchema}}`,
            { },
            function(result){
                if(result && result.data && result.data.ownEnterprise){
                    result = result.data.ownEnterprise;
                    if(result.success)
                        global.eventManager.emit(OwnEnterpriseEvents.GetOne, result.data);
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
            `mutation updateOwnEnterprise(
                $ownEnterprise: OwnEnterpriseInput
            ){ 
                updateOwnEnterprise (
                    OwnEnterprise: $ownEnterprise
                )
                ${singleResultSchema}
            }`,
            { 
                ownEnterprise: data
            },
            function(result){
                if(result && result.data && result.data.updateOwnEnterprise){
                    result = result.data.updateOwnEnterprise;
                    if(result.success)
                        global.eventManager.emit(OwnEnterpriseEvents.Update, result.data);
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