const Errors = require("../../Errors");
const ListableItemService = require("../ListableItemService");
const Actions = require("../Actions");
const Q = require('q');

class CustomersService extends ListableItemService{
    constructor(repository, repositoryList){
        super(repository, repositoryList, Errors.Trading.Customers);
    }
    createListItem(item){
        let listItem = {
            _id: item._id,
            Type: item.Type,
            Deletable: item.Deletable
        };
        if(item.Type === 'Person'){
            listItem.Phone = item.PersonData.Phone;
            listItem.Email = item.PersonData.Email;
            listItem.DocumentId = item.PersonData.DocumentId;
            listItem.CompleteName = `${item.PersonData.Name} ${item.PersonData.Surname}`;
        }else{
            listItem.Phone = item.LegalPersonData.Phone;
            listItem.Email = item.LegalPersonData.Email;
            listItem.DocumentId = item.LegalPersonData.DocumentId;
            listItem.CompleteName = item.LegalPersonData.BusinessName;
        }
        return listItem;
    }
    prepareItem(data, action){
        let self = this;
        let deferred = Q.defer();
        switch(action){
            case Actions.INSERT:
            case Actions.UPDATE:
                if(data.Type === 'Person'){
                    data.LegalPersonData = null;
                    data.PersonData.CompleteName = `${data.PersonData.Name} ${data.PersonData.Surname}`;
                }else{
                    data.PersonData = null;
                }
                deferred.resolve(data);
            break;
            default:
                deferred.resolve(data);
            break;
        }        
        return deferred.promise;
    }
    getDepartment(departmentId){
        let deferred = Q.defer();
        this.departmentsRepository.getOne(departmentId)
        .then(function(result){
            if(result && result.success)
                deferred.resolve(result.data);
            else
                deferred.resolve(null);
        })
        .catch(function(){
            deferred.resolve(null);
        });
        return deferred.promise;        
    }
}
module.exports = CustomersService;