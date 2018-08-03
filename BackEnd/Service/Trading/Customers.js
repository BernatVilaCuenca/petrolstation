const Errors = require("../../Errors");
const ListableItemService = require("../ListableItemService");

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
    prepareItem(item){
        if(item.Type === 'Person'){
            item.LegalPersonData = null;
        }else{
            item.PersonData = null;
        }
    }
}
module.exports = CustomersService;