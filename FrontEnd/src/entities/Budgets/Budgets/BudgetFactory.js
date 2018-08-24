const StringUtils = require("../../../utils/String");

module.exports = class BudgetFactory {
    static create(){
        return{
            _id: null,
            BudgetNumber: StringUtils.Empty,
            BudgetDate: StringUtils.Empty,
            CustomerId: null,
            Customer: null,
            AddressId: null,
            Address: null,
            Title: StringUtils.Empty,
            Description: StringUtils.Empty,
            Footer: StringUtils.Empty,
            Chapters: [],
            Amounts: {
                Total: {
                    Quantity: 0
                }
            },
            Actions: {
                Edit: true,
                Delete: false,
                Lock: false,
                Reopen: false,
                SendMail: false
            }
        };
    }
}