const Errors = require("../../Errors");
const ListableItemService = require("../ListableItemService");

class BudgetsService extends ListableItemService{
    constructor(repository, repositoryList){
        super(repository, repositoryList, Errors.Budgets.Budgets);
    }
    createListItem(item){
        let {
            _id,
            BudgetNumber,
            BudgetDate,
            CustomerId,
            AddressId,
            Amounts, 
            StateData
        } = item;

        let listItem = {
            _id,
            BudgetNumber,
            BudgetDate,
            Amounts,
            StateData
        };
        return listItem;
    }
    prepareItem(item){        
    }
}
module.exports = BudgetsService;