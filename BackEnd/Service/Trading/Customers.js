const Q = require('q');

const Errors = require("../../Errors");
const ListableItemService = require("../ListableItemService");
const Type = require("./Type");

class CustomersService extends ListableItemService{
    constructor(repository, repositoryList){
        super(repository, repositoryList, Errors.Trading.Customers);
    }
    prepare(originalData, newData){
        let deferred = Q.defer();
        let result = { };
        if(originalData)
            result = { 
                item: Object.assign(originalData.item, newData),
                itemList: Object.assign({ }, originalData.itemList)
            };
        else
            result = { 
                item: newData,
                itemList: { }
            };

        if(result.item.Type === Type.Person){
            result.item.LegalPersonData = null;
            result.item.PersonData.CompleteName = `${result.item.PersonData.Name} ${result.item.PersonData.Surname}`;
        }else
            result.item.PersonData = null;

        result.itemList.Type = newData.Type;
        result.itemList.Deletable = newData.Deletable;
            
        if(newData.Type === Type.Person){
            result.itemList.Phone = newData.PersonData.Phone;
            result.itemList.Email = newData.PersonData.Email;
            result.itemList.DocumentId = newData.PersonData.DocumentId;
            result.itemList.CompleteName = result.item.PersonData.CompleteName;
        }else{
            result.itemList.Phone = newData.LegalPersonData.Phone;
            result.itemList.Email = newData.LegalPersonData.Email;
            result.itemList.DocumentId = newData.LegalPersonData.DocumentId;
            result.itemList.CompleteName = newData.LegalPersonData.BusinessName;
        }        
        deferred.resolve({ success: true, data: result });
        return deferred.promise;
    }
}
module.exports = CustomersService;