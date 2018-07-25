const Errors = require("../../Errors");
const ListableItemService = require("../ListableItemService");

class CustomersService extends ListableItemService{
    constructor(repository, repositoryList){
        super(repository, repositoryList, Errors.Trading.Customers);
    }
    createListItem(item){
        let listItem = {
            _id: item._id,
            Type: item.Type
        };
        if(item.Type === 'Person'){
            listItem.Phone = item.PersonData.Phone;
            listItem.Email = item.PersonData.Email;
            listItem.Phone = item.PersonData.DocumentId;
            listItem.CompleteName = `${item.PersonData.Name} ${item.PersonData.Surname}`;
        }else{
            listItem.Phone = item.LegalPersonData.Phone;
            listItem.Email = item.LegalPersonData.Email;
            listItem.Phone = item.LegalPersonData.DocumentId;
            listItem.CompleteName = item.LegalPersonData.BusinessName;
        }
        return listItem;
    }
}
module.exports = CustomersService;